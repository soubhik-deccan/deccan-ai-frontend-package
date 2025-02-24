import React from "react";
import ReactPlayer from "react-player/lazy";
import { TPVideoRendererProps } from "./type";

const PVideoRenderer: React.FC<TPVideoRendererProps> = ({
  url = "http://media.w3.org/2010/05/video/movie_300.webm",
  width = "100%",
  height = "100%",
  className = "",
  controls = true,
  playing = false,
  loop = false,
  muted = false,
  volume = 0.8,
  onReady,
  onStart,
  onPlay,
  onPause,
  onEnded,
  onError,
  ...rest
}) => {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  return (
    <div className={`p-video-renderer ${className}`} style={{ width, height }}>
      {!url ? (
        <p className="p-video-renderer__fallback">Video URL not found</p>
      ) : (
        <ReactPlayer
          className="react-player"
          height={isYouTube ? "440px" : "100%"}
          width={isYouTube ? "800px" : "100%"}
          url={url}
          controls={controls}
          playing={playing}
          loop={loop}
          muted={muted}
          volume={volume}
          onReady={onReady}
          onStart={onStart}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={onError}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload nofullscreen",
              },
            },
            youtube: {
              playerVars: {
                fs: 0, // Disable fullscreen
              },
            },
            vimeo: {
              playerOptions: {
                fullscreen: false, // Disable fullscreen
              },
            },
            dailymotion: {
              params: {
                fullscreen: false, // Disable fullscreen
              },
            },
          }}
          {...rest}
        />
      )}
    </div>
  );
};

export default PVideoRenderer;
