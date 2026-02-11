import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

/**
 * 404 에러 페이지
 * - 존재하지 않는 페이지 접근 시 표시
 */
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <FileQuestion className="w-20 h-20 text-zinc-400 dark:text-zinc-600 mb-6" />
      <h1 className="text-4xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
        요청하신 견적서를 찾을 수 없습니다. 견적서 링크를 다시 확인해 주세요.
      </p>
      <Button asChild size="lg">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
