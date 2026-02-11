import { LucideIcon } from 'lucide-react'
import type {
  PageObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints'

/**
 * 네비게이션 메뉴 항목 타입
 */
export type NavItem = {
  href: string
  label: string
}

/**
 * 기능 소개 항목 타입
 */
export type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

/**
 * 사이트 설정 타입
 */
export type SiteConfig = {
  name: string
  description: string
  url: string
  copyright: string
}

// ============================================================================
// Notion API 타입 정의
// ============================================================================

/**
 * Notion 페이지 프로퍼티 타입 헬퍼
 */
export type NotionProperties = PageObjectResponse['properties']

/**
 * Notion 견적서 페이지 응답 타입
 */
export type NotionInvoicePage = PageObjectResponse & {
  properties: {
    invoice_number: { type: 'title'; title: Array<{ plain_text: string }> }
    client_name: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    client_email: { type: 'email'; email: string | null }
    client_phone: { type: 'phone_number'; phone_number: string | null }
    client_company: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    issue_date: { type: 'date'; date: { start: string; end: string | null } | null }
    expiry_date: { type: 'date'; date: { start: string; end: string | null } | null }
    status: { type: 'select'; select: { name: string; color?: string } | null }
    company_name: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    company_registration: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    company_address: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    company_phone: { type: 'phone_number'; phone_number: string | null }
    company_email: { type: 'email'; email: string | null }
    subtotal: { type: 'number'; number: number | null }
    vat: { type: 'formula'; formula: { type: 'number'; number: number | null } }
    total: { type: 'formula'; formula: { type: 'number'; number: number | null } }
    notes: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    created_at: { type: 'created_time'; created_time: string }
  }
}

/**
 * Notion 견적 항목 페이지 응답 타입
 */
export type NotionInvoiceItemPage = PageObjectResponse & {
  properties: {
    name: { type: 'title'; title: Array<{ plain_text: string }> }
    spec: { type: 'rich_text'; rich_text: Array<{ plain_text: string }> }
    quantity: { type: 'number'; number: number | null }
    unit_price: { type: 'number'; number: number | null }
    amount: { type: 'formula'; formula: { type: 'number'; number: number | null } }
    invoice: { type: 'relation'; relation: Array<{ id: string }> }
  }
}

/**
 * Notion 데이터베이스 쿼리 응답 타입
 */
export type NotionInvoiceQueryResponse = QueryDataSourceResponse
export type NotionInvoiceItemQueryResponse = QueryDataSourceResponse

// ============================================================================
// 애플리케이션 데이터 모델
// ============================================================================

/**
 * 견적서 상태
 */
export type InvoiceStatus = 'Draft' | 'Sent' | 'Approved' | 'Rejected'

/**
 * 견적서 데이터 모델 (애플리케이션 내부용)
 */
export type Invoice = {
  /** 견적서 고유 ID */
  id: string
  /** 견적서 번호 (예: INV-2026-001) */
  invoiceNumber: string
  /** 클라이언트명 */
  clientName: string
  /** 클라이언트 이메일 */
  clientEmail: string
  /** 클라이언트 전화번호 (선택) */
  clientPhone?: string
  /** 클라이언트 회사명 (선택) */
  clientCompany?: string
  /** 발행일 */
  issueDate: Date
  /** 유효기간 */
  expiryDate: Date
  /** 견적서 상태 */
  status: InvoiceStatus
  /** 발행 회사명 */
  companyName: string
  /** 사업자등록번호 */
  companyRegistration: string
  /** 발행 회사 주소 */
  companyAddress: string
  /** 발행 회사 전화번호 */
  companyPhone: string
  /** 발행 회사 이메일 */
  companyEmail: string
  /** 공급가액 (부가세 제외) */
  subtotal: number
  /** 부가세 (공급가액 * 0.1) */
  vat: number
  /** 총 금액 (공급가액 + 부가세) */
  total: number
  /** 비고 (선택) */
  notes?: string
  /** 생성일시 */
  createdAt: Date
}

/**
 * 견적 항목 데이터 모델 (애플리케이션 내부용)
 */
export type InvoiceItem = {
  /** 항목 고유 ID */
  id: string
  /** 품목명 */
  name: string
  /** 규격/사양 (선택) */
  spec?: string
  /** 수량 */
  quantity: number
  /** 단가 */
  unitPrice: number
  /** 금액 (수량 * 단가) */
  amount: number
  /** 상위 견적서 ID */
  invoiceId: string
}

// ============================================================================
// 환경변수 타입
// ============================================================================

/**
 * 환경변수 타입 정의
 */
export type EnvironmentVariables = {
  /** Notion API 키 */
  NOTION_API_KEY: string
  /** 견적서 데이터베이스 ID */
  NOTION_DATABASE_ID: string
  /** 견적 항목 데이터베이스 ID */
  NOTION_ITEMS_DATABASE_ID: string
}
