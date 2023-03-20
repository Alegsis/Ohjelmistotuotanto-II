describe('Can you Sign up', function() {
  it('User is allowed to Register.', function() {
    cy.visit('http://localhost:3000')
    cy.contains("Login").click()
    cy.contains('Sign Up').click()
    cy.get('#username').type('Maisanen',{force:true})
    cy.get('#password').type('kyllikki',{force:true})
    cy.get('#password-again').type('kyllikki',{force:true})
    cy.get('#email').type('kyllikki@hotmale.com',{force:true})
    cy.contains('Sign up').click()
  })
})
describe('Can you Log in', function() {
  it('User is allowed to login.', function() {
    cy.visit('http://localhost:3000')
    cy.contains("Login").click()
    cy.get('input:first').type('Maisanen',{force:true})
    cy.get('input:last').type('kyllikki',{force:true})
    cy.contains('Log in').click({force:true})
    cy.contains('Dashboard').click()
    cy.contains('All categories')
  })
})



