import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6883f189f95b1b51c3838633", 
  requiresAuth: true // Ensure authentication is required for all operations
});
