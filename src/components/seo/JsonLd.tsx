/**
 * Emits a schema.org graph as JSON-LD.
 *
 * Search and AI engines read this to get unambiguous facts about a page
 * instead of inferring them from prose, so most pages should render one.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
