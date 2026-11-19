# Security Specification — Rush in Hill Restro and Cafe

## 1. Data Invariants
1. **Default-Deny Baseline**: Every unspecified Firestore path is denied for both read and write (`match /{document=**} { allow read, write: if false; }`).
2. **PII Isolation**: `/users/{userId}` and `/orders/{orderId}` contain PII (`email`, `phone`). Only the owning authenticated user (`request.auth.uid == userId` / `resource.data.customerId == request.auth.uid`) or a verified admin (`isAdmin()`) may read them. No blanket `isSignedIn()` reads exist.
3. **No Self-Assigned Roles**: `/users/{userId}` has strict `hasOnly()` keys and forbids `role` or `isAdmin` fields. `/admins/{userId}` can only be written by an already verified admin.
4. **Verified Identity & Server Timestamps**: All creates/updates require `request.auth != null && request.auth.token.email_verified == true` and enforce `request.time` for `createdAt` (create) and `updatedAt` (create/update). `createdAt` and owner IDs (`uid`, `customerId`, `id`, `orderId`) are immutable after creation.
5. **Relational & Atomic Feedback**: A `/feedback/{feedbackId}` document cannot be created unless the referenced `/orders/{orderId}` exists, belongs to `request.auth.uid`, is in `READY` or `COMPLETED` status, has `hasFeedbackSubmitted == false`, and is atomically updated in the same batch (`getAfter(...)`) to `hasFeedbackSubmitted == true`.
6. **Terminal State Locking**: Once an order reaches `COMPLETED` or `CANCELLED`, non-admin users cannot alter `orderStatus`.
7. **Path Variable & Volumetric Hardening**: All single-document operations validate document IDs with `isValidId()` (`<= 128` chars, `^[a-zA-Z0-9_\-]+$`), every string field has explicit `.size()` bounds, and order `items` arrays are bounded (`1..50`) with first-element type checks.

## 2. The "Dirty Dozen" Adversarial Payloads (Must Return `PERMISSION_DENIED`)
1. **Shadow Role Injection on Signup (`users/{uid}` create)**: Payload includes all valid `UserProfile` fields plus `"role": "admin"` or `"isAdmin": true`. Blocked by `hasOnly()`.
2. **PII Cross-User Read (`users/{otherUid}` get)**: Authenticated user A attempts `get` on user B's profile. Blocked by `isOwner(userId) || isAdmin()`.
3. **Unverified Admin Email Spoof**: Caller has `token.email == 'kunalgupta712002@gmail.com'` with `token.email_verified == false`. Blocked by `request.auth.token.email_verified == true`.
4. **Client Timestamp Forgery (`users/{uid}` create)**: Caller passes a hardcoded client timestamp for `createdAt` instead of `serverTimestamp()`. Blocked by `incoming().createdAt == request.time`.
5. **Immutable Field Tampering (`users/{uid}` update)**: Owner attempts to change `uid` or `createdAt` during profile update. Blocked by `affectedKeys().hasOnly(...)` and immutability checks.
6. **Identity Spoofing on Order (`orders/{orderId}` create)**: User A creates an order with `customerId: "user-B"`. Blocked by `incoming().customerId == request.auth.uid`.
7. **Order Status Shortcutting (`orders/{orderId}` create)**: Customer creates an order with `orderStatus: "COMPLETED"` instead of `"PLACED"`. Blocked by `incoming().orderStatus == 'PLACED'`.
8. **Customer Order Price Tampering (`orders/{orderId}` update)**: Customer attempts to update `total: 1` or `paymentStatus: "Paid"` on their own order. Blocked by action-based `affectedKeys().hasOnly(...)`.
9. **Terminal State Bypass (`orders/{orderId}` update)**: Customer attempts to change a `COMPLETED` order's `orderStatus` to `CANCELLED`. Blocked by terminal state check (`existing().orderStatus == 'PLACED'`).
10. **Blanket Query Scraping (`orders` list)**: Non-admin queries `orders` without `where('customerId', '==', uid)`. Blocked by `allow list: if isSignedIn() && (resource.data.customerId == request.auth.uid || isAdmin())`.
11. **ID Poisoning / Resource Exhaustion (`orders/{1500_char_id}` create)**: Attacker passes a 1.5KB document ID or a 50KB `specialInstructions` string. Blocked by `isValidId(orderId)` and `.size() <= 300`.
12. **Orphaned / Non-Atomic Feedback (`feedback/{fbId}` create)**: User submits feedback for a non-existent order or without atomically updating the parent order's `hasFeedbackSubmitted` to `true`. Blocked by `exists()` + `get()` + `getAfter()`.
