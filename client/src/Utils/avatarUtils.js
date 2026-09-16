/**
 * Generates a two-letter capitalized initials fallback from a name.
 * Takes the first letter of the first name and the first letter of the last name.
 * If only a single name is provided, returns the first two letters capitalized.
 *
 * @param {string} name - Full name of the person
 * @returns {string} Two uppercase initials (e.g. "Sarah Thompson" -> "ST", "John Doe" -> "JD", "John" -> "JO")
 */
export const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "";

    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";

    if (parts.length === 1) {
        const cleaned = parts[0].replace(/[^a-zA-Z0-9]/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2).toUpperCase();
        }
        return parts[0].slice(0, 2).toUpperCase();
    }

    const firstWord = parts[0].replace(/[^a-zA-Z0-9]/g, '') || parts[0];
    const lastWord = parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '') || parts[parts.length - 1];

    const firstLetter = firstWord[0] || '';
    const lastLetter = lastWord[0] || '';

    const combined = (firstLetter + lastLetter).toUpperCase();
    if (combined.length === 2) {
        return combined;
    }
    return combined.padEnd(2, firstLetter || 'A').toUpperCase();
};

export default getInitials;
