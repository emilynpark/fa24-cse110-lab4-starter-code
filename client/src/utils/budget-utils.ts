import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
    	throw new Error("Failed to fetch budget");
	}
    const jsonResponse = await response.json();
    return jsonResponse.data();
};

export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: budget }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update budget`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.data;
};