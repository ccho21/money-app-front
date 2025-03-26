import { Budget, CreateBudgetDto, UpdateBudgetDto } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// 예산 목록 조회
export async function fetchBudgets(): Promise<Budget[]> {
  try {
    const res = await fetch(`${API_BASE}/budgets`, {
      method: 'GET',
      credentials: 'include', // 쿠키 인증
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch budgets. Status: ${res.status}`);
    }
    return (await res.json()) as Budget[];
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : '예산 조회 중 오류 발생'
    );
  }
}

// 예산 생성
export async function createBudget(data: CreateBudgetDto): Promise<Budget> {
  try {
    const res = await fetch(`${API_BASE}/budgets`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Failed to create budget. Status: ${res.status}`);
    }
    return (await res.json()) as Budget;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : '예산 생성 중 오류 발생'
    );
  }
}

// 예산 수정
export async function updateBudget(
  id: string,
  data: UpdateBudgetDto
): Promise<Budget> {
  try {
    const res = await fetch(`${API_BASE}/budgets/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Failed to update budget. Status: ${res.status}`);
    }
    return (await res.json()) as Budget;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : '예산 수정 중 오류 발생'
    );
  }
}

// 예산 삭제
export async function deleteBudget(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/budgets/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error(`Failed to delete budget. Status: ${res.status}`);
    }
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : '예산 삭제 중 오류 발생'
    );
  }
}
