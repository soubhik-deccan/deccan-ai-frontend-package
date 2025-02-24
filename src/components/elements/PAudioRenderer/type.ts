import { AudioHTMLAttributes } from "react";

export type PAudioRendererProps = AudioHTMLAttributes<HTMLAudioElement> & {
  src: string;
  preload?: "auto" | "metadata" | "none";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  showSkipControls?: boolean;
  showJumpControls?: boolean;
  showDownloadProgress?: boolean;
  showFilledProgress?: boolean;
  showFilledVolume?: boolean;
  autoPlayAfterSrcChange?: boolean;
  defaultCurrentTime?: React.ReactNode;
  defaultDuration?: React.ReactNode;
  timeFormat?: "auto" | "mm:ss" | "hh:mm:ss";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  onCanPlay?: () => void;
  onPlaying?: () => void;
  onWaiting?: () => void;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
};
