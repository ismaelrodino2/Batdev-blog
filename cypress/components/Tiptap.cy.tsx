import React from "react";
import { Tiptap } from "../../src/app/components/Editor";

describe("Test component", () => {
  it("should update the description", () => {
    const setDescription = cy.stub();
    const description = "initial description";
    cy.mount(
      <Tiptap setDescription={setDescription} description={description} />
    );

    cy.get(".ProseMirror").type("new description");
    cy.wrap(setDescription).should(
      "have.been.calledWith",
      "<p>" + description + "new description</p>"
    );
  });
});
