describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header with search bar', () => {
    cy.get('header').should('be.visible');
    cy.get('input[type="search"]').should('be.visible');
  });

  it('displays a list of posts', () => {
    cy.get('[data-testid="post-card"]').should('have.length.at.least', 1);
  });

  it('allows filtering posts', () => {
    cy.get('[data-testid="filter-dropdown"]').click();
    cy.get('[data-testid="filter-option-new"]').click();
    cy.url().should('include', 'sort=new');
  });

  it('opens post detail when a post is clicked', () => {
    cy.get('[data-testid="post-card"]').first().click();
    cy.get('[data-testid="post-detail-modal"]').should('be.visible');
  });
}); 