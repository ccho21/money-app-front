//
// ✅ 공통 타입
//
export type CategoryType = 'income' | 'expense';

//
// ✅ 카테고리 기본 DTO (백엔드 Category 모델 기반)
export interface CategoryDTO {
  id: string;
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
  userId?: string; // 필요 시 추가
}

//
// ✅ 카테고리 생성 요청 DTO
export interface CategoryCreateRequestDTO {
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
}

//
// ✅ 카테고리 수정 요청 DTO
export type CategoryUpdateRequestDTO = Partial<CategoryCreateRequestDTO>;

//
// ✅ 카테고리 목록 응답 DTO (단순 리스트)
export interface CategoryListResponseDTO {
  total: number;
  data: CategoryDTO[];
}

//
// ✅ 통계 또는 필터용 요약용 카테고리 정보
export interface CategorySummaryDTO {
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  icon: string;
  color?: string;
}
