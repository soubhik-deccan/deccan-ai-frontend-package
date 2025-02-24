import React, { useCallback } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import { PAudioRendererProps } from "./type";

const PAudioRenderer: React.FC<PAudioRendererProps> = ({
  src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  preload = "none",
  autoPlay = false,
  loop = false,
  muted = false,
  volume = 1.0,
  showSkipControls = false,
  showJumpControls = false,
  showDownloadProgress = true,
  showFilledProgress = true,
  showFilledVolume = false,
  autoPlayAfterSrcChange = false,
  defaultCurrentTime = "00:00",
  defaultDuration = "00:00",
  timeFormat = "auto",
  onPlay,
  onPause,
  onEnded,
  onError,
  onCanPlay,
  onPlaying,
  onWaiting,
  onClickNext,
  onClickPrevious,
  className = "",
}) => {
  const handlePlay = useCallback(
    (e: Event) => {
      onPlay?.();
    },
    [onPlay]
  );

  const handlePause = useCallback(
    (e: Event) => {
      onPause?.();
    },
    [onPause]
  );

  const handleEnded = useCallback(
    (e: Event) => {
      onEnded?.();
    },
    [onEnded]
  );

  const handleError = useCallback(
    (error: any) => {
      onError?.(error);
    },
    [onError]
  );

  return (
    <div className={`p-audio-renderer ${className}`}>
      {!src ? (
        <p className="p-audio-renderer__fallback">Audio URL not found</p>
      ) : (
        <AudioPlayer
          src={src}
          preload={preload}
          autoPlay={autoPlay}
          autoPlayAfterSrcChange={autoPlayAfterSrcChange}
          defaultCurrentTime={defaultCurrentTime}
          defaultDuration={defaultDuration}
          showDownloadProgress={showDownloadProgress}
          showFilledProgress={showFilledProgress}
          showFilledVolume={showFilledVolume}
          loop={loop}
          muted={muted}
          volume={volume}
          showJumpControls={showJumpControls}
          showSkipControls={showSkipControls}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
          onCanPlay={onCanPlay}
          onPlaying={onPlaying}
          onWaiting={onWaiting}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          timeFormat={timeFormat}
        />
      )}
    </div>
  );
};

export default PAudioRenderer;
