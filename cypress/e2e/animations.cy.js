describe('Animations', () => {
  it('animates post cards on load', () => {
    cy.visit('/');
    
    // Check if posts are loaded
    cy.get('[data-testid="post-card"], .postCard', { timeout: 10000 }).should('be.visible');
    
    // Check if the posts are fully visible (opacity should be 1)
    cy.get('[data-testid="post-card"], .postCard').first()
      .should('have.css', 'opacity', '1');
  });
  
  it('animates post details when viewing a post', () => {
    cy.visit('/');
    
    // Wait for posts to load
    cy.get('[data-testid="post-card"], .postCard', { timeout: 10000 }).should('be.visible');
    
    // Click on the first post
    cy.get('[data-testid="post-card"] a, .postCard a').first().click();
    
    // Verify we're on a post detail page
    cy.url().should('include', '/posts/');
    
    // Check if the post detail content is fully visible
    cy.get('.postContent, .selftext, .postBody').should('be.visible');
  });
}); 