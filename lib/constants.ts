import {
  FileText,
  Download,
  Shield,
} from 'lucide-react'
import { NavItem, Feature, SiteConfig } from '@/types'

/**
 * 네비게이션 메뉴 항목
 */
export const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: '홈',
  },
]

/**
 * 사이트 기본 정보
 */
export const SITE_CONFIG: SiteConfig = {
  name: '견적서 시스템',
  description:
    '노션 데이터베이스를 활용한 견적서 관리 및 PDF 다운로드 시스템',
  url: 'https://invoice.example.com',
  copyright: '© 2026 견적서 시스템. All rights reserved.',
}

/**
 * 주요 기능 목록
 */
export const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: '간편한 견적서 확인',
    description:
      '링크만 클릭하면 웹에서 바로 견적서를 확인할 수 있습니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description:
      '견적서를 PDF 파일로 다운로드하여 보관하거나 인쇄할 수 있습니다.',
  },
  {
    icon: Shield,
    title: '안전한 데이터 관리',
    description:
      '노션 데이터베이스를 통해 견적서 데이터를 안전하게 관리합니다.',
  },
]
