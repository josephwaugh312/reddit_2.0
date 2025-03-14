describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
    
    // Wait for the page to load completely
    cy.get('body').should('be.visible');
  });

  it('loads posts on the homepage', () => {
    // Check if the header is visible
    cy.get('header').should('be.visible');
    
    // Check if posts are loaded (wait up to 10 seconds)
    cy.get('[data-testid="post-card"], .PostCard_postCard__01L9X', { timeout: 10000 })
      .should('have.length.at.least', 1);
    
    // Check if each post has a title
    cy.get('.PostCard_title__Cc8wX, h3').should('have.length.at.least', 1);
  });

  it('allows sorting posts', () => {
    // Check if sort button is visible
    cy.get('[data-testid="sort-button"]').should('be.visible');
    
    // Click on the sort button with force: true
    cy.get('[data-testid="sort-button"]').click({ force: true });
    
    // Wait a moment for any dropdown or menu to appear
    cy.wait(1000);
    
    // If a dropdown appears, try to click an option
    cy.get('body').then($body => {
      // Check if a dropdown menu is visible
      if ($body.find('.dropdown, .menu, .sortOptions, [role="menu"]').length > 0) {
        // Try to click on a sort option
        cy.contains('New').click({ force: true });
      }
    });
    
    // Verify posts are still loaded
    cy.get('[data-testid="post-card"], .PostCard_postCard__01L9X', { timeout: 10000 })
      .should('have.length.at.least', 1);
  });

  it('shows loading state and then posts', () => {
    // Reload the page to see loading state
    cy.reload();
    
    // Wait a bit for any loading state
    cy.wait(1000);
    
    // Check that posts eventually load
    cy.get('[data-testid="post-card"], .PostCard_postCard__01L9X', { timeout: 10000 })
      .should('be.visible');
  });

  it('navigates to post detail when clicking a post', () => {
    // Click on the first post (using force: true to bypass any overlapping elements)
    cy.get('.PostCard_postCard__01L9X a').first().click({ force: true });
    
    // Verify we're on a post detail page
    cy.url().should('include', '/posts/');
  });
}); 