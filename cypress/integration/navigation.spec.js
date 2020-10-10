const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday").click().should("have.css", "background-color", "rgb(242, 242, 242)")
  });
});