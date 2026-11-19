/**
 * Phase 0 Security TDD Specification & Adversarial Test Suite
 * Verifies all 12 "Dirty Dozen" payloads against firestore.rules invariants.
 *
 * Run with Firebase Emulator Suite (`@firebase/rules-unit-testing`) when testing locally.
 */

export interface DirtyDozenCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: { uid: string; email: string; email_verified: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
  enforcedBy: string;
}

export const DIRTY_DOZEN_CASES: DirtyDozenCase[] = [
  {
    id: 1,
    name: 'Shadow Role Injection on Signup',
    collectionPath: '/users/user_a',
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: {
      uid: 'user_a',
      displayName: 'Aman Sharma',
      email: 'student@dgu.edu',
      customerType: 'DGU Student',
      role: 'admin',
      isAdmin: true,
    },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'isValidUserProfile() -> data.keys().hasOnly([...])',
  },
  {
    id: 2,
    name: 'PII Cross-User Profile Read',
    collectionPath: '/users/user_b',
    operation: 'get',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'isOwner(userId) || isAdmin()',
  },
  {
    id: 3,
    name: 'Unverified Admin Email Spoof',
    collectionPath: '/orders/RIH-1001',
    operation: 'update',
    auth: { uid: 'attacker', email: 'kunalgupta712002@gmail.com', email_verified: false },
    payload: { orderStatus: 'COMPLETED' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'isVerifiedEmail() -> request.auth.token.email_verified == true',
  },
  {
    id: 4,
    name: 'Client Timestamp Forgery on Signup',
    collectionPath: '/users/user_a',
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: {
      uid: 'user_a',
      displayName: 'Aman Sharma',
      email: 'student@dgu.edu',
      customerType: 'DGU Student',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z',
    },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'incoming().createdAt == request.time && incoming().updatedAt == request.time',
  },
  {
    id: 5,
    name: 'Immutable Field Tampering on Profile Update',
    collectionPath: '/users/user_a',
    operation: 'update',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { uid: 'user_b', email: 'hijacked@dgu.edu' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'incoming().uid == existing().uid && affectedKeys().hasOnly([...])',
  },
  {
    id: 6,
    name: 'Identity Spoofing on Order Create',
    collectionPath: '/orders/RIH-9001',
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { id: 'RIH-9001', customerId: 'user_b', orderStatus: 'PLACED' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'incoming().customerId == request.auth.uid',
  },
  {
    id: 7,
    name: 'Order Status Shortcutting on Create',
    collectionPath: '/orders/RIH-9002',
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { id: 'RIH-9002', customerId: 'user_a', orderStatus: 'COMPLETED' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: "incoming().orderStatus == 'PLACED'",
  },
  {
    id: 8,
    name: 'Customer Price & Payment Tampering',
    collectionPath: '/orders/RIH-9003',
    operation: 'update',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { total: 1, paymentStatus: 'Paid' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'Action-based affectedKeys().hasOnly(...) restricts customer updates',
  },
  {
    id: 9,
    name: 'Terminal State Bypass on Completed Order',
    collectionPath: '/orders/RIH-9004',
    operation: 'update',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { orderStatus: 'CANCELLED' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: "existing().orderStatus == 'PLACED'",
  },
  {
    id: 10,
    name: 'Blanket Orders List Scraping',
    collectionPath: '/orders',
    operation: 'list',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'resource.data.customerId == request.auth.uid || isBootstrapAdmin()',
  },
  {
    id: 11,
    name: 'ID Poisoning & Oversized Payload',
    collectionPath: `/orders/${'A'.repeat(200)}`,
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { specialInstructions: 'X'.repeat(5000) },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'isValidId(orderId) && specialInstructions.size() <= 300',
  },
  {
    id: 12,
    name: 'Orphaned or Non-Atomic Feedback Create',
    collectionPath: '/feedback/fb-9001',
    operation: 'create',
    auth: { uid: 'user_a', email: 'student@dgu.edu', email_verified: true },
    payload: { id: 'fb-9001', orderId: 'NON_EXISTENT_ORDER', customerId: 'user_a' },
    expectedResult: 'PERMISSION_DENIED',
    enforcedBy: 'exists(...) && get(...).customerId == uid && getAfter(...).hasFeedbackSubmitted == true',
  },
];
