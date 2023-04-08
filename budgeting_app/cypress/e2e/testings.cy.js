// describe('Can you Sign up', function() {
//   it('User is allowed to Register.', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains("Login").click()
//     cy.contains('Sign Up').click()
//     cy.get('#username').type('aleksi12',{force:true})
//     cy.get('#password').type('votkulinen',{force:true})
//     cy.get('#password-again').type('votkulinen',{force:true})
//     cy.get('#email').type('aleksi@hotmale1.com',{force:true})
//     cy.contains('Sign up').click()
//   })
// })
describe('Creating a new account', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains("Login").click()
    cy.get('input:first').type('täyttöTesti',{force:true})
    cy.get('input:last').type('testitesti',{force:true})
    cy.contains('Log in').click({force:true})
//    cy.wait(8000)
//    cy.get('alert').should('not.exist');
  })
  // it('User is allowed to add account.', function() {
  //   cy.contains('AddAccount').click()
  //   cy.get('#account-name').type('Paikallispankki',{force:true})
  //   cy.get('#account-balance').type('2500',{force:true})
  //   cy.get('[id=\'account-type\']').parent().click()
  //   cy.contains('Credit Card').click()
  //   cy.contains('Save').click()
  //   cy.contains('Accounts').click()
  //   cy.contains('Osuuspankki')
  // })
  //
  // it('User is allowed to add new categories.', function() {
  //   cy.contains('Dashboard').click()
  //   cy.contains('Add Category').click()
  //   cy.get('#category').type('Turhakkeet',{force:true})
  //   cy.contains('Save').click();
  //   cy.contains("Turhakkeet")
  // })
  //
  // it('User is allowed to add new subcategories.', function() {
  //   cy.contains('Dashboard').click()
  //   cy.contains('Add subcategory').click()
  //   cy.get('#Category').click();
  //   cy.get('[data-value="Turhakkeet"]').click();
  //   cy.get('#sub-category').type('VedenalainenPyykinpesukone',{force:true})
  //   cy.get("#balance").type('666',{force:true})
  //   cy.contains('Save').click();
  //   cy.contains("VedenalainenPyykinpesukone")
  // })
  //
  // it('User is allowed to edit categories.', function() {
  //   cy.contains('Dashboard').click()
  //   cy.contains('Edit category').click()
  //   cy.get('#Category').click();
  //   cy.get('[data-value="Turhakkeet"]').click();
  //   cy.get('#category').type('Hassuttelu',{force:true})
  //   cy.contains('Save changes').click();
  // })
  //
  // it('User is allowed to edit subcategories.', function() {
  //   cy.contains('Dashboard').click()
  //   cy.contains('edit subcategory').click()
  //   cy.get('#SubCategory').click();
  //   cy.get('[data-value="VedenalainenPyykinpesukone"]').click();
  //   cy.get('#Category').click();
  //   cy.get('[data-value="kategoria"]').click();
  //   cy.get('#sub-category').type('Kissanruoka',{force:true})
  //   cy.contains('Save changes').click();
  // })

  it('User is allowed to budget', function() {
    cy.contains('Dashboard').click()
    cy.contains('Budget').click()
    cy.get('#fromSubcategory').click();
    cy.get('[data-value="VedenalainenPyykinpesukone"]').click();
    cy.get('#subcategory-name').click();
    cy.get('[data-value="Pyllytin"]').click();
    cy.get('#amount').type(153.55);
    cy.contains("Make budgeting").click()
  })


  // it('User is allowed to add transactions.', function() {
  //
  //   cy.contains('Accounts').click()
  //   cy.wait(1000)
  //   cy.contains('Add transaction').click()
  //   cy.get('#transactionName').type('Vaatekuluista',{force:true})
  //   cy.get('#inflow').type('30',{force:true})
  //   cy.get('#payee').type("äitis")
  //   cy.get('#memo').type('ostoksilla äiteen kanssa',{force:true})
  //   cy.get('#account-name').click();
  //   cy.get('[data-value="S-pankki"]').click();
  //   cy.get('#subcategory-name').click();
  //   cy.get('[data-value="Pyllytin"]').click();
  //   cy.contains('Add new transaction').click();
  // })
})


