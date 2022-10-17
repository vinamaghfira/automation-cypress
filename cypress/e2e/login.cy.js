describe("Login Page Test Cases", () => {

    it("Visit Login Page", () => {
       cy.visit("https://www.instagram.com");
       cy.title().should("eq", "Instagram");
       cy.contains("Instagram")
    });

    it("Contains Nomor Telepon,nama pengguna, atau email and Kata sandi Input, and Login Button", () => {
       //check email
       const user = cy.get("input[name='username']");
       user.should("be.visible");
       user.should("have.attr", "type", "text");
       user.should("have.attr", "aria-label", "Phone number, username, or email");

        //check password
        const password = cy.get("input[name='password']");
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "aria-label", "Password");

        //check button
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Log in");
    });

    it('Do Login with Wrong values', ()=>{
     cy.get('form').within(($form) => {
        cy.get('input[name="username"]').type('wrong@user.test')
        cy.get('input[name="password"]').type('ibucantikku')
        cy.root().submit()
      });

     cy.on("window:alert", (text) => {
        expect(text).to.contains("The username you entered doesn't belong to an account. Please check your username and try again.")
    });
  });


    it('Do Login with Correct values', ()=>{
     cy.get('form').within(($form) => {
        cy.get('input[name="username"]').clear();
        cy.get('input[name="username"]').type('testdulu71')
        cy.get('input[name="password"]').clear();
        cy.get('input[name="password"]').type('test12345')
        cy.root().submit()
      });
     //  cy.url().should('include', '/?next=%2F');
      cy.url({ timeout: 20000 }).should('eq', 'https://www.instagram.com/accounts/onetap/?next=%2F')
    });

});