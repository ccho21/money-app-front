describe('지출 거래 삭제 테스트', () => {
  beforeEach(() => {
    cy.login(); // 세션 설정
    cy.visit('/transaction/view/list'); // 거래 목록 진입
  });

  it('거래를 찾아 삭제할 수 있다', () => {
    // ✅ 거래 항목 클릭 ("수정된 지출" 또는 "테스트 지출")
    cy.get('[data-testid="transaction-item"]')
      .contains('수정된 지출')
      .should('exist')
      .click();

    // ✅ 수정 페이지 진입 확인
    cy.url().should('include', '/transaction/manage');

    // ✅ Delete 버튼이 존재하고 클릭 가능해야 함
    cy.contains('button', 'Delete').should('exist').click();

    // ✅ 목록 페이지로 돌아왔는지 확인
    cy.url().should('include', '/transaction/view/list');
    cy.contains('Total Spending').should('exist');

    // ✅ 삭제된 거래가 목록에 더 이상 나타나지 않아야 함
    cy.get('[data-testid="transaction-item"]')
      .contains('수정된 지출')
      .should('not.exist');
  });
});
