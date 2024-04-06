import { SERVER_URL } from "../config";

export async function handleRequest<T>(
    request: RequestInfo,
    init?: RequestInit
): Promise<T> {
    console.log(SERVER_URL + request);
    const response = await fetch(SERVER_URL + request, {
        ...init,
        credentials: "include",
    });

    if (!response.ok) {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return (await response.json()) as T;
}
