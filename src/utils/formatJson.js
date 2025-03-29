export const formatJson = (data) => {
    try {
        return JSON.stringify(data, null, 2); // Format JSON with 2 spaces for indentation
    } catch (error) {
        console.error("Error formatting JSON:", error);
        return null; // Return null if formatting fails
    }
};
