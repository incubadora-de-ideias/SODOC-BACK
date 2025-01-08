export function validateBiFormat(biNumber: string) {
    const biRegex = /^\d{9}[A-Za-z]{2}\d{3}$/;
    return biRegex.test(biNumber);
  }
  
  
  export function formatCamelCaseToTitle(text: string): string {
    if (!text) return "";
  
    const spacedText = text.replace(/([A-Z])/g, " $1");
  
    return spacedText
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
  }