// Ambient type declarations for Push API
// Extends ServiceWorkerRegistration with PushManager support

interface PushSubscriptionOptionsInit {
  userVisibleOnly?: boolean;
  applicationServerKey?: ArrayBuffer | ArrayBufferView | Uint8Array | string | null;
}

interface PushManager {
  getSubscription(): Promise<PushSubscription | null>;
  subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

interface ServiceWorkerRegistration {
  readonly pushManager: PushManager;
}
