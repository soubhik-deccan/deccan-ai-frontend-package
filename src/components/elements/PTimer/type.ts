export type TPTimerProps = {
  initialSeconds?: number;
  onDurationChange?: (durationInSeconds: number) => void;
  updateInterval?: number;
  mode?: "COUNT_UP" | "COUNT_DOWN";
  onComplete?: () => void;
  isRunning?: boolean;
  customClassName?: string;
};
