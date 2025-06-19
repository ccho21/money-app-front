describe('로그인 플로우', () => {
  it('이메일/비번으로 로그인 후 대시보드로 이동', () => {
    cy.login(); // 내부에서 /dashboard로 이동

    cy.contains('Recent Transactions', { timeout: 10000 }).should('exist');
  });
});