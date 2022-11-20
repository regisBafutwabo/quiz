describe("In the home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("You should be able to load the page", () => {
    cy.getBySel("home-title").should("be.visible");
  });

  it("You should be able to see the 퀴즈 풀기 button", () => {
    cy.getBySel("solve-quiz-button-9").should("be.visible");
  });

  it("Clicking on the 퀴즈 풀기 for categoryID 9 button should open the quiz page with ", () => {
    cy.getBySel("solve-quiz-button-9").click();

    cy.location().should((location) => {
      expect(location.pathname).to.contain("/quiz/9");
    });
  });
});
