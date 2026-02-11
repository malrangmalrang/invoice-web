import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EnvironmentVariables } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 금액을 한국 원화 형식으로 포맷팅
 * @param amount - 포맷팅할 금액 (숫자)
 * @returns "1,000,000원" 형식의 문자열
 * @example
 * formatCurrency(1000000) // "1,000,000원"
 * formatCurrency(0) // "0원"
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date - 포맷팅할 날짜 객체
 * @returns "2026년 2월 11일" 형식의 문자열
 * @example
 * formatDate(new Date('2026-02-11')) // "2026년 2월 11일"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * 환경변수 검증 및 반환
 * @returns 검증된 환경변수 객체
 * @throws {Error} 필수 환경변수가 누락되었거나 유효하지 않은 경우
 * @example
 * const env = validateEnv()
 * console.log(env.NOTION_API_KEY)
 */
export function validateEnv(): EnvironmentVariables {
  const requiredEnvVars: Array<keyof EnvironmentVariables> = [
    'NOTION_API_KEY',
    'NOTION_DATABASE_ID',
    'NOTION_ITEMS_DATABASE_ID',
  ]

  const missingVars: string[] = []

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar)
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `다음 환경변수가 설정되지 않았습니다: ${missingVars.join(', ')}\n` +
      `.env.local 파일에 환경변수를 추가하세요.`
    )
  }

  return {
    NOTION_API_KEY: process.env.NOTION_API_KEY!,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID!,
    NOTION_ITEMS_DATABASE_ID: process.env.NOTION_ITEMS_DATABASE_ID!,
  }
}
