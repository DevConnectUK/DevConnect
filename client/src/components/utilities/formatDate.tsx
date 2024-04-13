export function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}
export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
