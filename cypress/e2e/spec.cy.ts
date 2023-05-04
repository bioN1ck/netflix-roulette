import { SortOption } from '../../src/components/SortControl/SortControl';

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  describe('Search', () => {
    it('should render search component', () => {
      cy.getEl('search').should('exist');
    });

    it('should type search query and send request to a server', () => {
      cy.getEl('search').find('> input').type('la');
      cy.getEl('search').find('> button').click();

      cy.getEl('movie-count').find('span').should('contain', 234);
      cy.getEl('movie-list').find('> div').should('have.length', 12);
      cy.url().should('include', 'search=la');
    });

    it('should type a query and return 0 results', () => {
      cy.getEl('search').find('> input').type('lasdfasdfsfsdfdfs');
      cy.getEl('search').find('> button').click();

      cy.getEl('movie-count').find('span').should('contain', 0);
      cy.getEl('movie-list').find('> div').should('have.length', 0);
      cy.url().should('include', 'search=lasdfasdfsfsdfdfs');
    });

    it('should type a query and return 4 results by pressing Enter', () => {
      cy.getEl('search').find('> input').type('later').type('{Enter}');

      cy.getEl('movie-count').find('span').should('contain', 4);
      cy.getEl('movie-list').find('> div').should('have.length', 4);
      cy.url().should('include', 'search=later');
    });

  });

  describe('Sort', () => {
    it('should sort movies by release date by default', () => {
      cy.getEl('movie-count').find('span').should('contain', 3000);
      cy.getEl('movie-list').find(':nth-child(1) > h3').should('contain', 'The Gold Rush');
      cy.url().should('not.include', 'sortBy=');
    });

    it('should sort movies by title', () => {
      cy.getEl('sort-control').click();
      cy.getEl('sort-control-list').contains(SortOption.TITLE).click();

      cy.getEl('movie-count').find('span').should('contain', 3000);
      cy.getEl('movie-list').find(':nth-child(1) > h3').should('contain', '¡Three Amigos!');
      cy.url().should('include', 'sortBy=title');
    });

    it('should sort movies by release date by choosing an option', () => {
      cy.getEl('sort-control').click();
      cy.getEl('sort-control-list').contains(SortOption.TITLE).click();

      cy.getEl('sort-control').click();
      cy.getEl('sort-control-list').contains(SortOption.RELEASE_DATE).click();

      cy.getEl('movie-count').find('span').should('contain', 3000);
      cy.getEl('movie-list').find(':nth-child(1) > h3').should('contain', 'The Gold Rush');
      cy.url().should('include', 'sortBy=release_date');
    });
  });

  describe('Switch genres', () => {
    it('should switch genres to Documentary', () => {
      cy.getEl('genre-select').contains(/Documentary/i).click();

      cy.getEl('movie-count').find('span').should('contain', 13);
      cy.getEl('movie-list').find(':nth-child(1) > h3').should('contain', 'Puberty: Sexual Education For Boys And Girls');
      cy.url().should('include', 'filter=documentary');
    });

    it('should switch genres to Comedy', () => {
      cy.getEl('genre-select').contains(/Comedy/i).click();

      cy.getEl('movie-count').find('span').should('contain', 905);
      cy.getEl('movie-list').find(':nth-child(1) > h3').should('contain', 'The Gold Rush');
      cy.url().should('include', 'filter=comedy');
    });
  });

  describe('Movie selection', () => {
    it('should render search bar by default', () => {
      cy.getEl('movie-details').should('not.exist');
      cy.getEl('movie-search-bar').should('exist');
    });

    it('should select a movie and render details about it', () => {
      cy.getEl('movie-list').find('> div:nth-child(1)').click();

      cy.getEl('movie-details').should('exist');
      cy.getEl('movie-search-bar').should('not.exist');
      cy.url().should('include', '/962');
    });

    it('should select a movie and return back to search bar by clicking a button', () => {
      cy.getEl('movie-list').find('> div:nth-child(2)').click();

      cy.getEl('movie-details').should('exist');
      cy.getEl('movie-search-bar').should('not.exist');
      cy.url().should('include', '/19');

      cy.getEl('movie-details').find('button').click();

      cy.getEl('movie-details').should('not.exist');
      cy.getEl('movie-search-bar').should('exist');
    })
  });
});
