import { FEATURES } from '@/lib/constants'
import { Card } from '@/components/ui/card'

/**
 * 홈페이지 - 견적서 시스템 소개
 */
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* 히어로 섹션 */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          견적서 시스템
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          노션 데이터베이스로 관리하는 견적서를 웹에서 간편하게 확인하고 PDF로 다운로드하세요
        </p>
      </section>

      {/* 기능 소개 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 사용 안내 */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">이용 방법</h2>
        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">견적서 링크 수신</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                이메일이나 메신저를 통해 받은 견적서 링크를 클릭하세요
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">견적서 내용 확인</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                웹 브라우저에서 견적서의 모든 항목과 금액을 확인하세요
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">PDF 다운로드 (선택)</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                필요한 경우 PDF 다운로드 버튼을 눌러 파일을 저장하세요
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
