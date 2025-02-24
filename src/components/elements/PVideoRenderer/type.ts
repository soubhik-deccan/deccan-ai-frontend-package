import { ReactPlayerProps } from "react-player";

export type TPVideoRendererProps = ReactPlayerProps & {
  url: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  controls?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  onReady?: () => void;
  onStart?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: Error | string) => void;
};
