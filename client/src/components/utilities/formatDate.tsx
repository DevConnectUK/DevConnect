export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
