import type { CSSProperties } from "react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const foreground = "#FFFFFF";
const yellow = "#FFC600";
const orange = "#FF9D00";
const green = "#A5FF90";
const mint = "#80FFBB";
const cyan = "#9EFFFF";
const pink = "#FF628C";
const blue = "#0088FF";

const languageBlocks = Object.fromEntries(
  Object.keys(vscDarkPlus)
    .filter((key) => /^(pre|code)\[class\*="language-/.test(key))
    .map((key) => [key, { ...vscDarkPlus[key], color: foreground }])
);

/**
 * Syntax colors from Wes Bos's Cobalt2 VS Code theme, layered over vscDarkPlus
 * so any token it doesn't cover still gets a sensible dark-theme color.
 */
export const cobalt2: Record<string, CSSProperties> = {
  ...vscDarkPlus,
  ...languageBlocks,
  comment: { color: blue, fontStyle: "italic" },
  prolog: { color: blue },
  punctuation: { color: "#E1EFFF" },
  keyword: { color: orange },
  "keyword.module": { color: orange },
  "keyword.control-flow": { color: orange },
  operator: { color: orange },
  "operator.arrow": { color: orange },
  string: { color: green },
  char: { color: green },
  "attr-value": { color: green },
  "attr-value.punctuation": { color: green },
  "attr-value.punctuation.attr-equals": { color: orange },
  "template-string": { color: green },
  number: { color: pink },
  boolean: { color: pink },
  constant: { color: pink },
  function: { color: yellow },
  "attr-name": { color: yellow, fontStyle: "italic" },
  "class-name": { color: mint },
  "maybe-class-name": { color: mint },
  builtin: { color: mint },
  regex: { color: mint },
  property: { color: cyan },
  tag: { color: cyan },
  "tag.punctuation": { color: "#E1EFFF" },
  entity: { color: foreground },
  variable: { color: foreground },
  parameter: { color: foreground },
};
