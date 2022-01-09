/// <reference types="cypress" />

context("Evolucare Tests", () => {

    const btnSignIn = '.login'
    const myEmail = (Math.random() + 1).toString(36).substring(7) + "@gmail.com"
    const inputEmail = "input[class='is_required validate form-control'][id='email']"
    const inputEmailAlreadyRegistered = "#email"
    const btnSubmitAccount = "#submitAccount"
    const firstname = "Erdal"
    const lastname = "MyLastname"
    const address = "25 Rue Voltaire"
    const inputPassword = '#passwd'
    const pass = "12345"
    const newPass = "67890"
    const selectDays = '#days'
    const selectMonths = '#months'
    const selectYears = '#years'
    const birthDay = '1'
    const birthMonth = '6'
    const birthYear = '1987'
    const btnMyPersInf = "a[title='Information'] > span"
    const viewMyCustomerAccount = "a[title='View my customer account']>span"

    Cypress.Commands.add("login", () => {
        cy.visit(Cypress.config("url"))
        cy.get(btnSignIn).click()
        cy.get(inputEmailAlreadyRegistered).type(myEmail)
        cy.get(inputPassword).type(pass)
        cy.get('#SubmitLogin').click()
    })

    it("TC_01 Création de Compte", () => {
        cy.visit(Cypress.config("url"))
        cy.get(btnSignIn).click()
        cy.get('#email_create').clear().type(myEmail)
        cy.get('#SubmitCreate').click()
    })

    it("TC_02 Remplir le formulaire", () => {
        cy.get(inputEmail).clear().type("exemple1234@")
        cy.get('[type="radio"]').not('[disabled]').check('1').should('be.checked')
        cy.get(inputEmail).should('have.css', 'background-color', 'rgb(255, 241, 242)')
        cy.get(inputEmail).clear().type(myEmail)
        cy.get('#customer_firstname').type(firstname)
        cy.get(inputEmail).should('have.css', 'background-color', 'rgb(221, 249, 225)')
        cy.get('#customer_lastname').type(lastname)
        cy.get(selectDays).select(birthDay)
        cy.get(selectMonths).select(birthMonth)
        cy.get(selectYears).select(birthYear)
        cy.get("#address1").type(address)
        cy.get('#city').type('Limoges')
        cy.get('#id_state').select('5')
        cy.get('#postcode').type('12345')
        cy.get('#phone_mobile').type('8721589650')
        cy.get('#alias').clear().type('new address')
        cy.get(btnSubmitAccount).click()
        cy.get('.alert.alert-danger>p').should('have.text', 'There is 1 error')
        cy.get(inputPassword).type(pass)
        cy.get(btnSubmitAccount).click()
        cy.get(viewMyCustomerAccount).should('have.text', firstname + " " + lastname)
    })

    it("TC_03 Vérification du compte", () => {
        cy.login()
        cy.get("a[title='Orders'] > span").should('be.visible')
        cy.get("a[title='Credit slips'] > span").should('be.visible')
        cy.get("a[title='Addresses'] > span").should('be.visible')
        cy.get("a[title='My wishlists'] > span").should('be.visible')
        cy.get(btnMyPersInf).should('be.visible').click()
        cy.get("#firstname").should('have.value', firstname)
        cy.get("#lastname").should('have.value', lastname)
        cy.get(inputEmailAlreadyRegistered).should('have.value', myEmail)
        cy.get(selectDays).should('have.value', birthDay)
        cy.get(selectMonths).should('have.value', birthMonth)
        cy.get(selectYears).should('have.value', birthYear)
        cy.get("#old_passwd").type(pass)
        cy.get(inputPassword).type(newPass)
        cy.get('#confirmation').type(newPass)
        cy.get("button[name='submitIdentity']").click()
        cy.get(".alert.alert-success").should('include.text', 'Your personal information has been successfully updated.')
        cy.get('.logout').click()
        cy.get(inputEmailAlreadyRegistered).type(myEmail)
        cy.get(inputPassword).type(newPass)
        cy.xpath("//button[@id='SubmitLogin']").click()
    })
})