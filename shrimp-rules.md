# 견적서 시스템 개발 가이드

> **AI Agent 전용 문서** - 이 문서는 AI Agent가 견적서 시스템 프로젝트에서 코드를 수정하거나 기능을 추가할 때 반드시 따라야 할 규칙을 정의합니다.

## 프로젝트 개요

**목적**: 노션 데이터베이스 기반 견적서 관리 및 PDF 다운로드 웹 시스템
**기술 스택**: Next.js 16 (App Router) + TypeScript 5.6+ + Tailwind CSS v4 + React 19

### 핵심 특징

- **중앙화된 상수 관리**: `lib/constants.ts`에서 모든 사이트 설정과 콘텐츠 관리
- **Context API 테마 시스템**: `components/theme/theme-provider.tsx` 기반
- **shadcn/ui 컴포넌트**: `components/ui/` 디렉토리의 재사용 가능한 컴포넌트
- **작업 기반 개발**: `tasks/` 디렉토리의 작업 파일로 개발 프로세스 관리

---

## 파일 및 디렉토리 규칙

### 디렉토리 구조

```
invoice-web/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── invoice/[id]/      # 견적서 뷰어 페이지
│   ├── error.tsx          # 런타임 에러 페이지
│   ├── not-found.tsx      # 404 에러 페이지
│   └── globals.css        # 전역 스타일
├── components/
│   ├── layout/            # Header, Footer, Navigation 등
│   ├── theme/             # ThemeProvider, ThemeToggle
│   └── ui/                # shadcn/ui 컴포넌트
├── lib/
│   ├── constants.ts       # 전역 상수 (NAV_ITEMS, SITE_CONFIG, FEATURES)
│   └── utils.ts           # 유틸리티 함수 (cn() 등)
├── types/
│   └── index.ts           # 타입 정의 (NavItem, Feature, SiteConfig 등)
├── docs/
│   ├── PRD.md             # 프로젝트 요구사항 문서
│   └── ROADMAP.md         # 개발 로드맵
├── tasks/                 # 작업 파일 (XXX-description.md)
└── CLAUDE.md              # 프로젝트 가이드
```

### 중요 파일 상호 의존성

| 파일 | 역할 | 수정 시 확인 필요 |
|------|------|-------------------|
| `lib/constants.ts` | 전역 상수 중앙 관리 | NAV_ITEMS 변경 시 `components/layout/navigation.tsx`, `components/layout/mobile-nav.tsx` 확인 |
| `types/index.ts` | 타입 정의 | 타입 추가/변경 시 `lib/constants.ts` 및 관련 컴포넌트 확인 |
| `app/layout.tsx` | 루트 레이아웃 | 메타데이터 변경 시 `lib/constants.ts`의 SITE_CONFIG 사용 확인 |
| `app/globals.css` | 전역 스타일 및 테마 토큰 | 컬러 변경 시 `:root`와 `.dark` 모두 수정 필수 |

---

## 코드 작성 규칙

### Import 경로 별칭

**✅ 반드시 `@/*` 경로 별칭 사용**

```typescript
// ✅ 올바른 예시
import { SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { NavItem } from '@/types'

// ❌ 잘못된 예시
import { SITE_CONFIG } from '../../lib/constants'
import { Button } from '../components/ui/button'
```

### 서버/클라이언트 컴포넌트 구분

**기본**: 서버 컴포넌트 (지시문 없음)
**클라이언트 필요 시**: `'use client'` 지시문 파일 최상단에 명시

```typescript
// ✅ 클라이언트 컴포넌트 (이벤트 핸들러, useState, useEffect 등 사용 시)
'use client'

import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  // ...
}

// ✅ 서버 컴포넌트 (기본)
import { SITE_CONFIG } from '@/lib/constants'

export function Header() {
  return <header>{SITE_CONFIG.name}</header>
}
```

### 타입 정의

**중앙화된 타입 관리**: `types/index.ts`에 모든 공용 타입 정의

```typescript
// ✅ types/index.ts에 타입 추가
export type Invoice = {
  id: string
  invoiceNumber: string
  clientName: string
  // ...
}

// ✅ 사용 시
import { Invoice } from '@/types'
```

**금지 사항**:
- ❌ 컴포넌트 파일 내부에 공용 타입 정의 금지
- ❌ 여러 파일에서 동일한 타입 중복 정의 금지

---

## 중앙화된 상수 관리 규칙

### 새 페이지/기능 추가 시 필수 단계

**⚠️ 중요**: 새로운 페이지나 기능을 추가할 때는 **반드시 `lib/constants.ts`를 먼저 수정**

#### 1. 네비게이션 메뉴 추가

```typescript
// lib/constants.ts
export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: '홈' },
  { href: '/invoice/sample', label: '샘플 견적서' }, // ✅ 새 메뉴 추가
]
```

#### 2. 기능 카드 추가 (홈페이지)

```typescript
// lib/constants.ts
import { FileText, Download, Shield, Zap } from 'lucide-react'

export const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: '간편한 견적서 확인',
    description: '링크만 클릭하면 웹에서 바로 견적서를 확인할 수 있습니다.',
  },
  {
    icon: Zap, // ✅ 새 기능 추가
    title: '빠른 처리',
    description: '실시간으로 견적서 상태를 업데이트합니다.',
  },
]
```

#### 3. 사이트 정보 수정

```typescript
// lib/constants.ts
export const SITE_CONFIG: SiteConfig = {
  name: '견적서 시스템',
  description: '노션 데이터베이스를 활용한 견적서 관리 및 PDF 다운로드 시스템',
  url: 'https://invoice.example.com', // 배포 시 실제 URL로 변경
  copyright: '© 2026 견적서 시스템. All rights reserved.',
}
```

### 상수 파일 수정 시 주의사항

- **타입 일치 확인**: `types/index.ts`의 타입 정의와 일치해야 함
- **아이콘 import**: `lucide-react`에서 사용 가능한 아이콘만 사용
- **한국어 사용**: label, title, description은 모두 한국어로 작성

---

## 스타일링 규칙

### Tailwind CSS v4 사용법

**✅ 유틸리티 클래스 조합 + `cn()` 함수**

```typescript
import { cn } from '@/lib/utils'

// ✅ 조건부 스타일 적용
<div className={cn(
  'flex min-h-screen flex-col',
  isError && 'bg-red-50'
)} />

// ✅ 다크모드 대응
<div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50" />
```

**❌ 금지 사항**:
- ❌ 인라인 스타일 (`style={{ ... }}`) 사용 금지 (특수한 경우 제외)
- ❌ CSS 모듈 (`.module.css`) 생성 금지
- ❌ 전역 CSS 직접 수정 금지 (`app/globals.css`는 테마 변수만 수정 가능)

### 테마 시스템

**다크모드 클래스 자동 적용**: ThemeProvider가 `html` 태그에 `light` 또는 `dark` 클래스 추가

```typescript
// ✅ 다크모드 대응 컴포넌트
<Card className="bg-white dark:bg-zinc-800">
  <p className="text-zinc-900 dark:text-zinc-100">내용</p>
</Card>
```

### 컬러 토큰 사용

**CSS 변수 기반 컬러 시스템**:

```typescript
// ✅ Tailwind 컬러 토큰 사용
<Button className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />

// ❌ 하드코딩된 색상 금지
<Button className="bg-blue-500 text-white" /> // 금지
```

**사용 가능한 주요 컬러 토큰**:
- `background`, `foreground`
- `card`, `card-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `destructive`
- `border`, `input`, `ring`

### 컬러 변경이 필요한 경우

**`app/globals.css` 수정 시 `:root`와 `.dark` 모두 수정 필수**

```css
/* app/globals.css */
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
}
```

**⚠️ 주의**: oklch 색상 모델 유지, 다른 색상 모델 사용 금지

---

## shadcn/ui 컴포넌트 사용 규칙

### 컴포넌트 Import

**✅ `components/ui/` 디렉토리에서만 import**

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
```

### 새 컴포넌트 추가

**shadcn CLI 사용**:

```bash
# ✅ 올바른 방법
npx shadcn add <component-name>

# 예시
npx shadcn add table
npx shadcn add dialog
```

**❌ 금지 사항**:
- ❌ 직접 `components/ui/` 디렉토리에 컴포넌트 파일 생성 금지
- ❌ shadcn/ui 컴포넌트 내부 코드 직접 수정 최소화 (불가피한 경우만 수정)

### 컴포넌트 커스터마이징

**Tailwind 클래스로 스타일 확장**:

```typescript
// ✅ className prop으로 스타일 확장
<Button className="w-full mt-4" variant="default">
  다운로드
</Button>

<Card className="border-2 border-primary">
  <CardContent>내용</CardContent>
</Card>
```

---

## 작업 프로세스 규칙

### 작업 시작 전 필수 확인

1. **ROADMAP.md 확인**: 현재 우선순위 작업 파악
2. **tasks/ 디렉토리 확인**: 관련 작업 파일 존재 여부 확인
3. **PRD.md 참조**: 기능 요구사항 및 정합성 확인

### 작업 파일 구조

**작업 파일 명명**: `XXX-description.md` (예: `002-타입-정의.md`)

```markdown
# Task 002: 타입 정의 및 데이터 모델 설계

## 개요
견적서 및 견적 항목 TypeScript 인터페이스 정의

## 명세서
- 견적서(Invoice) 타입 정의
- 견적 항목(InvoiceItem) 타입 정의
- Notion API 응답 타입 정의
- 관련 PRD: F001, F002

## 관련 파일
- `types/index.ts` - 타입 정의
- `lib/constants.ts` - 상수 참조

## 수락 기준
- [ ] 모든 타입이 정의되었다
- [ ] TypeScript 컴파일 에러가 없다
- [ ] JSDoc 주석이 추가되었다

## 구현 단계

### 단계 1: 기본 타입 정의
- [ ] Invoice 타입 정의
- [ ] InvoiceItem 타입 정의

### 단계 2: API 타입 정의
- [ ] NotionInvoicePage 타입 정의
- [ ] NotionInvoiceItemPage 타입 정의

## 테스트 체크리스트
> API 연동 작업이 아니므로 생략 가능

## 변경 사항 요약
> 작업 완료 후 작성
```

### 작업 진행 규칙

**단계별 진행**:
1. 작업 파일의 "구현 단계" 섹션을 순서대로 진행
2. 각 단계 완료 시 체크박스 업데이트: `- [ ]` → `- [x]`
3. "수락 기준" 모두 충족 확인
4. "변경 사항 요약" 작성

**API/비즈니스 로직 작업 시**:
- "테스트 체크리스트" 섹션 필수 작성
- Playwright MCP를 사용한 E2E 테스트 수행 권장

### 작업 완료 후

1. **ROADMAP.md 업데이트**: 완료된 작업을 "완료"로 표시
2. **커밋 생성**: 이모지 + 컨벤셔널 커밋 메시지 사용 (예: `✨ feat: 타입 정의 및 데이터 모델 설계 완료`)

---

## AI 의사결정 가이드

### 모호한 요구사항 처리

**우선순위**:
1. **PRD.md 참조**: 기능 명세 및 요구사항 확인
2. **ROADMAP.md 확인**: 현재 개발 단계 및 우선순위 파악
3. **tasks/ 작업 파일 참조**: 구체적인 구현 방법 확인
4. **CLAUDE.md 참조**: 프로젝트 아키텍처 및 패턴 확인

**예시**:
- 사용자 요청: "견적서 페이지 개선해줘"
- AI 행동:
  1. PRD.md에서 F002 (견적서 웹 뷰어) 요구사항 확인
  2. ROADMAP.md에서 현재 Phase 확인
  3. 구체적인 개선 방향 질문 또는 제안

### 기술 선택 가이드

| 상황 | 우선 선택 | 사유 |
|------|-----------|------|
| 새 UI 컴포넌트 필요 | shadcn/ui 컴포넌트 사용 | 프로젝트 표준 |
| 아이콘 필요 | lucide-react | 프로젝트에서 이미 사용 중 |
| 상태 관리 | React useState/useContext | 단순한 MVP, 별도 라이브러리 불필요 |
| 스타일링 | Tailwind 유틸리티 클래스 | 프로젝트 표준 |
| 폼 검증 | 기본 HTML5 검증 → react-hook-form (복잡한 경우) | 단순함 우선 |
| API 호출 | 서버 컴포넌트에서 직접 호출 | Next.js App Router 권장 방식 |

### 파일 생성 vs 수정 판단

**파일 생성 최소화 원칙**:
- ✅ **수정 우선**: 기존 파일에 코드 추가 가능하면 파일 생성 금지
- ❌ **불필요한 유틸리티 파일 생성 금지**: 한두 함수만 필요하면 관련 파일에 직접 작성

**파일 생성 허용 조건**:
1. 새로운 페이지 추가 (app/ 디렉토리)
2. 새로운 shadcn/ui 컴포넌트 추가 (CLI 사용)
3. 명확히 분리된 새로운 모듈 (예: Notion API 클라이언트)

---

## 금지 사항

### 절대 금지 행동

**❌ 다음 행동은 절대 금지**:

1. **일반적인 개발 지식 포함 금지**
   - "React는 컴포넌트 기반 라이브러리입니다" 같은 설명 금지
   - "Next.js는 SSR을 지원합니다" 같은 일반 지식 금지

2. **불필요한 파일 생성 금지**
   - README.md, CONTRIBUTING.md 등 문서 파일 자동 생성 금지
   - 요청받지 않은 설정 파일 생성 금지

3. **프로젝트 구조 임의 변경 금지**
   - 디렉토리 구조 재구성 금지
   - 파일 위치 이동 금지 (명시적 요청 시만 허용)

4. **프로젝트 표준 위반 금지**
   - `lib/constants.ts` 사용하지 않고 하드코딩 금지
   - 경로 별칭 없이 상대 경로 import 금지
   - Tailwind 사용하지 않고 인라인 스타일 사용 금지

5. **환경변수 하드코딩 금지**
   - API 키, 비밀 정보를 코드에 직접 작성 금지
   - 모든 환경변수는 `.env.local` 파일에서 관리

### 코드 품질 기준

**❌ 금지되는 코드 패턴**:

```typescript
// ❌ 하드코딩된 메뉴 항목
<nav>
  <a href="/">홈</a>
  <a href="/about">소개</a>
</nav>

// ✅ 올바른 방법: constants 사용
import { NAV_ITEMS } from '@/lib/constants'
<nav>
  {NAV_ITEMS.map(item => (
    <a key={item.href} href={item.href}>{item.label}</a>
  ))}
</nav>

// ❌ 상대 경로 import
import { Button } from '../../components/ui/button'

// ✅ 올바른 방법: 경로 별칭 사용
import { Button } from '@/components/ui/button'

// ❌ 타입 중복 정의
// file1.tsx
type User = { name: string }
// file2.tsx
type User = { name: string }

// ✅ 올바른 방법: 중앙 타입 정의
// types/index.ts
export type User = { name: string }
```

---

## 다중 파일 조정 규칙

### 변경이 여러 파일에 영향을 미치는 경우

**반드시 다음 파일들을 함께 확인하고 수정**:

| 주요 변경 파일 | 함께 확인 필요 파일 | 이유 |
|----------------|---------------------|------|
| `lib/constants.ts` (NAV_ITEMS 변경) | `components/layout/navigation.tsx`<br>`components/layout/mobile-nav.tsx` | 네비게이션 메뉴 동기화 |
| `types/index.ts` (타입 추가/변경) | `lib/constants.ts`<br>해당 타입 사용 컴포넌트 | 타입 일관성 유지 |
| `app/layout.tsx` (메타데이터 변경) | `lib/constants.ts` (SITE_CONFIG) | 메타데이터 중앙 관리 |
| `app/globals.css` (컬러 토큰 변경) | `:root`와 `.dark` 모두 | 다크모드 일관성 |

### 예시: 새 페이지 추가 시 체크리스트

**시나리오**: `/pricing` 페이지 추가

```markdown
- [x] 1. `lib/constants.ts`의 NAV_ITEMS에 메뉴 항목 추가
- [x] 2. `app/pricing/page.tsx` 파일 생성
- [x] 3. `lib/constants.ts`의 SITE_CONFIG 확인 (필요 시 메타데이터 업데이트)
- [x] 4. `components/layout/navigation.tsx` 동작 확인 (자동 반영 확인)
- [x] 5. `components/layout/mobile-nav.tsx` 동작 확인 (자동 반영 확인)
- [x] 6. ROADMAP.md에 작업 추가 또는 완료 표시
```

---

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# shadcn 컴포넌트 추가
npx shadcn add <component-name>
```

---

## 문서 업데이트 규칙

**이 문서(shrimp-rules.md) 수정 금지**:
- AI Agent가 임의로 이 문서를 수정하지 마세요
- 규칙 변경이 필요하면 사용자에게 제안하세요

**업데이트 가능한 문서**:
- `ROADMAP.md`: 작업 완료 시 진행 상황 업데이트
- `tasks/XXX-*.md`: 작업 진행 시 체크리스트 및 변경 사항 업데이트
- 코드 파일의 JSDoc 주석: 함수/컴포넌트 설명 추가

---

**문서 버전**: 1.0
**최종 수정일**: 2026-02-11
**작성 목적**: AI Agent의 일관된 코드 작성 및 프로젝트 규칙 준수
