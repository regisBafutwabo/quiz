describe("In the Quiz Page", () => {
  //   beforeEach(() => {

  //   });

  it("You Should be able to see the QuestionCard Component", () => {
    cy.getBySel("question-card").should("be.visible");
  });

  it("Clicking on one of the answers should show the next Button", () => {
    cy.getBySel("answer-button").eq(0).click();
    cy.getBySel("next-question-button").should("be.visible");
  });

  it("Clicking on one of the answers the color of the button should change in relation to the answer", () => {
    cy.getBySel("answer-button").eq(0).click();
    cy.getBySel("answer-button").should("not.have.class", "bg-white");
  });

  it.only("Clicking on the Next button should take you the next question", () => {
    cy.visit("/quiz/9?difficulty=any");

    cy.getBySel("answer-button").eq(0).click();
    cy.getBySel("next-question-button").click();
    cy.getBySel("answer-button").eq(0).should("have.class", "bg-white");
  });
});
