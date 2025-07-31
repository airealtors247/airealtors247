const API_BASE_URL = 'http://3.15.169.54:3001';

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: response.statusText };
        }
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Server Error');
    }
    return response.json();
};

/**
 * Verifies a list of contacts through the backend.
 * @param {Array<Object>} contacts - Array of contact objects to verify.
 * @returns {Promise<Object>} The response from the server.
 */
export const bulkVerifyContacts = async (contacts) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify-contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contacts }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error verifying contacts:', error);
    throw error;
  }
};

/**
 * Fetches the system health from the backend server.
 * @returns {Promise<Object>} The health status from the server.
 */
export const getSystemHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching system health:', error);
        return { status: 'error', message: 'Could not connect to backend server.' };
    }
};