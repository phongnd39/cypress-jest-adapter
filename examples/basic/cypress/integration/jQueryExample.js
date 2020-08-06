describe('Test jQuery matchers', () => {
  it('Go to test page', () => {
    cy.visit('https://example.cypress.io/')
    cy.get('.home-list').contains('Actions').click()
  })

  it('test toHaveAttr', () => {
    cy.get('#email1').should('to.have.attr', 'id', 'email1')
    cy.get('#email1').should('not.to.have.attr', 'id', 'email2')
    cy.get('#email1').should('toHaveAttr', 'id')
    cy.get('#email1').should('toHaveAttr', 'id', 'email1')
    cy.get('#email1').should('not.toHaveAttr', 'id-test')
    cy.get('#email1').should('not.toHaveAttr', 'id', 'email2')
    cy.get('#email1').should('toNotHaveAttr', 'id-test')
    cy.get('#email1').should('toNotHaveAttr', 'id', 'email2')
    cy.get('#email1').should(($ele) => {
      expect($ele).toHaveAttr('id')
      expect($ele).toHaveAttr('id', 'email1')
      expect($ele).toNotHaveAttr('id2')
      expect($ele).toNotHaveAttr('id', 'email2')
      expect($ele).not.toHaveAttr('id2')
      expect($ele).not.toHaveAttr('id', 'email2')
    })
  })
  it('test toHaveProp', () => {
    cy.get('#email1').clear().type('abc')
    cy.get('#email1').should('to.have.prop', 'value', 'abc')
    cy.get('#email1').should('not.to.have.prop', 'value', 'abcd')
    cy.get('#email1').should('toHaveProp', 'value')
    cy.get('#email1').should('toHaveProp', 'value', 'abc')
    cy.get('#email1').should('not.toHaveProp', 'value-test')
    cy.get('#email1').should('not.toHaveProp', 'value', 'abcd')
    cy.get('#email1').should('toNotHaveProp', 'value-test')
    cy.get('#email1').should('toNotHaveProp', 'value', 'abcd')
    cy.get('#email1').should(($ele) => {
      expect($ele).toHaveProp('value')
      expect($ele).toHaveProp('value', 'abc')
      expect($ele).toNotHaveProp('value2')
      expect($ele).toNotHaveProp('value2', 'abcd')
      expect($ele).not.toHaveProp('value2')
      expect($ele).not.toHaveProp('value2', 'abcd')
    })
  })
  it('test toHaveCss', () => {
    cy.get('.banner').should('to.have.css', 'background-color')
    cy.get('.banner').should(
      'to.have.css',
      'background-color',
      'rgb(0, 191, 136)'
    )
    cy.get('.banner').should('not.to.have.css', 'background-color', 'white')
    cy.get('.banner').should('toHaveCss', 'background-color')
    cy.get('.banner').should(
      'toHaveCss',
      'background-color',
      'rgb(0, 191, 136)'
    )
    cy.get('.banner').should('not.toHaveCss', 'background-color-test')
    cy.get('.banner').should('not.toHaveCss', 'background-color', 'white')
    cy.get('.banner').should('toNotHaveCss', 'background-color-test')
    cy.get('.banner').should('toNotHaveCss', 'background-color', 'white')
    cy.get('.banner').should(($ele) => {
      expect($ele).toHaveCss('background-color')
      expect($ele).toHaveCss('background-color', 'rgb(0, 191, 136)')
      expect($ele).toNotHaveCss('background-color-test')
      expect($ele).toNotHaveCss('background-color', 'white')
      expect($ele).not.toHaveCss('background-color-test')
      expect($ele).not.toHaveCss('background-color', 'white')
    })
  })
  it('test toHaveData', () => {
    cy.get('.active .dropdown-toggle').should(
      'to.have.data',
      'toggle',
      'dropdown'
    )
    cy.get('.active .dropdown-toggle').should(
      'not.to.have.data',
      'toggle',
      'dropdown2'
    )
    cy.get('.active .dropdown-toggle').should('toHaveData', 'toggle')
    cy.get('.active .dropdown-toggle').should(
      'toHaveData',
      'toggle',
      'dropdown'
    )
    cy.get('.active .dropdown-toggle').should('not.toHaveData', 'toggle-test')
    cy.get('.active .dropdown-toggle').should(
      'not.toHaveData',
      'toggle',
      'dropdown2'
    )
    cy.get('.active .dropdown-toggle').should('toNotHaveData', 'toggle-test')
    cy.get('.active .dropdown-toggle').should(
      'toNotHaveData',
      'toggle',
      'dropdown2'
    )
    cy.get('.active .dropdown-toggle').should(($ele) => {
      expect($ele).toHaveData('toggle')
      expect($ele).toHaveData('toggle', 'dropdown')
      expect($ele).toNotHaveData('toggle2')
      expect($ele).toNotHaveData('toggle2', 'dropdown2')
      expect($ele).not.toHaveData('toggle2')
      expect($ele).not.toHaveData('toggle2', 'dropdown2')
    })
  })
  it('test toHaveClass', () => {
    cy.get('#email1').should('to.have.class', 'action-email')
    cy.get('#email1').should('not.to.have.class', 'action-email-test')
    cy.get('#email1').should('toHaveClass', 'action-email')
    cy.get('#email1').should('not.toHaveClass', 'action-email-test')
    cy.get('#email1').should('toNotHaveClass', 'action-email-test')
    cy.get('#email1').should(($ele) => {
      expect($ele).toHaveClass('action-email')
      expect($ele).toNotHaveClass('action-email-test')
      expect($ele).not.toHaveClass('action-email-test')
    })
  })
  it('test toHaveId', () => {
    cy.get('#email1').should('to.have.id', 'email1')
    cy.get('#email1').should('not.to.have.id', 'email1-test')
    cy.get('#email1').should('toHaveId', 'email1')
    cy.get('#email1').should('not.toHaveId', 'email1-test')
    cy.get('#email1').should('toNotHaveId', 'email1-test')
    cy.get('#email1').should(($ele) => {
      expect($ele).toHaveId('email1')
      expect($ele).toNotHaveId('email1-test')
      expect($ele).not.toHaveId('email1-test')
    })
  })
  it('test toHaveHtml', () => {
    cy.get('.banner .container h1').should('to.have.html', 'Actions')
    cy.get('.banner .container h1').should('not.to.have.html', 'Actions-test')
    cy.get('.banner .container h1').should('toHaveHtml', 'Actions')
    cy.get('.banner .container h1').should('not.toHaveHtml', 'Actions-test')
    cy.get('.banner .container h1').should('toNotHaveHtml', 'Actions-test')
    cy.get('.banner .container h1').should(($ele) => {
      expect($ele).toHaveHtml('Actions')
      expect($ele).toNotHaveHtml('Actions-test')
      expect($ele).not.toHaveHtml('Actions-test')
    })
  })
  it('test toHaveText', () => {
    cy.get('.banner .container h1').should('to.have.text', 'Actions')
    cy.get('.banner .container h1').should('not.to.have.text', 'Actions-test')
    cy.get('.banner .container h1').should('toHaveText', 'Actions')
    cy.get('.banner .container h1').should('not.toHaveText', 'Actions-test')
    cy.get('.banner .container h1').should('toNotHaveText', 'Actions-test')
    cy.get('.banner .container h1').should(($ele) => {
      expect($ele).toHaveText('Actions')
      expect($ele).toNotHaveText('Actions-test')
      expect($ele).not.toHaveText('Actions-test')
    })
  })
  it('test toHaveValue', () => {
    cy.get('#email1').clear().type('abc')
    cy.get('#email1').should('to.have.value', 'abc')
    cy.get('#email1').should('not.to.have.value', 'abcd')
    cy.get('#email1').should('toHaveValue', 'abc')
    cy.get('#email1').should('not.toHaveValue', 'abcd')
    cy.get('#email1').should('toNotHaveValue', 'abcd')
    cy.get('#email1').should(($ele) => {
      expect($ele).toHaveValue('abc')
      expect($ele).toNotHaveValue('abcd')
      expect($ele).not.toHaveValue('abcd')
    })
  })
  it('test toBeVisible', () => {
    cy.get('.nav .active .dropdown-menu').should('not.be.visible')
    cy.get('.nav .active .dropdown-menu').should('toNotBeVisible')
    cy.get('.nav .active .dropdown-menu').should('not.toBeVisible')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toNotBeVisible()
      expect($ele).not.toBeVisible()
    })
    cy.get('.nav .active .dropdown-toggle').click()
    cy.get('.nav .active .dropdown-menu').should('be.visible')
    cy.get('.nav .active .dropdown-menu').should('toBeVisible')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toBeVisible()
    })
    cy.get('.nav .active .dropdown-toggle').click()
    cy.get('.nav .active .dropdown-menu').should('not.be.visible')
    cy.get('.nav .active .dropdown-menu').should('toNotBeVisible')
    cy.get('.nav .active .dropdown-menu').should('not.toBeVisible')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toNotBeVisible()
      expect($ele).not.toBeVisible()
    })
  })
  it('test toBeHidden', () => {
    cy.get('.nav .active .dropdown-menu').should('be.hidden')
    cy.get('.nav .active .dropdown-menu').should('toBeHidden')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toBeHidden()
    })
    cy.get('.nav .active .dropdown-toggle').click()
    cy.get('.nav .active .dropdown-menu').should('not.be.hidden')
    cy.get('.nav .active .dropdown-menu').should('not.toBeHidden')
    cy.get('.nav .active .dropdown-menu').should('toNotBeHidden')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toNotBeHidden()
      expect($ele).not.toBeHidden()
    })
    cy.get('.nav .active .dropdown-toggle').click()
    cy.get('.nav .active .dropdown-menu').should('be.hidden')
    cy.get('.nav .active .dropdown-menu').should('toBeHidden')
    cy.get('.nav .active .dropdown-menu').then(($ele) => {
      expect($ele).toBeHidden()
    })
  })
  it('test toBeSelected', () => {
    cy.get('.action-select option[value="fr-apples"]').should('not.be.selected')
    cy.get('.action-select option[value="fr-apples"]').should(
      'not.toBeSelected'
    )
    cy.get('.action-select option[value="fr-apples"]').should('toNotBeSelected')
    cy.get('.action-select option[value="fr-apples"]').then(($ele) => {
      expect($ele).toNotBeSelected()
      expect($ele).not.toBeSelected()
    })
    cy.get('.action-select').select('apples')
    cy.get('.action-select option[value="fr-apples"]').should('be.selected')
    cy.get('.action-select option[value="fr-apples"]').should('toBeSelected')
    cy.get('.action-select option[value="fr-apples"]').then(($ele) => {
      expect($ele).toBeSelected()
    })
    cy.get('.action-select').select('oranges')
    cy.get('.action-select option[value="fr-apples"]').should('toNotBeSelected')
    cy.get('.action-select option[value="fr-apples"]').should(
      'not.toBeSelected'
    )
  })
  it('test toBeChecked', () => {
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.be.checked'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.toBeChecked'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'toNotBeChecked'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').then(($el) => {
      expect($el).toNotBeChecked()
      expect($el).not.toBeChecked()
    })
    cy.get('.action-checkboxes [type="checkbox"]').check('checkbox1')
    cy.get('.action-checkboxes input[value="checkbox1"]').should('be.checked')
    cy.get('.action-checkboxes input[value="checkbox1"]').should('toBeChecked')
    cy.get('.action-checkboxes input[value="checkbox1"]').then(($el) => {
      expect($el).toBeChecked()
    })
  })
  it('test toBeEnabled', () => {
    cy.get('.action-checkboxes input[value="checkbox1"]').should('be.enabled')
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.be.disabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should('toBeEnabled')
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'toNotBeDisabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.toBeDisabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').then(($el) => {
      expect($el).toBeEnabled()
      expect($el).toNotBeDisabled()
      expect($el).not.toBeDisabled()
    })
  })
  it('test toBeDisabled', () => {
    cy.get('.action-checkboxes input[value="checkbox2"]').should('be.disabled')
    cy.get('.action-checkboxes input[value="checkbox2"]').should(
      'not.be.enabled'
    )
    cy.get('.action-checkboxes input[value="checkbox2"]').should(
      'toNotBeEnabled'
    )
    cy.get('.action-checkboxes input[value="checkbox2"]').should(
      'not.toBeEnabled'
    )
    cy.get('.action-checkboxes input[value="checkbox2"]').should('toBeDisabled')
    cy.get('.action-checkboxes input[value="checkbox2"]').then(($el) => {
      expect($el).toBeDisabled()
      expect($el).toNotBeEnabled()
      expect($el).not.toBeEnabled()
    })
  })
  it('test toBeEmpty', () => {
    cy.get('.opacity-cover').should('to.be.empty')
    cy.get('.opacity-cover').should('toBeEmpty')
    cy.get('.banner .container h1').should('not.be.empty')
    cy.get('.banner .container h1').should('not.toBeEmpty')
    cy.get('.banner .container h1').should('toNotBeEmpty')
  })
  it('test toExist', () => {
    cy.get('.action-labels .popover').should('not.be.exist')
    cy.get('.action-labels .popover').should('not.toExist')
    cy.get('.action-labels .popover').should('toNotExist')
    cy.get('.action-labels .label').contains('click me').click()
    cy.get('.action-labels .popover').should('be.exist')
    cy.get('.action-labels .popover').should('toExist')
    cy.get('.action-labels .label').contains('click me').click()
  })
  it('test toMatchSelector', () => {
    cy.get('.action-checkboxes input[value="checkbox2"]').should(
      'to.match',
      ':disabled'
    )
    cy.get('.action-checkboxes input[value="checkbox2"]').should(
      'toMatchSelector',
      ':disabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.to.match',
      ':disabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'toNotMatchSelector',
      ':disabled'
    )
    cy.get('.action-checkboxes input[value="checkbox1"]').should(
      'not.toMatchSelector',
      ':disabled'
    )
  })
  it('test toContainText', () => {
    cy.get('.banner .container p').should('to.contain', 'cypress')
    cy.get('.banner .container p').should('not.to.contain', 'lorem ipsum')
    cy.get('.banner .container p').should('toContainText', 'cypress')
    cy.get('.banner .container p').should('not.toContainText', 'lorem ipsum')
    cy.get('.banner .container p').should('toNotContainText', 'lorem ipsum')
  })
  it('test toHaveDescendant', () => {
    cy.get('.banner .container').should('to.have.descendants', 'h1')
    cy.get('.banner .container').should('not.have.descendants', 'test')
    cy.get('.banner .container').should('toHaveDescendant', 'h1')
    cy.get('.banner .container').should('not.toHaveDescendant', 'test')
    cy.get('.banner .container').should('toNotHaveDescendant', 'test')
  })
  it('test toHaveDescendantWithText', () => {
    cy.get('.banner .container').should(
      'toHaveDescendantWithText',
      'h1',
      'Actions'
    )
    cy.get('.banner .container').should(
      'not.toHaveDescendantWithText',
      'h1',
      'Actions2'
    )
    cy.get('.banner .container').should(
      'not.toHaveDescendantWithText',
      'h2',
      'Actions'
    )
    cy.get('.banner .container').should(
      'toNotHaveDescendantWithText',
      'h1',
      'Actions2'
    )
    cy.get('.banner .container').should(
      'toNotHaveDescendantWithText',
      'h2',
      'Actions'
    )
  })
  it('test toHaveQuantity', () => {
    cy.get('.banner .container h1').should('toHaveQuantity', 1)
    cy.get('.banner .container h1').should('not.toHaveQuantity', 2)
    cy.get('.banner .container h1').should('toNotHaveQuantity', 2)
  })
  it('test toHaveTag', () => {
    cy.get('.banner .container h1').should('toHaveTag', 'h1')
    cy.get('.banner .container h1').should('not.toHaveTag', 'h2')
    cy.get('.banner .container h1').should('toNotHaveTag', 'h2')
  })
  it('test toBeFocused', () => {
    cy.get('#email1').focus()
    cy.get('#email1').should('toBeFocused')
    cy.get('#email1').blur()
    cy.get('#email1').should('not.toBeFocused')
    cy.get('#email1').should('toNotBeFocused')
  })
})
