'use client'

import React, { useState } from 'react'
import { LuMessageCircle, LuYoutube, LuVideo } from 'react-icons/lu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { CommentForm } from '@/components/comments/comment-form'

export function HeroNotice() {
  const [open, setOpen] = useState(false)

  return (
    <section className=" mt-48 mb-3 relative z-10 max-w-md mx-auto w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="bg-linear-to-br from-ws-primary to-ws-primary/80 border-none text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform duration-200 group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full shrink-0 group-hover:rotate-12 transition-transform">
                <LuMessageCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight mb-1">HPにて皆様の声を募集中！</h3>
                <p className="text-xs text-white/90 font-medium leading-relaxed">
                  いただいたコメントに柳がYoutube・Tiktokで回答中！
                  <br />
                  <span className="underline decoration-white/50 underline-offset-4 mt-1 inline-block">
                    ここをタップしてメッセージを送る
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-lg w-[95vw] rounded-lg">
          <DialogHeader>
            <DialogTitle>応援メッセージ・ご意見</DialogTitle>
            <DialogDescription>
              柳大地へのメッセージをお寄せください。
              <br />
              いただいたコメントには動画などで回答させていただくことがあります！
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <CommentForm onSubmitted={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
