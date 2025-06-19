describe('지출 거래 생성 테스트', () => {
  beforeEach(() => {
    cy.login(); // 세션 설정
    cy.visit('/transaction/manage/new'); // 지출 폼 자동 렌더
  });

  it('지출 거래를 작성하고 저장할 수 있다', () => {
    // 금액
    cy.get('[data-testid="amount-input"]').type('99');

    // 계좌
    cy.get('[data-testid="account-selector"]').should('exist').click();
    cy.get('[data-slot="drawer-content"] button').next().click();

    // 카테고리
    cy.get('[data-testid="category-selector"]').should('exist').click();
    cy.get('[data-slot="drawer-content"] button').next().click();

    // 노트
    cy.get('input[name="note"]').type('테스트 지출');

    // 설명
    cy.get('textarea[name="description"]').type('자동화 테스트입니다');

    // 저장
    cy.contains('button', 'Save').should('not.be.disabled').click();

    // 이동 확인
    cy.url().should('include', '/transaction/view/list');
    cy.contains('Total Spending').should('exist');
  });
});
