import { ToolSyncLog } from '@/api/entities';

/**
 * Simulates the execution of a single step from an AI Execution Plan.
 * In a real system, this would make an API call to the specific tool's endpoint.
 * @param {object} user - The current user object.
 * @param {object} planStep - The step from the AIExecutionPlan to execute.
 * @returns {object} An object containing the success status, a message, and the simulated cost.
 */
export const executeToolAction = async (user, planStep) => {
    // Simulate API call delay to make the process feel real
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

    const isSuccess = Math.random() > 0.1; // 90% success rate for simulation

    const resultMessage = isSuccess 
        ? `Success: ${planStep.action_description}. [Simulated: 50 leads processed, 45 emails sent, 2 appointments booked]`
        : `Failure: ${planStep.action_description}. [Simulated: API endpoint timed out, retrying]`;

    const cost = isSuccess ? (Math.random() * 5).toFixed(2) : 0; // Simulate credit cost

    try {
        await ToolSyncLog.create({
            realtor_email: user.email,
            tool: planStep.tool_name,
            action: planStep.action,
            status: isSuccess ? 'success' : 'failed',
            result: resultMessage,
            cost: parseFloat(cost)
        });
    } catch (e) {
        console.error("Failed to create ToolSyncLog", e);
    }
    
    return {
        success: isSuccess,
        message: resultMessage,
        cost: parseFloat(cost)
    };
};