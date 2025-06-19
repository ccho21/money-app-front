// cypress/e2e/transaction/transaction-list.cy.ts

describe('거래 목록 페이지 동작 테스트', () => {
  beforeEach(() => {
    // ✅ 대시보드 관련 네트워크 요청 감지
    cy.intercept('GET', '/api/dashboard**').as('getDashboard');
    cy.intercept('GET', '/api/transactions/groups**').as('getGroups');

    cy.login(); // ✅ 세션 설정
    cy.visit('/dashboard'); // ✅ 명시적 진입

    cy.wait(['@getDashboard', '@getGroups']); // ✅ 데이터 로딩 보장
    cy.get('[data-testid="dashboard-loading"]').should('not.exist');
  });

  it('View all 클릭 → 거래 목록 페이지에서 항목 표시 확인', () => {
    cy.contains('Recent Transactions', { timeout: 10000 }).should('exist');

    // ✅ View all 링크 클릭
    cy.contains('a', 'View all').click();

    // ✅ 거래 목록 페이지 확인
    cy.url().should('include', '/transaction/view/list');
    cy.contains('Total Spending', { timeout: 10000 }).should('exist');

    // ✅ 거래 항목 존재 확인
    cy.get('[data-testid="transaction-group-item"]').should('have.length.greaterThan', 0);
  });
});
