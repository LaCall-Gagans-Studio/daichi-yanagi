'use client'

import React from 'react'
import { LuYoutube } from 'react-icons/lu'

interface YouTubePlaylistProps {
  className?: string
}

export function YouTubePlaylist({ className = '' }: YouTubePlaylistProps) {
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-center font-bold text-base py-1 bg-ws-primary text-white pt-1 rounded-t-lg flex items-center justify-center gap-2">
        <LuYoutube />
        SNSで情報発信中！
      </h3>
      <div className="relative w-full aspect-video rounded-b-lg overflow-hidden shadow-md bg-gray-100">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/videoseries?si=T5j_dpWLsWZkReTh&list=PLrqNIJBpFYrG1FHKO3x3-cyQqzdlwtIrj"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}
