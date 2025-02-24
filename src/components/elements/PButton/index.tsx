import { CircularProgress } from "@mui/joy";
import { FC, MouseEvent } from "react";
import { TPButtonProps } from "./type";

const PButton: FC<TPButtonProps> = ({
  id,
  children,
  onClick,
  className,
  variant,
  icon,
  disabled,
  btnType = "button",
  isLoading,
  iconPosition = "left",
  isOnlyIcon,
  size = "lg",
  gradient,
}) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (onClick && variant !== "disable") onClick(e);
  };

  const buttonClasses = [
    "p-button",
    `p-button--${variant}`,
    `p-button--${size}`,
    disabled || isLoading ? "p-button--disabled" : "",
    gradient ? `p-button--gradient-${gradient}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      id={id ?? ""}
      type={btnType}
      className={buttonClasses}
      onClick={handleOnClick}
      disabled={isLoading || disabled}
      style={{
        flexDirection: iconPosition === "right" ? "row-reverse" : "row",
      }}
    >
      {isLoading ? (
        <>
          <CircularProgress
            size="sm"
            variant="soft"
            sx={{
              "--CircularProgress-progressColor": "#364bc9",
              "--CircularProgress-size": "20px",
              "--CircularProgress-progressThickness": "2px",
              "--CircularProgress-trackThickness": "2px",
            }}
          />
          {!isOnlyIcon && (
            <span
              className="p-button__text"
              style={{ marginLeft: iconPosition === "right" ? 0 : 10 }}
            >
              Wait ...
            </span>
          )}
        </>
      ) : (
        <>
          {icon && <span className="p-button__icon">{icon}</span>}
          {!isOnlyIcon && <span className="p-button__text">{children}</span>}
        </>
      )}
    </button>
  );
};

export default PButton;
