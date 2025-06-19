describe('대시보드 UI 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/dashboard**').as('getDashboard');
    cy.intercept('GET', '/api/transactions/groups**').as('getGroups');

    cy.login(); // ✅ 세션 설정
    cy.visit('/dashboard'); // ✅ 명시적 진입
    cy.wait(['@getDashboard', '@getGroups']);
    cy.get('[data-testid="dashboard-loading"]').should('not.exist'); // ✅ 로딩 완료 시점까지 기다림
  });

  it('대시보드 요약 정보가 표시된다', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Recent Transactions', { timeout: 10000 }).should('exist');
    cy.contains('View all').should('exist');
  });
});
