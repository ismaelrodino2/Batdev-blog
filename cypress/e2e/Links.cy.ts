describe('Navigation Links', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      })


    it('should test if nav link are working', async() => {
        
      cy.get('[data-testid="searchButton"]').contains("menu").click()

      cy.get('[data-testid="aboutMe"]').click()


        cy.url().should('eq', 'http://localhost:3000/aboutme')  
        

    })
  
  
  })
  
  export {}