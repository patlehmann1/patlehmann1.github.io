import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cobalt2 } from "../cobalt2-prism";

jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () =>
  jest.requireActual("react-syntax-highlighter/dist/cjs/styles/prism")
);

describe("cobalt2 prism style", () => {
  it("uses the Cobalt2 signature token colors", () => {
    expect(cobalt2.comment.color).toBe("#0088FF");
    expect(cobalt2.keyword.color).toBe("#FF9D00");
    expect(cobalt2.string.color).toBe("#A5FF90");
    expect(cobalt2.function.color).toBe("#FFC600");
  });

  it("matches the editor's JSX colors", () => {
    expect(cobalt2["attr-name"]).toEqual({ color: "#FFC600", fontStyle: "italic" });
    expect(cobalt2["attr-value.punctuation.attr-equals"].color).toBe("#FF9D00");
    expect(cobalt2["tag.punctuation"].color).toBe("#E1EFFF");
    expect(cobalt2.tag.color).toBe("#9EFFFF");
  });

  it("keeps every vscDarkPlus selector so uncovered tokens still render", () => {
    for (const key of Object.keys(vscDarkPlus)) {
      expect(cobalt2).toHaveProperty([key]);
    }
  });

  it("sets white as the default text color for language blocks", () => {
    expect(cobalt2['pre[class*="language-"]'].color).toBe("#FFFFFF");
    expect(cobalt2['code[class*="language-typescript"]'].color).toBe("#FFFFFF");
  });
});
