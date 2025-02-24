export const base64ToString = (base64: string): string => {
  // Check if the input is a valid string
  if (typeof base64 !== "string" || !base64.trim()) {
    console.error(
      "Invalid base64 input: Input is not a valid string or is empty"
    );
    return "";
  }

  // Check if the base64 input has valid characters (Base64 only allows A-Z, a-z, 0-9, +, / and possibly = for padding)
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  if (!base64Regex.test(base64)) {
    console.error("Invalid base64 input: Contains invalid characters");
    return "";
  }

  try {
    // Decoding the base64 string
    const string = atob(base64);
    return string;
  } catch (error) {
    console.error("Error decoding base64:", error);
    return "";
  }
};
