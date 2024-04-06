export async function handleRequest<T>(
    request: RequestInfo,
    init?: RequestInit
): Promise<T> {
    const response = await fetch(request, init);

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error);
    }
    return (await response.json()) as T;
}
