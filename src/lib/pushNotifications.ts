import { supabase } from "@/integrations/supabase/client";

// Check if push notifications are supported
export const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

// Request notification permission
export const requestPushPermission = async (): Promise<boolean> => {
  if (!isPushSupported()) return false;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Register service worker
const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) return null;
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Subscribe to push notifications
export const subscribeToPush = async (areas: string[] = []): Promise<boolean> => {
  try {
    const registration = await registerServiceWorker();
    if (!registration) return false;
    
    // Get existing subscription or create new one
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // In production, you'd use VAPID keys here
      // For now, we create a simple subscription for demo purposes
      const vapidKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
      const applicationServerKey = urlBase64ToUint8Array(vapidKey);
      
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as BufferSource
      });
    }
    
    // Extract keys from subscription
    const key = subscription.getKey('p256dh');
    const auth = subscription.getKey('auth');
    
    if (!key || !auth) {
      console.error('Could not get subscription keys');
      return false;
    }
    
    // Save subscription to database
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        endpoint: subscription.endpoint,
        p256dh_key: arrayBufferToBase64(key),
        auth_key: arrayBufferToBase64(auth),
        areas: areas
      }, { onConflict: 'endpoint' });
    
    if (error) {
      console.error('Error saving subscription:', error);
      return false;
    }
    
    console.log('Push subscription saved successfully');
    return true;
    
  } catch (error) {
    console.error('Error subscribing to push:', error);
    return false;
  }
};

// Unsubscribe from push notifications
export const unsubscribeFromPush = async (): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      // Remove from database
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);
      
      // Unsubscribe from push
      await subscription.unsubscribe();
    }
    
    return true;
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return false;
  }
};

// Check if user is subscribed
export const isSubscribed = async (): Promise<boolean> => {
  try {
    if (!isPushSupported()) return false;
    
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    return !!subscription;
  } catch {
    return false;
  }
};

// Update subscribed areas
export const updateSubscribedAreas = async (areas: string[]): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) return false;
    
    const { error } = await supabase
      .from('push_subscriptions')
      .update({ areas })
      .eq('endpoint', subscription.endpoint);
    
    return !error;
  } catch {
    return false;
  }
};

// Helper: Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

// Helper: Convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
