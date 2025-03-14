describe('Error Handling', () => {
  it('handles 404 errors gracefully', () => {
    // Visit a non-existent post
    cy.visit('/posts/nonexistentpost123', { failOnStatusCode: false });
    
    // Check if an error message is displayed
    cy.contains(/not found|doesn't exist|error/i).should('be.visible');
  });
  
  it('handles network errors gracefully', () => {
    // Intercept API requests and force them to fail
    cy.intercept('GET', '**/reddit.com/r/**', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('apiRequest');
    
    // Visit the homepage
    cy.visit('/');
    
    // Wait for the intercepted request
    cy.wait('@apiRequest');
    
    // Check if an error message is displayed
    cy.contains(/error|failed|couldn't load/i).should('be.visible');
  });
}); 