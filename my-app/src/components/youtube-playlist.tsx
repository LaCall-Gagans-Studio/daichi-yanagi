import React from 'react'

interface YouTubePlaylistProps {
  className?: string
}

export function YouTubePlaylist({ className = '' }: YouTubePlaylistProps) {
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-center font-bold text-lg mb-2 bg-ws-primary text-white py-1 rounded-lg">
        SNSで情報発信中！
      </h3>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/videoseries?si=T5j_dpWLsWZkReTh&amp;list=PLrqNIJBpFYrG1FHKO3x3-cyQqzdlwtIrj"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}
