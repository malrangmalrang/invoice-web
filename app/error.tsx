'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

/**
 * 에러 페이지
 * - 런타임 에러 발생 시 표시
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러 로깅 (필요한 경우)
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
        견적서를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} size="lg">
          다시 시도
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.location.href = '/'}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
