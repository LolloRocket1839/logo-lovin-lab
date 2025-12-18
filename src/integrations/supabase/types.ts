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
      [_ in never]: never
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
