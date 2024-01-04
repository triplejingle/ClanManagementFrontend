export function GetDataCyElement(element: string){
   return cy.get("[data-cy=\""+element+"\"]")
}