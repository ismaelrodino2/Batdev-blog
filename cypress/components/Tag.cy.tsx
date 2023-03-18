// /// <reference types="cypress" />

import Tag from "../../src/app/components/Tag";

describe("<Tag />", () => {
  it("should render and display expected content", () => {
    // Mount the React component for the About page
    cy.mount(<Tag>{"test"}</Tag>);

    // The new page should contain an h1 with "About page"
    cy.get("h6").contains("test");
  });
});
