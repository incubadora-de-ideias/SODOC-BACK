import { emailOptions } from "../templates/email";
import { TemplateVariables } from "../types/mail";

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

export function renderTemplate<
  T extends keyof typeof emailOptions
>(
  templateKey: T,
  variables: Record<TemplateVariables[T], string>
): string {
  const template = emailOptions[templateKey] as string;

  return Object.entries(variables).reduce((acc: string, [key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    return acc.replace(regex, value as string); 
  }, template);
}
