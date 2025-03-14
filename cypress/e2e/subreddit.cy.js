describe('Subreddit Navigation', () => {
  beforeEach(() => {
    // Visit the homepage
    cy.visit('/');
    
    // Wait for posts to load
    cy.get('[data-testid="post-card"], .postCard', { timeout: 10000 }).should('be.visible');
  });

  it('allows navigating to a subreddit from a post', () => {
    // Find and click on a subreddit link
    cy.contains(/r\/\w+/i).first().click();
    
    // Verify URL contains the subreddit name
    cy.url().should('include', '/r/');
    
    // Wait for the subreddit page to load
    cy.wait(5000);
    
    // Verify subreddit name is displayed
    cy.contains(/r\/\w+/i).should('be.visible');
    
    // Verify posts are loaded for this subreddit
    cy.get('[data-testid="post-card"], .postCard', { timeout: 10000 }).should('have.length.at.least', 1);
  });
}); 