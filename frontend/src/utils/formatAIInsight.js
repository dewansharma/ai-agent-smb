export function formatAIInsight(text = "") {

  return text

    // Remove markdown bold
    .replace(/\*\*/g, "")

    // Remove numbered lists
    .replace(/\d+\.\s/g, "\n• ")

    // Remove excessive line breaks
    .replace(/\n{2,}/g, "\n")

    // Trim spaces
    .trim();
}