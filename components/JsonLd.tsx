/**
 * Emits a JSON-LD block. The payload is our own structured data built from
 * site content, never user input, so serialising it into a script tag is safe.
 * The `<` escape guards against a stray sequence closing the tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
