// Inline JSON-LD <script> for structured data. Per the Next.js JSON-LD guide
// (https://nextjs.org/docs/app/guides/json-ld) the canonical pattern is a
// dangerouslySetInnerHTML script tag with the schema object stringified.
// Server-rendered, no client JS, search-engine readable on first paint.

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // The schema is built from typed inputs in lib/jsonLd.ts — never user
      // content — so dangerouslySetInnerHTML is safe here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
