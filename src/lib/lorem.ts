/**
 * Placeholder copy.
 *
 * Every string here is Lorem Ipsum standing in for real content, so it is all
 * in one file — when the real copy arrives, delete this module and the
 * compiler will point at every place still using it.
 */

export const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua.";

export const LOREM_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
  "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
  "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
  "velit esse cillum dolore eu fugiat nulla pariatur.";

export const LOREM_LONG = [
  LOREM_PARAGRAPH,
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia " +
    "deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste " +
    "natus error sit voluptatem accusantium doloremque laudantium, totam rem " +
    "aperiam eaque ipsa quae ab illo inventore veritatis.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut " +
    "fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem " +
    "sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor " +
    "sit amet, consectetur, adipisci velit.",
];

/** Generic FAQ scaffolding — questions a hotel page would really answer. */
export const LOREM_FAQS = [
  "What are the check-in and check-out times?",
  "Is the property pet friendly?",
  "Do you have on-site dining?",
  "Is parking available for guests?",
  "How far is the nearest airport or railway station?",
  "Can you arrange airport transfers?",
  "Do the rooms have air conditioning and heating?",
  "What is the cancellation policy for this property?",
].map((q, i) => ({
  q,
  a: i % 2 === 0 ? LOREM_PARAGRAPH : LOREM_SHORT,
}));
