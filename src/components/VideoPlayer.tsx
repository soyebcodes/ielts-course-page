// components/VideoPlayer.client.tsx
"use client";

import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="w-full aspect-video">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}
