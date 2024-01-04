
export function navigateTo (page:string){
    cy.get('[data-cy="navigationMenu"]').click()
    cy.get("[data-cy=\""+page+"\"]").click()
    cy.get('[data-cy="navigationMenuClose"]').click()
}