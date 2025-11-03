// components
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

// icons
import {
  LuMegaphone,
  LuNewspaper,
  LuCalendarDays,
  LuUsers,
  LuArrowRight,
  LuHandHeart,
  LuSend,
  LuBookOpen,
  LuMapPin,
  LuPlay,
  LuTwitter,
  LuYoutube,
  LuInstagram,
} from 'react-icons/lu'

export default function HomeGrids() {
  return (
    <div className="w-full h-full bg-ws-secondary text-5xl flex">
      <div className="items-center justify-center p-6">
        Grid <br />
        Comment <br />
        System <br />
        Coming Soon
      </div>
    </div>
  )
}
