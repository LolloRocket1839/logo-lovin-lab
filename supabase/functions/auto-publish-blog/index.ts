import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EXISTING_SLUGS = [
  "quartieri-studenti-torino", "eventi-torino-aprile-2026", "crocetta-torino-guida",
  "san-salvario-torino-guida", "gelaterie-torino-migliori", "raccolta-differenziata-torino",
  "mercati-torino-guida", "volontariato-torino", "vita-notturna-torino",
  "aule-studio-torino", "digital-nomad-torino", "mobilita-sostenibile-torino",
  "investire-immobili-torino", "affitti-brevi-torino", "valutazione-immobile-torino"
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const cronSecret = Deno.env.get("CRON_SECRET");
    const provided = req.headers.get("x-cron-secret") ?? "";
    if (!cronSecret || provided !== cronSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Pick next topic
    const { data: topic, error: topicError } = await supabase
      .from("auto_blog_topics")
      .select("*")
      .eq("status", "pending")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (topicError || !topic) {
      return new Response(JSON.stringify({ message: "No pending topics available" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Check for duplicate slug
    const baseSlug = topic.topic_it
      .toLowerCase()
      .replace(/[^a-z0-9\s-àèéìòù]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 60);

    const { data: existingPost } = await supabase
      .from("auto_blog_posts")
      .select("slug")
      .eq("slug", baseSlug)
      .maybeSingle();

    if (existingPost) {
      await supabase.from("auto_blog_topics").update({ status: "skipped" }).eq("id", topic.id);
      return new Response(JSON.stringify({ message: "Topic already published, skipped" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Generate article via Lovable AI
    const internalLinks = EXISTING_SLUGS.slice(0, 5).map(s => `/blog/${s}`).join(", ");
    const targetKeywords = Array.isArray(topic.target_keywords) ? topic.target_keywords.join(", ") : "";

    const systemPrompt = `You are a bilingual (Italian/English) content writer for Jungle Rent, a startup in Turin, Italy focused on student housing and real estate investment. 

Write in a natural, engaging style:
- Sentences under 25 words, active voice
- No em dashes, no pompous language
- Use narrative hooks and personal recommendations
- Include specific details (prices, addresses, dates)
- Reference Torino neighborhoods: San Salvario, Crocetta, Vanchiglia, Centro, Aurora, Barriera di Milano

CRITICAL: Return ONLY valid JSON with no markdown formatting, no code blocks, no extra text.`;

    const userPrompt = `Generate a complete blog article about: "${topic.topic_it}" (EN: "${topic.topic_en}")
Category: ${topic.category}
Target keywords: ${targetKeywords}

Include internal links to: ${internalLinks}

Return a JSON object with exactly these fields:
{
  "slug": "url-friendly-slug-in-italian",
  "title_it": "Italian title (max 60 chars)",
  "title_en": "English title (max 60 chars)",
  "excerpt_it": "Italian excerpt (max 160 chars)",
  "excerpt_en": "English excerpt (max 160 chars)",
  "content_it": "Full Italian article in markdown (1500-2000 words). Include ## headings, bullet points, and 3+ internal links like [text](/blog/slug).",
  "content_en": "Full English article in markdown (1500-2000 words). Include ## headings, bullet points, and 3+ internal links like [text](/blog/slug).",
  "seo_title_it": "Italian SEO title (max 60 chars)",
  "seo_title_en": "English SEO title (max 60 chars)", 
  "seo_desc_it": "Italian meta description (max 160 chars)",
  "seo_desc_en": "English meta description (max 160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags_it": ["Tag1", "Tag2", "Tag3"],
  "tags_en": ["Tag1", "Tag2", "Tag3"],
  "read_time": 8,
  "faqs_it": [{"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}],
  "faqs_en": [{"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}, {"question": "...", "answer": "..."}]
}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content;
    
    if (!rawContent) throw new Error("No content from AI");

    // Parse JSON - handle potential markdown code blocks
    let article;
    try {
      const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      article = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", rawContent.substring(0, 500));
      throw new Error("Failed to parse AI-generated article");
    }

    // 4. Save to database
    const slug = article.slug || baseSlug;
    
    const { error: insertError } = await supabase.from("auto_blog_posts").insert({
      slug,
      category: topic.category,
      title_it: article.title_it,
      title_en: article.title_en,
      excerpt_it: article.excerpt_it,
      excerpt_en: article.excerpt_en,
      content_it: article.content_it,
      content_en: article.content_en,
      seo_title_it: article.seo_title_it,
      seo_title_en: article.seo_title_en,
      seo_desc_it: article.seo_desc_it,
      seo_desc_en: article.seo_desc_en,
      keywords: article.keywords || [],
      tags_it: article.tags_it || [],
      tags_en: article.tags_en || [],
      read_time: article.read_time || 8,
      image: "/images/quartieri-studenti-torino.jpg",
      status: "published",
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to save article: ${insertError.message}`);
    }

    // 5. Mark topic as used
    await supabase.from("auto_blog_topics").update({ 
      status: "used", 
      used_at: new Date().toISOString() 
    }).eq("id", topic.id);

    return new Response(JSON.stringify({ 
      success: true, 
      slug, 
      title: article.title_it 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("auto-publish-blog error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
