describe('지출 거래 수정 테스트', () => {
    beforeEach(() => {
      cy.login(); // 세션 설정
      cy.visit('/transaction/view/list'); // 거래 목록 페이지로 이동
    });
  
    it('기존 거래를 찾아 수정하고 저장할 수 있다', () => {
      // ✅ "테스트 지출"이라는 거래를 찾아 클릭
      cy.get('[data-testid="transaction-item"]')
        .contains('테스트 지출')
        .should('exist')
        .click();
  
      // ✅ 수정 페이지 진입 확인
      cy.url().should('include', '/transaction/manage');
  
      // ✅ 금액 수정
      cy.get('[data-testid="amount-input"]')
        .clear()
        .type('123');
  
      // ✅ 계좌 변경
      cy.get('[data-testid="account-selector"]').should('exist').click();
      cy.get('[data-slot="drawer-content"] button').next().click();
  
      // ✅ 카테고리 변경
      cy.get('[data-testid="category-selector"]').should('exist').click();
      cy.get('[data-slot="drawer-content"] button').next().click();
  
      // ✅ 노트 수정
      cy.get('input[name="note"]').clear().type('수정된 지출');
  
      // ✅ 설명 수정
      cy.get('textarea[name="description"]').clear().type('수정된 설명입니다');
  
      // ✅ 저장 버튼 클릭
      cy.contains('button', 'Update').should('not.be.disabled').click();
  
      // ✅ 목록으로 돌아왔는지 확인
      cy.url().should('include', '/transaction/view/list');
      cy.contains('Total Spending').should('exist');
    });
  
    // it('dirty 상태가 아니면 삭제 버튼이 나타나고 삭제할 수 있다', () => {
    //   // ✅ 거래 상세로 진입
    //   cy.get('[data-testid="transaction-item"]')
    //     .contains('수정된 지출') // 이전 테스트에서 수정된 텍스트 사용
    //     .should('exist')
    //     .click();
  
    //   // ✅ Delete 버튼이 존재하면 클릭
    //   cy.contains('button', 'Delete').should('exist').click();
  
    //   // ✅ 목록 페이지로 돌아왔는지 확인
    //   cy.url().should('include', '/transaction/view/list');
    //   cy.contains('모든 거래 내역').should('exist');
    // });
  });
  