describe('Post Detail View', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'https://www.reddit.com/hot.json', { fixture: 'posts.json' }).as('getPosts');
    cy.wait('@getPosts');
  });
  
  it('should navigate to post detail when clicking a post', () => {
    cy.get('[data-testid="post-card"]').first().find('h3').click();
    cy.url().should('include', '/posts/');
    cy.get('h1').should('be.visible');
  });
  
  it('should display post content and comments', () => {
    cy.get('[data-testid="post-card"]').first().find('h3').click();
    cy.get('h1').should('be.visible');
    cy.get('.commentsSection').should('be.visible');
    cy.get('.commentsList').should('exist');
  });
  
  it('should allow navigating back to the previous page', () => {
    cy.get('[data-testid="post-card"]').first().find('h3').click();
    cy.get('.backButton').click();
    cy.url().should('not.include', '/posts/');
  });
  
  it('should handle collapsing and expanding comments', () => {
    cy.get('[data-testid="post-card"]').first().find('h3').click();
    cy.get('.commentsList .comment').first().as('firstComment');
    cy.get('@firstComment').find('.commentBody').should('be.visible');
    cy.get('@firstComment').find('.collapseButton').click();
    cy.get('@firstComment').find('.commentBody').should('not.exist');
    cy.get('@firstComment').find('.collapseButton').click();
    cy.get('@firstComment').find('.commentBody').should('be.visible');
  });
}); 