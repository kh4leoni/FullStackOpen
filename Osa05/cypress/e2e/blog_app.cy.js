describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'vaaratimo',
      name: 'Timo Vaaranen',
      password: 'salainen',
    }
    const user2 = {
      username: 'testimies',
      name: 'Testi Makkonen',
      password: 'appiukko',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('vaaratimo')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('Timo Vaaranen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('vaaratimo')
      cy.get('#password').type('palainen')
      cy.contains('login').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      const user = { username: 'vaaratimo', password: 'salainen' }
      cy.request('POST', 'http://localhost:3001/api/login', user).then(
        (res) => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
          cy.visit('http://localhost:3000')
        }
      )
    })
    it('new blog can be added', function () {
      cy.contains('add blog').click()

      cy.contains('create new')

      cy.get('#title').type('cypress blogi')
      cy.get('#author').type('Cypress Laakkonen')
      cy.get('#url').type('http://cypressmeininki.fi')
      cy.get('#send-button').click()

      cy.contains('cypress blogi')
    })
    describe('When blog is created', function () {
      beforeEach(function () {
        cy.contains('add blog').click()

        cy.contains('create new')

        cy.get('#title').type('cypress blogi')
        cy.get('#author').type('Cypress Laakkonen')
        cy.get('#url').type('http://cypressmeininki.fi')
        cy.get('#send-button').click()

        cy.contains('cypress blogi')
      })
      it('blog can be liked', function () {
        cy.get('#view').click()
        cy.get('#like').click()
      })
      it('blog can be deleted by user', function () {
        cy.get('#view').click()
        cy.get('#delete-button').click()

        cy.on('window:confirm', cy.stub().returns(true))

        cy.contains('#blogs', 'cypress blogi').should('not.exist')
      })
      it('only user that has created blog can see delete button', function () {
        cy.get('#logout').click()
        cy.get('#username').type('testimies')
        cy.get('#password').type('appiukko')
        cy.get('#login-button').click()

        cy.get('#view').click()
        cy.contains('#remove-div', 'remove').should('not.exist')
      })
      it('blog with most likes is listed first', function () {
        cy.contains('add blog').click()

        cy.get('#title').type('toinen blogi')
        cy.get('#author').type('Timoteus Akkunen')
        cy.get('#url').type('http://toinenblogi.fi')

        cy.get('#send-button').click()
        cy.contains('toinen blogi')

        cy.get('.blog').eq(1).find('button').contains('view').click()

        cy.get('.blog').eq(1).find('button').contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'toinen blogi')
      })
    })
  })
})
