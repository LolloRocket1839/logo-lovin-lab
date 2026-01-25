// Auto-linking detection engine for blog content
import { LinkableContent, getLinkableContent, autoLinkConfig } from '@/data/linkableContent';

export interface LinkSuggestion {
  matchedText: string;
  startIndex: number;
  endIndex: number;
  suggestedLink: LinkableContent;
  confidence: number;
}

// Escape special regex characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Check if position is inside an existing markdown link or code block
function isInsideExcludedPattern(content: string, index: number): boolean {
  // Check if inside a markdown link [text](url)
  const beforeContent = content.slice(0, index);
  const afterContent = content.slice(index);
  
  // Count open brackets before position
  const openBrackets = (beforeContent.match(/\[/g) || []).length;
  const closeBrackets = (beforeContent.match(/\]/g) || []).length;
  const openParens = (beforeContent.match(/\]\(/g) || []).length;
  const closeParens = (beforeContent.match(/\)/g) || []).length;
  
  // If we're between [ and ](url) or inside (url)
  if (openBrackets > closeBrackets) return true;
  if (openParens > closeParens) return true;
  
  // Check if inside code block
  const codeBlocksBefore = (beforeContent.match(/```/g) || []).length;
  if (codeBlocksBefore % 2 === 1) return true;
  
  // Check if inside inline code
  const inlineCodeBefore = (beforeContent.match(/`/g) || []).length;
  if (inlineCodeBefore % 2 === 1) return true;
  
  // Check if inside heading (start of line with #)
  const lastNewline = beforeContent.lastIndexOf('\n');
  const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
  const currentLine = content.slice(lineStart, index + 50);
  if (/^#{1,6}\s/.test(currentLine)) return true;
  
  return false;
}

// Detect link opportunities in content
export function detectLinkOpportunities(
  content: string,
  currentSlug: string,
  lang: 'it' | 'en'
): LinkSuggestion[] {
  const suggestions: LinkSuggestion[] = [];
  const usedUrls = new Set<string>();
  const usedPositions = new Set<number>();
  
  const linkableItems = getLinkableContent(autoLinkConfig.preferTools);
  
  for (const item of linkableItems) {
    // Skip self-links
    if (item.url.includes(currentSlug)) continue;
    
    // Skip if we already linked to this URL
    if (usedUrls.has(item.url)) continue;
    
    // Check if we've hit the max links limit
    if (suggestions.length >= autoLinkConfig.maxLinksPerArticle) break;
    
    // Search for keyword matches
    for (const keyword of item.triggerKeywords) {
      if (keyword.length < autoLinkConfig.minKeywordLength) continue;
      
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        const startIndex = match.index;
        const endIndex = startIndex + match[0].length;
        
        // Skip if position already used
        if (usedPositions.has(startIndex)) continue;
        
        // Skip if inside excluded pattern
        if (isInsideExcludedPattern(content, startIndex)) continue;
        
        // Calculate confidence based on keyword length and type
        let confidence = 0.5;
        confidence += Math.min(keyword.length / 20, 0.3); // Longer keywords = higher confidence
        if (item.type === 'tool') confidence += 0.15;
        if (item.priority >= 8) confidence += 0.1;
        
        suggestions.push({
          matchedText: match[0],
          startIndex,
          endIndex,
          suggestedLink: item,
          confidence: Math.min(confidence, 1)
        });
        
        usedUrls.add(item.url);
        usedPositions.add(startIndex);
        break; // Only one match per linkable item
      }
    }
  }
  
  // Sort by position in content
  return suggestions.sort((a, b) => a.startIndex - b.startIndex);
}

// Inject auto-links into markdown content
export function injectAutoLinks(
  content: string,
  suggestions: LinkSuggestion[],
  lang: 'it' | 'en'
): string {
  if (suggestions.length === 0) return content;
  
  let result = '';
  let lastIndex = 0;
  
  // Sort suggestions by position (descending) to avoid index shifting issues
  const sortedSuggestions = [...suggestions].sort((a, b) => a.startIndex - b.startIndex);
  
  for (const suggestion of sortedSuggestions) {
    // Add content before this match
    result += content.slice(lastIndex, suggestion.startIndex);
    
    // Add the linked text
    const title = lang === 'it' 
      ? suggestion.suggestedLink.titleIt 
      : suggestion.suggestedLink.titleEn;
    
    result += `[${suggestion.matchedText}](${suggestion.suggestedLink.url} "${title}")`;
    
    lastIndex = suggestion.endIndex;
  }
  
  // Add remaining content
  result += content.slice(lastIndex);
  
  return result;
}

// Get contextual tool suggestions for callout boxes
export function getContextualSuggestions(
  content: string,
  currentSlug: string,
  lang: 'it' | 'en',
  limit: number = 2
): LinkableContent[] {
  const suggestions: Array<{ item: LinkableContent; score: number }> = [];
  const linkableItems = getLinkableContent(true);
  
  for (const item of linkableItems) {
    // Only suggest tools for callout boxes
    if (item.type !== 'tool') continue;
    
    // Skip self-links
    if (item.url.includes(currentSlug)) continue;
    
    // Count keyword matches
    let score = 0;
    for (const keyword of item.triggerKeywords) {
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
      const matches = content.match(regex);
      if (matches) {
        score += matches.length * (keyword.length / 10);
      }
    }
    
    if (score > 0) {
      suggestions.push({ item, score });
    }
  }
  
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.item);
}
