import { remark } from "remark";
import html from "remark-html";

type MdNode = { type: string; value?: string; children?: MdNode[] };

const BLOCK_CONTAINERS = new Set([
  "root",
  "blockquote",
  "list",
  "listItem",
  "table",
  "tableRow",
]);

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

function collectText(node: MdNode): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value ?? "";
  }
  if (node.type === "code" || node.type === "html" || node.type === "image") {
    return "";
  }
  const separator = BLOCK_CONTAINERS.has(node.type) ? " " : "";
  return (node.children ?? []).map(collectText).join(separator);
}

export function markdownToExcerpt(markdown: string, maxLength = 250): string {
  const tree = remark().parse(markdown) as MdNode;
  const text = collectText(tree).replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) {
    return text;
  }

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}
