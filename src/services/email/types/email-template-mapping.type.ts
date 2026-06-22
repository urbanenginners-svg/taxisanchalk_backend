export type EmailTemplateResolver = {
  subject: string;
  html: string;
};

export type EmailTemplateMapping = Record<
  string,
  (variables: Record<string, string>) => EmailTemplateResolver
>;
