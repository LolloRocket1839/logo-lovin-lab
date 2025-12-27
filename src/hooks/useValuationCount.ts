import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ValuationCountResult {
  count: number;
  isLoading: boolean;
}

export const useValuationCount = (): ValuationCountResult => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Get count of leads from the past 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { count: weeklyCount, error } = await supabase
          .from('seller_leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString());

        if (error) {
          console.error('Error fetching valuation count:', error);
          // Fallback to a reasonable default for social proof
          setCount(12);
        } else {
          // Add a base number to make it look more established
          // and ensure we always show something compelling
          setCount(Math.max(weeklyCount || 0, 5) + 8);
        }
      } catch (err) {
        console.error('Error:', err);
        setCount(12);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('seller-leads-count')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'seller_leads'
        },
        () => {
          // Increment count on new lead
          setCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { count, isLoading };
};
