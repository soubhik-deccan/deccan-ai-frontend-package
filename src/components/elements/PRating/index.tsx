import Rating from "@mui/material/Rating";
import { FC } from "react";
import { TPRatingProps } from "./type";

const returnLabel = (rating: number, type: string) => {
  switch (rating) {
    case 1:
      return `Low ${type}`;
    case 2:
      return `Moderate ${type}`;
    case 3:
      return `High ${type}`;
    default:
      return "";
  }
};

const PRating: FC<TPRatingProps> = ({
  value,
  onChange,
  size = "medium",
  error = false,
  maxValue = 5,
  disabled = false,
  type,
  useCircles = false,
}) => {
  const handleRatingChange = (event: any, newValue: number | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  if (useCircles) {
    return (
      <div className="p-rating-container">
        {[...Array(maxValue)].map((_, index) => {
          const rating = index + 1;
          return (
            <div
              key={rating}
              className={`p-rating-circle ${
                value === rating ? "selected" : ""
              } ${disabled ? "read-only" : ""}`}
              onClick={() => !disabled && onChange(rating)}
            >
              <div className="u-sm p-rating-content">
                <div
                  className={`p-rating-circle ${
                    value === rating ? "selected" : ""
                  }`}
                >
                  {rating}
                </div>
                {type && <div>{returnLabel(rating, type)}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Rating
      className={`p-rating ${error ? "error" : ""} ${
        disabled ? "read-only" : ""
      }`}
      value={value}
      onChange={handleRatingChange}
      size={size}
      max={maxValue}
      disabled={disabled}
    />
  );
};

export default PRating;
