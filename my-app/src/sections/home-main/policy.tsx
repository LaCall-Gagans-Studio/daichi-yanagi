// src/components/policy.tsx
'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// icons
import { LuBookOpen, LuBuilding2, LuGlobe, LuCrosshair } from 'react-icons/lu'

// libs
import type { PolicyTheme } from '@/lib/policy'

const iconMap = {
  education: LuBookOpen,
  governance: LuBuilding2,
  growth: LuGlobe,
} as const

export function Policy({ themes }: { themes: PolicyTheme[] }) {
  const defaultValue = themes[0]?.id ?? 'education'

  return (
    <section id="policy" className="w-full relative px-5 py-10 space-y-6 bg-ws-secondary/10">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl text-center text-black flex items-center gap-2">
          <LuCrosshair />
          POLICY
        </h2>
        <p className="text-sm font-bold text-center text-ws-primary">政策一覧</p>
      </div>

      {/* 3本の柱サマリー */}
      <div>
        <h2 className="text-lg text-center font-semibold text-ws-primary">政策3本の柱</h2>
        <div className="grid grid-cols-1 gap-4 mt-3">
          {themes.map((theme) => {
            const Icon = iconMap[theme.id]
            return (
              <div
                key={theme.id}
                className="flex items-center justify-start gap-2 p-2 rounded-lg border-2 border-ws-primary"
              >
                <Icon className="text-6xl" />
                <div>
                  <h2 className="text-lg font-semibold">{theme.title}</h2>
                  <p className="text-black text-sm">{theme.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* タブ本体 */}
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList
          className="
            grid grid-cols-3 w-full justify-start gap-2 rounded-xl
            bg-ws-primary/5 p-1 border border-ws-primary/10 h-auto
          "
        >
          {themes.map((theme) => {
            const Icon = iconMap[theme.id]
            return (
              <TabsTrigger
                key={theme.id}
                value={theme.id}
                className="
                  data-[state=active]:bg-white data-[state=active]:text-ws-primary
                  data-[state=active]:shadow-sm
                  text-sm px-3 py-2 rounded-lg border border-transparent
                  hover:bg-white/70 transition-colors
                "
                aria-label={theme.title}
              >
                <span className="inline-flex flex-col items-center gap-2 text-wrap">
                  <Icon className="shrink-0" />
                  {theme.title}
                </span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {themes.map((theme) => {
          const Icon = iconMap[theme.id]
          return (
            <TabsContent key={theme.id} value={theme.id} className="mt-4">
              <Card className="border-ws-primary/20 bg-ws-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-ws-primary text-lg">
                    <Icon className="text-ws-primary" />
                    {theme.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-black/70">
                    {theme.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  {theme.groups.map((group) => (
                    <div key={group.title} className="border-l-2 border-ws-primary/20 pl-3">
                      <h3 className="text-sm font-semibold text-ws-primary">{group.title}</h3>
                      <ul className="mt-1 text-sm text-black list-disc ml-5 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.title}>
                            <span className="font-medium">{item.title}</span> — {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Separator className="mt-4 bg-ws-primary/10" />
            </TabsContent>
          )
        })}
      </Tabs>
    </section>
  )
}
