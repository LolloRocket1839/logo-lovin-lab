

## Fix TypeScript build error in pushNotifications.ts

### Problem
The `pushManager` property on `ServiceWorkerRegistration` is not recognized by TypeScript because the `DOM` lib typings may not include the Push API types. Lines that access `registration.pushManager` (lines 88, 110, 121) cause TS errors.

### Solution
Add the `WebWorker` lib to `tsconfig.app.json` **is not ideal** since it conflicts with DOM. Instead, the cleanest fix is to add type assertions where `pushManager` is accessed, casting the registration to `any` or using a dedicated type declaration file.

### Implementation

**1. Create `src/types/push-notifications.d.ts`** -- a small ambient declaration that extends `ServiceWorkerRegistration` with `PushManager` types so TypeScript recognizes them:

```typescript
interface PushSubscriptionOptionsInit {
  userVisibleOnly?: boolean;
  applicationServerKey?: BufferSource | string | null;
}

interface PushManager {
  getSubscription(): Promise<PushSubscription | null>;
  subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

interface ServiceWorkerRegistration {
  pushManager: PushManager;
}
```

**2. Update `src/lib/pushNotifications.ts`** -- fix the `BufferSource` cast on line 49 by removing the unnecessary `as BufferSource` (the `applicationServerKey` already accepts `Uint8Array`). No other code changes needed since the type declaration file above will resolve all `pushManager` errors globally.

### Files changed
- `src/types/push-notifications.d.ts` (new -- ambient type declarations for Push API)
- `src/lib/pushNotifications.ts` (minor: remove redundant cast on line 49)

