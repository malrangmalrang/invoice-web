import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

/**
 * 견적서 뷰어 페이지
 * - URL 파라미터로 견적서 ID를 받아 조회
 * - 노션 데이터베이스에서 견적서 데이터를 가져옴
 * - PDF 다운로드 기능 제공
 */
interface InvoicePageProps {
  params: Promise<{ id: string }>
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params

  // TODO: Notion API 연동하여 견적서 데이터 조회
  // 현재는 임시 데이터 표시
  if (!id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        {/* 헤더 - 회사 정보 및 견적서 번호 */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b">
          <div>
            <h1 className="text-2xl font-bold mb-2">견적서</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              견적서 번호: {id}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">회사명</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">사업자등록번호</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">주소</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">전화번호</p>
          </div>
        </div>

        {/* 날짜 정보 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">발행일</p>
            <p className="font-semibold">2026-02-11</p>
          </div>
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">유효기간</p>
            <p className="font-semibold">2026-03-11</p>
          </div>
        </div>

        {/* 클라이언트 정보 */}
        <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">받는 분</p>
          <p className="font-semibold">클라이언트명</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">이메일</p>
        </div>

        {/* 견적 항목 테이블 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">견적 항목</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">항목</th>
                  <th className="text-center py-2">수량</th>
                  <th className="text-right py-2">단가</th>
                  <th className="text-right py-2">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">샘플 항목 1</td>
                  <td className="text-center">1</td>
                  <td className="text-right">1,000,000원</td>
                  <td className="text-right font-semibold">1,000,000원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">샘플 항목 2</td>
                  <td className="text-center">2</td>
                  <td className="text-right">500,000원</td>
                  <td className="text-right font-semibold">1,000,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 금액 요약 */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-zinc-600 dark:text-zinc-400">공급가액</p>
            <p className="font-semibold">2,000,000원</p>
          </div>
          <div className="flex justify-between">
            <p className="text-zinc-600 dark:text-zinc-400">부가세 (10%)</p>
            <p className="font-semibold">200,000원</p>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <p>총 금액</p>
            <p>2,200,000원</p>
          </div>
        </div>

        {/* 비고 */}
        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">비고</p>
          <p className="text-sm">추가 안내 사항이 여기에 표시됩니다.</p>
        </div>

        {/* PDF 다운로드 버튼 */}
        <div className="mt-8 text-center">
          <Button size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            PDF 다운로드
          </Button>
        </div>
      </Card>
    </div>
  )
}
