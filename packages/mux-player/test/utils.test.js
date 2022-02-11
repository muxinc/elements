import { assert } from "@open-wc/testing";
import {
  stylePropsToString,
  uniqueId,
  html,
  PersistentFragment,
} from "../src/utils.ts";

describe("utils", () => {
  it("stylePropsToString", function () {
    assert.equal(
      stylePropsToString({
        fontSize: "12px",
        color: "#fff",
      }),
      "font-size: 12px; color: #fff;"
    );
  });

  it("uniqueId", function () {
    let id = uniqueId("uid");
    assert.equal(id, "uid1");

    assert.notEqual(uniqueId("uid"), id);
  });

  it("html", function () {
    let div = html`<div class="fruit"></div>`;
    // There is 1 extra helper text node to remember the place in the dom.
    assert.equal(div.childNodes.length, 2);
    assert.equal(div.childNodes[1].tagName, "DIV");
    assert(div instanceof PersistentFragment);
  });
});
