# 견적서 시스템 개발 로드맵

노션 데이터베이스를 활용한 견적서 관리 및 PDF 다운로드 웹 시스템

## 개요

**견적서 시스템(Invoice Web)**은 프리랜서/소규모 사업자를 위한 견적서 관리 시스템으로 다음 기능을 제공합니다:

- **노션 데이터베이스 연동**: 노션에서 작성한 견적서 데이터를 웹에서 조회 (F001)
- **견적서 웹 뷰어**: 구조화된 견적서를 웹에서 간편하게 확인 (F002, F010, F011, F012)
- **PDF 다운로드**: 견적서를 PDF 파일로 다운로드하여 보관 및 인쇄 (F003)

### 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router), React 19, TypeScript 5.6+ |
| 스타일링 | Tailwind CSS v4, shadcn/ui, Lucide React |
| 데이터 | Notion API (@notionhq/client) |
| PDF 생성 | react-pdf/renderer (또는 jsPDF + html2canvas) |
| 배포 | Vercel |
| 패키지 관리 | npm |

### 예상 총 개발 기간

**7-11일 (1인 개발자 기준)**

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-project-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조
   - 초기 상태의 샘플로 `000-sample.md` 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 (1-2일) -- 부분 완료

프로젝트 구조, 라우팅, 타입 시스템 등 애플리케이션의 전체 골격을 구축하는 단계.

- **Task 001: 프로젝트 초기 설정 및 라우팅 구조 생성** -- 완료
  - See: `/tasks/001-project-setup.md`
  - [x] Next.js 16 App Router 프로젝트 생성 및 TypeScript 설정
  - [x] 전체 라우트 구조 생성 (`/`, `/invoice/[id]`, 에러 페이지)
  - [x] 공통 레이아웃 컴포넌트 구현 (Header, Footer, Navigation, MobileNav)
  - [x] 테마 시스템 구축 (ThemeProvider, ThemeToggle - light/dark/system)
  - [x] 전역 상수 중앙화 (`lib/constants.ts` - NAV_ITEMS, SITE_CONFIG, FEATURES)

- **Task 002: 타입 정의 및 데이터 모델 설계** -- 우선순위
  - 견적서(Invoice) 및 견적 항목(InvoiceItem) TypeScript 인터페이스 정의
  - Notion API 응답 타입 정의 (NotionInvoicePage, NotionInvoiceItemPage)
  - 데이터 변환 유틸리티 타입 (NotionPropertyParser 등)
  - 환경변수 타입 정의 및 검증 유틸리티
  - 금액 포맷팅, 날짜 포맷팅 유틸리티 함수 시그니처 정의

### Phase 2: UI/UX 완성 - 더미 데이터 활용 (1-2일) -- 완료

모든 페이지의 UI를 더미 데이터 기반으로 완성하여 전체 사용자 플로우를 확인하는 단계.

- **Task 003: 공통 UI 컴포넌트 라이브러리 구축** -- 완료
  - See: `/tasks/003-ui-components.md`
  - [x] shadcn/ui 기반 공통 컴포넌트 설치 및 설정 (Button, Card, Badge, Sheet, DropdownMenu 등)
  - [x] 디자인 시스템 확립 (Geist 폰트, Tailwind CSS v4, 다크모드 연동)
  - [x] `cn()` 유틸리티 함수를 통한 조건부 스타일 관리

- **Task 004: 전체 페이지 UI 구현 (더미 데이터)** -- 완료
  - See: `/tasks/004-page-ui.md`
  - [x] 홈페이지 - 서비스 소개, 주요 기능 카드, 이용 방법 단계 안내
  - [x] 견적서 뷰어 페이지 - 회사 정보, 클라이언트 정보, 견적 항목 테이블, 금액 요약, PDF 다운로드 버튼 (하드코딩 더미 데이터)
  - [x] 404 에러 페이지 - 견적서 미발견 안내 및 홈 링크
  - [x] 500 에러 페이지 - 런타임 에러 안내, 다시 시도/홈으로 버튼
  - [x] 반응형 레이아웃 (모바일/데스크톱) 및 다크모드 대응

### Phase 3: Notion API 연동 및 데이터 통합 (2-3일)

노션 데이터베이스와 연동하여 실제 견적서 데이터를 조회하고 뷰어에 표시하는 핵심 기능 구현 단계.

- **Task 005: Notion API 기반 구축** -- 우선순위
  - `@notionhq/client` 패키지 설치 및 설정
  - 환경변수 설정 (`.env.local` - `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NOTION_ITEMS_DATABASE_ID`)
  - Notion 클라이언트 인스턴스 생성 (`lib/notion.ts`)
  - 환경변수 검증 로직 구현
  - 노션 데이터베이스 스키마 설계 및 샘플 데이터 입력 확인

- **Task 006: 견적서 데이터 조회 및 파싱 로직 구현**
  - Notion 데이터베이스 쿼리 함수 구현 (`getInvoiceById`, `getInvoiceItems`)
  - Notion 프로퍼티 파싱 및 TypeScript 타입 변환 로직 (`lib/notion-parser.ts`)
  - 견적 항목 조회 (Relation 필드 기반 관계형 데이터 조회)
  - 금액 계산 유틸리티 (공급가액, 부가세, 총 금액)
  - 날짜 포맷팅 유틸리티 (YYYY-MM-DD 형식)
  - Notion API Rate Limit 대응 에러 처리
  - Playwright MCP를 활용한 API 응답 검증 테스트

- **Task 007: 견적서 뷰어 실제 데이터 연동**
  - 서버 컴포넌트에서 Notion API 호출로 데이터 조회
  - 견적서 뷰어 페이지의 더미 데이터를 실제 API 데이터로 교체
  - 존재하지 않는 견적서 ID 접근 시 `notFound()` 호출 (404 처리)
  - Notion API 오류 시 에러 바운더리 동작 확인 (500 처리)
  - 금액 포맷팅 적용 (천 단위 콤마, 원 단위 표시)
  - 날짜 포맷팅 적용 (한국어 날짜 표시)
  - Playwright MCP를 활용한 E2E 테스트 (견적서 조회 플로우 전체 검증)

### Phase 4: PDF 생성 기능 (2-3일)

견적서를 PDF 파일로 생성하여 다운로드할 수 있는 기능을 구현하는 단계.

- **Task 008: PDF 생성 라이브러리 설정 및 템플릿 개발**
  - PDF 생성 라이브러리 선택 및 설치 (`react-pdf/renderer` 또는 `jsPDF + html2canvas`)
  - 한글 폰트 지원 설정 (Noto Sans KR 또는 Pretendard 웹폰트 내장)
  - A4 크기 기준 PDF 레이아웃 템플릿 개발 (`components/pdf/invoice-pdf.tsx`)
  - PDF 템플릿 구성 요소:
    - 회사 정보 헤더 (회사명, 사업자등록번호, 주소, 연락처)
    - 견적서 번호 및 날짜 정보 (발행일, 유효기간)
    - 클라이언트 정보 섹션
    - 견적 항목 테이블 (품목명, 규격, 수량, 단가, 금액)
    - 금액 요약 (공급가액, 부가세, 총 금액)
    - 비고 섹션
  - 인쇄 최적화 (여백, 페이지 구분, 글꼴 크기)

- **Task 009: PDF 다운로드 기능 연동**
  - PDF 다운로드 버튼 클릭 이벤트 핸들러 구현 (클라이언트 컴포넌트)
  - 클라이언트 사이드 PDF 생성 로직 연결
  - 파일명 자동 설정 (`견적서_INV-2026-001_클라이언트명.pdf` 형식)
  - 다운로드 진행 중 로딩 상태 UI 표시
  - PDF 생성 실패 시 에러 처리 및 사용자 안내
  - Playwright MCP를 활용한 PDF 다운로드 E2E 테스트

### Phase 5: 최적화 및 테스트 (1-2일)

성능 최적화, 캐싱 전략 적용, 다양한 시나리오 테스트를 수행하는 단계.

- **Task 010: 성능 최적화 및 캐싱 전략**
  - Next.js ISR 캐싱 설정 (`revalidate: 60` - 60초 캐시)
  - 로딩 상태 UI 추가 (`loading.tsx`, Suspense 바운더리)
  - 견적서 뷰어 페이지 스켈레톤 UI 구현
  - 이미지/폰트 최적화 (next/font, 폰트 서브셋)
  - 메타데이터 최적화 (동적 OG 태그, 페이지별 title/description)
  - Lighthouse 성능 점수 확인 및 개선 (목표: 90점 이상)

- **Task 011: 통합 테스트 및 품질 검증**
  - 다양한 견적서 케이스 테스트:
    - 항목 1개인 견적서
    - 항목 10개 이상인 견적서
    - 큰 금액 (억 단위) 견적서
    - 특수문자 포함 텍스트
    - 비고 없는 견적서
  - 모바일 실기기 테스트 (iOS Safari, Android Chrome)
  - PDF 인쇄 품질 검증 (A4 출력, 글자 선명도, 레이아웃 정합)
  - Playwright MCP를 활용한 전체 사용자 플로우 E2E 테스트:
    - 홈페이지 접속 및 네비게이션
    - 견적서 링크 접근 및 데이터 표시 확인
    - PDF 다운로드 버튼 동작 확인
    - 잘못된 ID 접근 시 404 페이지 표시
    - API 오류 시 에러 페이지 표시
  - 에러 핸들링 및 엣지 케이스 검증
  - 크로스 브라우저 호환성 확인 (Chrome, Firefox, Safari)

### Phase 6: 배포 (1일)

프로덕션 환경에 배포하고 최종 검증을 수행하는 단계.

- **Task 012: Vercel 배포 및 프로덕션 설정**
  - Vercel 프로젝트 생성 및 GitHub 저장소 연결
  - Vercel Dashboard에서 환경변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NOTION_ITEMS_DATABASE_ID`)
  - 도메인 연결 설정 (선택)
  - HTTPS 적용 확인
  - 프로덕션 빌드 및 배포
  - 프로덕션 환경에서 전체 기능 검증:
    - 견적서 조회 정상 동작
    - PDF 다운로드 정상 동작
    - 에러 페이지 정상 동작
    - 모바일/데스크톱 반응형 확인
  - Notion API Rate Limit 모니터링 확인

---

## 의존성 관계도

```
Task 001 (프로젝트 설정) -----> Task 003 (UI 컴포넌트) -----> Task 004 (페이지 UI)
                          |                                        |
                          v                                        v
Task 002 (타입 정의) ---------> Task 005 (Notion API 기반) --> Task 006 (데이터 조회) --> Task 007 (데이터 연동)
                                                                                              |
                                                                                              v
                                                              Task 008 (PDF 템플릿) --> Task 009 (PDF 연동)
                                                                                              |
                                                                                              v
                                                              Task 010 (최적화) ------> Task 011 (테스트)
                                                                                              |
                                                                                              v
                                                                                    Task 012 (배포)
```

## 진행 현황 요약

| Phase | 상태 | 진행률 | Task 수 |
|-------|------|--------|---------|
| Phase 1: 애플리케이션 골격 구축 | 부분 완료 | 1/2 완료 | 2 |
| Phase 2: UI/UX 완성 | 완료 | 2/2 완료 | 2 |
| Phase 3: Notion API 연동 | 예정 | 0/3 완료 | 3 |
| Phase 4: PDF 생성 기능 | 예정 | 0/2 완료 | 2 |
| Phase 5: 최적화 및 테스트 | 예정 | 0/2 완료 | 2 |
| Phase 6: 배포 | 예정 | 0/1 완료 | 1 |
| **전체** | **진행 중** | **3/12 완료** | **12** |

---

## 참고 사항

### PRD 기능 매핑

| 기능 ID | 기능명 | 구현 Task |
|---------|--------|-----------|
| F001 | 노션 데이터베이스 연동 | Task 005, Task 006 |
| F002 | 견적서 웹 뷰어 | Task 004, Task 007 |
| F003 | PDF 다운로드 | Task 008, Task 009 |
| F010 | 견적서 ID 기반 접근 | Task 007 |
| F011 | 에러 처리 | Task 004, Task 007 |
| F012 | 반응형 디자인 | Task 004, Task 007 |

### 주요 기술적 고려사항

- **Notion API Rate Limit**: 초당 3회 요청 제한 -- ISR 캐싱으로 대응 (Task 010)
- **API 응답 시간**: 1-3초 소요 -- 로딩 상태 UI 필수 (Task 010)
- **PDF 한글 지원**: 한글 폰트 내장 필요 (Task 008)
- **보안**: API 키는 서버사이드 전용, 환경변수로 관리 (Task 005)
- **공개 링크 방식**: 인증 없이 노션 페이지 ID 기반 접근 (MVP 범위)

### MVP 성공 기준

1. 노션 데이터베이스에서 견적서 조회 성공률 100%
2. 견적서 페이지 로딩 시간 3초 이내
3. PDF 생성 시간 5초 이내
4. 모바일/데스크톱 반응형 정상 동작
5. Vercel 배포 성공 및 HTTPS 적용

---

**문서 버전**: 1.0
**최종 수정일**: 2026-02-11
**기반 문서**: `/docs/PRD.md` (v2.0)
