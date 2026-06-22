const TEMPLATE_TOKEN_REGEX = /\{\{(.*?)\}\}/g;

export function renderTemplate(
  source: string,
  variables: Record<string, string>,
): string {
  return source.replace(TEMPLATE_TOKEN_REGEX, (_, token: string) => {
    const key = token.trim();
    return variables[key] ?? '';
  });
}
