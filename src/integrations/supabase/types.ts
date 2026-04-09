export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ab_test_events: {
        Row: {
          created_at: string
          cta_type: string
          event_type: string
          id: string
          page_url: string | null
          session_id: string
          user_agent: string | null
          variation: string
        }
        Insert: {
          created_at?: string
          cta_type: string
          event_type: string
          id?: string
          page_url?: string | null
          session_id: string
          user_agent?: string | null
          variation: string
        }
        Update: {
          created_at?: string
          cta_type?: string
          event_type?: string
          id?: string
          page_url?: string | null
          session_id?: string
          user_agent?: string | null
          variation?: string
        }
        Relationships: []
      }
      ai_test_results: {
        Row: {
          chatgpt_cited: boolean | null
          chatgpt_context: string | null
          chatgpt_position: number | null
          claude_cited: boolean | null
          claude_context: string | null
          claude_position: number | null
          created_at: string | null
          id: string
          notes: string | null
          perplexity_cited: boolean | null
          perplexity_context: string | null
          perplexity_position: number | null
          query_id: string
          test_date: string
          tester_name: string | null
          updated_at: string | null
        }
        Insert: {
          chatgpt_cited?: boolean | null
          chatgpt_context?: string | null
          chatgpt_position?: number | null
          claude_cited?: boolean | null
          claude_context?: string | null
          claude_position?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          perplexity_cited?: boolean | null
          perplexity_context?: string | null
          perplexity_position?: number | null
          query_id: string
          test_date: string
          tester_name?: string | null
          updated_at?: string | null
        }
        Update: {
          chatgpt_cited?: boolean | null
          chatgpt_context?: string | null
          chatgpt_position?: number | null
          claude_cited?: boolean | null
          claude_context?: string | null
          claude_position?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          perplexity_cited?: boolean | null
          perplexity_context?: string | null
          perplexity_position?: number | null
          query_id?: string
          test_date?: string
          tester_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          page_title: string | null
          page_url: string
          referrer: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          page_title?: string | null
          page_url: string
          referrer?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page_title?: string | null
          page_url?: string
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      auto_blog_posts: {
        Row: {
          author: string
          category: string
          content_en: string
          content_it: string
          created_at: string | null
          excerpt_en: string
          excerpt_it: string
          id: string
          image: string
          keywords: Json
          published_at: string | null
          read_time: number
          seo_desc_en: string
          seo_desc_it: string
          seo_title_en: string
          seo_title_it: string
          slug: string
          status: string
          tags_en: Json
          tags_it: Json
          title_en: string
          title_it: string
        }
        Insert: {
          author?: string
          category?: string
          content_en: string
          content_it: string
          created_at?: string | null
          excerpt_en: string
          excerpt_it: string
          id?: string
          image?: string
          keywords?: Json
          published_at?: string | null
          read_time?: number
          seo_desc_en: string
          seo_desc_it: string
          seo_title_en: string
          seo_title_it: string
          slug: string
          status?: string
          tags_en?: Json
          tags_it?: Json
          title_en: string
          title_it: string
        }
        Update: {
          author?: string
          category?: string
          content_en?: string
          content_it?: string
          created_at?: string | null
          excerpt_en?: string
          excerpt_it?: string
          id?: string
          image?: string
          keywords?: Json
          published_at?: string | null
          read_time?: number
          seo_desc_en?: string
          seo_desc_it?: string
          seo_title_en?: string
          seo_title_it?: string
          slug?: string
          status?: string
          tags_en?: Json
          tags_it?: Json
          title_en?: string
          title_it?: string
        }
        Relationships: []
      }
      auto_blog_topics: {
        Row: {
          category: string
          created_at: string | null
          id: string
          priority: number
          status: string
          target_keywords: Json
          topic_en: string
          topic_it: string
          used_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          id?: string
          priority?: number
          status?: string
          target_keywords?: Json
          topic_en: string
          topic_it: string
          used_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          priority?: number
          status?: string
          target_keywords?: Json
          topic_en?: string
          topic_it?: string
          used_at?: string | null
        }
        Relationships: []
      }
      contract_drafts: {
        Row: {
          created_at: string
          current_step: number
          id: string
          title: string
          updated_at: string
          user_id: string
          wizard_data: Json
        }
        Insert: {
          created_at?: string
          current_step?: number
          id?: string
          title?: string
          updated_at?: string
          user_id: string
          wizard_data?: Json
        }
        Update: {
          created_at?: string
          current_step?: number
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
          wizard_data?: Json
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      investor_interest: {
        Row: {
          accredited_investor: string
          additional_comments: string | null
          areas_of_interest: string[]
          consents_to_contact: boolean | null
          consents_to_data_processing: boolean | null
          consents_to_fadp: boolean | null
          country: string
          created_at: string | null
          email: string
          full_name: string
          heard_about: string | null
          id: string
          investment_amount_range: string
          investment_experience: string | null
          investment_timeline: string
          investor_type: string
          phone: string
          understands_no_commitment: boolean | null
        }
        Insert: {
          accredited_investor: string
          additional_comments?: string | null
          areas_of_interest: string[]
          consents_to_contact?: boolean | null
          consents_to_data_processing?: boolean | null
          consents_to_fadp?: boolean | null
          country: string
          created_at?: string | null
          email: string
          full_name: string
          heard_about?: string | null
          id?: string
          investment_amount_range: string
          investment_experience?: string | null
          investment_timeline: string
          investor_type: string
          phone: string
          understands_no_commitment?: boolean | null
        }
        Update: {
          accredited_investor?: string
          additional_comments?: string | null
          areas_of_interest?: string[]
          consents_to_contact?: boolean | null
          consents_to_data_processing?: boolean | null
          consents_to_fadp?: boolean | null
          country?: string
          created_at?: string | null
          email?: string
          full_name?: string
          heard_about?: string | null
          id?: string
          investment_amount_range?: string
          investment_experience?: string | null
          investment_timeline?: string
          investor_type?: string
          phone?: string
          understands_no_commitment?: boolean | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          lead_type: string
          metadata: Json | null
          name: string | null
          phone: string | null
          source: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lead_type?: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          source?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lead_type?: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          source?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      perplexity_cache: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          language: string
          query: string
          query_hash: string
          response: Json
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          language?: string
          query: string
          query_hash: string
          response: Json
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          language?: string
          query?: string
          query_hash?: string
          response?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          areas: string[] | null
          auth_key: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh_key: string
        }
        Insert: {
          areas?: string[] | null
          auth_key: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh_key: string
        }
        Update: {
          areas?: string[] | null
          auth_key?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh_key?: string
        }
        Relationships: []
      }
      rent_price_history: {
        Row: {
          area_name: string
          avg_rent: number | null
          created_at: string | null
          fetched_at: string | null
          id: string
          max_rent: number
          min_rent: number
          source: string | null
          year: number
        }
        Insert: {
          area_name: string
          avg_rent?: number | null
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          max_rent: number
          min_rent: number
          source?: string | null
          year: number
        }
        Update: {
          area_name?: string
          avg_rent?: number | null
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          max_rent?: number
          min_rent?: number
          source?: string | null
          year?: number
        }
        Relationships: []
      }
      seller_leads: {
        Row: {
          created_at: string | null
          email: string
          estimated_value: number | null
          has_cellar: boolean | null
          has_terrace: boolean | null
          id: string
          num_bathrooms: number | null
          num_rooms: number | null
          phone: string | null
          photos: Json | null
          property_address: string | null
          property_condition: string | null
          property_sqm: number | null
          property_zone: string | null
          source: string | null
          status: string | null
          utm_data: Json | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          estimated_value?: number | null
          has_cellar?: boolean | null
          has_terrace?: boolean | null
          id?: string
          num_bathrooms?: number | null
          num_rooms?: number | null
          phone?: string | null
          photos?: Json | null
          property_address?: string | null
          property_condition?: string | null
          property_sqm?: number | null
          property_zone?: string | null
          source?: string | null
          status?: string | null
          utm_data?: Json | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          estimated_value?: number | null
          has_cellar?: boolean | null
          has_terrace?: boolean | null
          id?: string
          num_bathrooms?: number | null
          num_rooms?: number | null
          phone?: string | null
          photos?: Json | null
          property_address?: string | null
          property_condition?: string | null
          property_sqm?: number | null
          property_zone?: string | null
          source?: string | null
          status?: string | null
          utm_data?: Json | null
          video_url?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
    }
    Views: {
      ab_test_results: {
        Row: {
          clicks: number | null
          cta_type: string | null
          ctr_percentage: number | null
          impressions: number | null
          variation: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      insert_lead: {
        Args: {
          _email: string
          _lead_type?: string
          _metadata?: Json
          _name?: string
          _phone?: string
          _source?: string
          _utm_campaign?: string
          _utm_medium?: string
          _utm_source?: string
        }
        Returns: string
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
