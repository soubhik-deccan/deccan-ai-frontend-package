import { Checkbox, FormControlLabel } from "@mui/material";
import { FC } from "react";
import { TPCheckBoxProps } from "./type";

const PCheckBox: FC<TPCheckBoxProps> = ({
  checked,
  onChange,
  label,
  className,
  checkboxClassName,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`p-checkbox-container ${className}`}>
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            size="small"
            checked={checked}
            onChange={handleChange}
          />
        }
        label={label}
        className={checkboxClassName}
      />
    </div>
  );
};

export default PCheckBox;
