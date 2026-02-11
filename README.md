# 견적서 시스템 (Invoice Web)

노션 데이터베이스를 활용하여 견적서를 관리하고, 클라이언트가 웹에서 간편하게 확인 및 PDF로 다운로드할 수 있는 시스템입니다.

## 🎯 프로젝트 개요

**목적**: 노션 데이터베이스를 활용하여 견적서를 관리하고, 클라이언트가 웹에서 간편하게 확인 및 PDF로 다운로드할 수 있는 시스템

**사용자**: 견적서를 발행하는 프리랜서/소규모 사업자와 견적서를 받는 클라이언트

**범위**: MVP 단계 - 견적서 조회, 웹 뷰어, PDF 다운로드 기능

## 📱 주요 페이지

1. **홈 (랜딩 페이지)** (`/`) - 서비스 소개 및 이용 안내
2. **견적서 뷰어** (`/invoice/[id]`) - 견적서 내용 확인 및 PDF 다운로드
3. **에러 페이지** (`/404`, `/error`) - 에러 상황 안내

## ⚡ 핵심 기능

- **F001: 노션 데이터베이스 연동** - Notion API를 통해 견적서 데이터 조회
- **F002: 견적서 웹 뷰어** - 노션 데이터를 웹에서 구조화된 형태로 표시
- **F003: PDF 다운로드** - 견적서를 PDF 파일로 다운로드
- **F010: 견적서 ID 기반 접근** - URL 파라미터로 특정 견적서 조회
- **F011: 에러 처리** - 존재하지 않는 견적서 ID나 API 오류 시 안내
- **F012: 반응형 디자인** - 모바일/태블릿/데스크톱 최적화

## 🛠️ 기술 스택

### 프론트엔드
- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5.6+
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### 백엔드 & 데이터
- **Data Source**: Notion API (@notionhq/client)
- **PDF Generation**: react-pdf/renderer (예정)

### 배포
- **Platform**: Vercel (권장)

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# Notion API 설정
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 빌드

```bash
npm run build
```

### 5. 프로덕션 실행

```bash
npm start
```

## 📋 개발 상태

### 완료
- ✅ 기본 프로젝트 구조 설정
- ✅ 테마 시스템 (다크모드) 구현
- ✅ 홈페이지 (서비스 소개) 구현
- ✅ 견적서 뷰어 페이지 레이아웃 구현
- ✅ 에러 페이지 구현

### 진행 중
- 🔄 Notion API 연동 (Phase 1)
- 🔄 견적서 데이터 파싱 및 가공 (Phase 2)
- 🔄 PDF 생성 기능 (Phase 3)

### 계획됨
- ⏳ 노션 데이터베이스 캐싱 (ISR)
- ⏳ 로딩 상태 UI
- ⏳ Vercel 배포

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항 및 기능 명세
- [개발 로드맵](./docs/ROADMAP.md) - 단계별 개발 계획
- [개발 가이드](./CLAUDE.md) - AI 개발 지침

## 🗄️ 데이터 모델

### Notion 데이터베이스: Invoices

- `invoice_number`: 견적서 번호
- `client_name`: 클라이언트명
- `client_email`: 클라이언트 이메일
- `issue_date`: 발행일
- `expiry_date`: 유효기간
- `company_name`: 발행 회사명
- `subtotal`: 공급가액
- `vat`: 부가세
- `total`: 총 금액
- 기타 필드는 PRD 문서 참조

### Notion 데이터베이스: Invoice Items

- `name`: 품목명
- `quantity`: 수량
- `unit_price`: 단가
- `amount`: 금액
- `invoice`: 상위 견적서 연결

## 🔧 주요 디렉토리 구조

```
invoice-web/
├── app/                    # Next.js App Router 페이지
│   ├── invoice/[id]/      # 견적서 뷰어 페이지
│   ├── page.tsx           # 홈페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── not-found.tsx      # 404 페이지
│   └── error.tsx          # 에러 페이지
├── components/            # React 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── theme/            # 테마 관련 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/                  # 유틸리티 함수
│   ├── constants.ts      # 전역 상수
│   └── utils.ts          # 헬퍼 함수
├── docs/                 # 프로젝트 문서
│   ├── PRD.md           # 요구사항 정의서
│   └── ROADMAP.md       # 개발 로드맵
└── types/               # TypeScript 타입 정의
```

## 📝 라이센스

이 프로젝트는 개인 학습 및 포트폴리오 용도로 제작되었습니다.

---

**개발 문의**: 프로젝트 이슈 또는 PRD 문서를 참고해 주세요.
