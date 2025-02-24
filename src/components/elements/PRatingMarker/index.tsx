// PRateMarker.tsx
import { FC } from "react";
import { TPRateMarkerProps } from "./type";

const PRateMarker: FC<TPRateMarkerProps> = ({
  initialValue,
  options = [],
  selectedRating,
  onRatingClick,
  disabled = false,
  className = "",
}) => {
  return (
    <div
      className={`p-rate-marker ${className} ${disabled ? "read-only" : ""}`}
    >
      {options.map(({ value, displayLabel }) => (
        <div
          key={value}
          className="p-rate-circle-wrapper"
          onClick={() => !disabled && onRatingClick(value)}
        >
          <div
            className={`p-rate-circle ${
              selectedRating === value || initialValue === value
                ? "selected"
                : ""
            }`}
          >
            {value}
          </div>
          <div className="p-rate-label">{displayLabel}</div>
        </div>
      ))}
    </div>
  );
};

export default PRateMarker;
