
describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.viewport(1920, 1080)
  })


  it("Default customer should be checked out by normal pricing calculation", () => {
    cy.get('.listProduct .productCard:nth-child(1) #addToCheckout').click()
    cy.get('.listProduct .productCard:nth-child(2) #addToCheckout').click()
    cy.get('.listProduct .productCard:nth-child(3) #addToCheckout').click()
    cy.get('#totalPrice').should('have.text', '$49.97')
  })

  it("Microsoft's staff should be discounted on 3 for 2 Small Pizza", () => {
    cy.get('.listProduct .productCard:nth-child(1) #addToCheckout').click().click().click();
    cy.get('.listProduct .productCard:nth-child(3) #addToCheckout').click();
    cy.get('#company_switcher').select("Microsoft")
    cy.get('#totalPrice').should('have.text', '$45.97')
  })

  it("Microsoft's staff should not be discounted on 3 for 2 Small Pizza when buy only 1", () => {
    cy.get('.listProduct .productCard:nth-child(1) #addToCheckout').click();
    cy.get('.listProduct .productCard:nth-child(3) #addToCheckout').click();
    cy.get('#company_switcher').select("Microsoft")
    cy.get('#totalPrice').should('have.text', '$33.98')
  })


  it("Facebook's staff should be discounted on 5 for 4 deal on Medium Pizza", () => {
    cy.get('.listProduct .productCard:nth-child(1) #addToCheckout').click().click().click();
    cy.get('.listProduct .productCard:nth-child(3) #addToCheckout').click();
    cy.get('#company_switcher').select("Microsoft")
    cy.get('#totalPrice').should('have.text', '$45.97')
  })

  it("Amazon's staff should be discounted on Large Pizza where the price drops to $19.99 / pizza", () => {
    cy.get('.listProduct .productCard:nth-child(2) #addToCheckout').click().click().click();
    cy.get('.listProduct .productCard:nth-child(3) #addToCheckout').click();
    cy.get('#company_switcher').select("Amazon")
    cy.get('#totalPrice').should('have.text', '$67.96')
  })
})