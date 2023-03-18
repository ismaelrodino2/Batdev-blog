describe('template spec', () => {

  it('should test if search term is present on posts and dark theme', async() => {
    cy.visit('http://localhost:3000/')

    const searchTerm = "asd"

    cy.get('[data-testid="searchButton"]').contains("search").click()
    cy.get('input[placeholder="Search for a title..."]').type(searchTerm);


    cy.get('[data-testid="posts"]').each(($post) => {
      cy.wrap($post).contains(searchTerm).should('exist')
    })


    const wrongSearchTerm = "qweqweqwe"

    cy.get('[data-testid="searchButton"]').contains("search").click()
    cy.get('input[placeholder="Search for a title..."]').type(searchTerm);


    cy.get('[data-testid="posts"]').each(($post) => {
      cy.wrap($post).contains(wrongSearchTerm).should('not.exist')
    })

  
    cy.get('[data-testid="bg"]').click()
    cy.get('[data-testid="bg"]').should('have.css', 'background-color').and('eq', 'rgb(255, 255, 255)')


    cy.get('[data-testid="darkMode"]').click()

    cy.get('[data-testid="bg"]').should('have.css', 'background-color').and('eq', 'rgb(24, 26, 27)')

  })


})

export {}