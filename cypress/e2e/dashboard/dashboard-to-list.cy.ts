// cypress/e2e/dashboard/dashboard-to-list.cy.ts

describe('대시보드 → 거래 목록 페이지 흐름', () => {
  beforeEach(() => {
    // ✅ 대시보드 주요 요청 대기 설정
    cy.intercept('GET', '/api/dashboard**').as('getDashboard');
    cy.intercept('GET', '/api/transactions/groups**').as('getGroups');

    cy.login(); // ✅ 세션 설정
    cy.visit('/dashboard'); // ✅ 명시적 진입

    // ✅ API 완료까지 기다림
    cy.wait(['@getDashboard', '@getGroups']);
    cy.get('[data-testid="dashboard-loading"]').should('not.exist');
  });

  it('"View all" 클릭 시 전체 거래 페이지로 이동한다', () => {
    // 대시보드 요소 확인
    cy.contains('Recent Transactions', { timeout: 10000 }).should('exist');

    // 정확한 "View all" 링크 클릭
    cy.contains('a', 'View all').click();

    // 거래 목록 페이지 진입 확인
    cy.url().should('include', '/transaction/view/list');
    cy.contains('Total Spending', { timeout: 10000 }).should('exist');
  });
});
