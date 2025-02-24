/**
 * Sanitizes the raw Markdown content by normalizing line endings, trimming unnecessary spaces,
 * normalizing heading styles, converting tabs to spaces, and removing multiple consecutive newlines.
 *
 * @param content - The raw Markdown content as a string.
 * @returns The sanitized and normalized Markdown content.
 */
export const sanitizeMarkdownContent = (
	content: string
): string => {
	if (!content) {
		console.warn(
			"Received empty or invalid Markdown content."
		);
		return "";
	}

	// Normalize line endings (convert \r\n or \r to \n)
	let normalizedContent = content
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n");

	// Trim unnecessary leading/trailing spaces
	normalizedContent = normalizedContent.trim();

	// Remove multiple consecutive newlines (collapse to a single newline)
	normalizedContent = normalizedContent.replace(
		/\n\s*\n/g,
		"\n\n"
	);

	// Normalize heading styles (ensure a single space after # in headers)
	normalizedContent = normalizedContent.replace(
		/^(#{1,6})([^\s#])/gm,
		"$1 $2"
	);

	// Convert tabs to spaces (commonly 4 spaces per tab in Markdown)
	normalizedContent = normalizedContent.replace(
		/\t/g,
		"    "
	);

	// Ensure proper spacing around lists (add newline before/after lists)
	normalizedContent = normalizedContent.replace(
		/(\S)\n(\s*[-*+]\s)/g,
		"$1\n\n$2"
	);
	normalizedContent = normalizedContent.replace(
		/(\s*[-*+]\s[^\n]+)\n(\S)/g,
		"$1\n\n$2"
	);

	// Sanitize any remaining excessive whitespace (e.g., around block elements)
	normalizedContent = normalizedContent.replace(
		/\s+$/gm,
		""
	);

	return normalizedContent;
};
