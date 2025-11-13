// src/app/ongoing/page.tsx
import Link from 'next/link'
import { LuClock3, LuArrowLeft } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function OngoingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ws-secondary/10 px-5">
      <Card className="w-full max-w-sm shadow-none border-ws-primary/15 bg-white/90">
        <CardContent className="py-8 px-6 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-ws-primary/10 flex items-center justify-center mb-2">
            <LuClock3 className="text-3xl text-ws-primary" />
          </div>

          <h1 className="text-lg font-semibold text-black">このページは準備中です</h1>

          <p className="text-sm text-black/70 leading-relaxed">しばらくお待ちください。</p>

          <Button
            asChild
            className="mt-4 w-full bg-ws-primary text-white hover:bg-ws-primary/90 text-sm py-5"
          >
            <Link href="/">
              <LuArrowLeft className="mr-2" />
              ホームに戻る
            </Link>
          </Button>

          <p className="text-[11px] text-black/50 mt-2">
            ブラウザの「戻る」ボタンでも前のページへ戻ることができます。
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
