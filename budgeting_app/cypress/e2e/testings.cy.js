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
describe('Creating a new account', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains("Login").click()
    cy.get('input:first').type('Maisanen',{force:true})
    cy.get('input:last').type('kyllikki',{force:true})
    cy.contains('Log in').click({force:true})
  })
  it('User is allowed to add account.', function() {
    cy.contains('AddAccount').click()
    cy.get('#account-name').type('S-Ryhmä',{force:true})
    cy.get('#account-balance').type('1000',{force:true})
    cy.get('[id=\'account-type\']').parent().click()
    //Tää on vähän SUS, mutta toimii ~90% kerroista :D Pitäis käyttää .Selectiä, mutta tämä homo ei anna
    cy.contains('Credit Card').click().click()
    cy.contains('Save').click()
    cy.contains('Accounts').click()
    cy.contains('S-Ryhmä')
  })
})


