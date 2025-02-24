import React from "react";
import PRating from "../PRating";
import PTextArea from "../PTextArea";
import { IPTextAreaStepperProps } from "./type";

const PTextAreaStepper: React.FC<IPTextAreaStepperProps> = ({
  value,
  onChange,
  isDisabled,
  types,
}) => {
  const handleRatingChange = (type: string, rating: number) => {
    onChange({
      ...value,
      [`${type.toLowerCase()}Rating`]: rating,
    });
  };

  if (!value) return null;

  return (
    <div className="p-text-area-stepper">
      <PTextArea
        customClassName="p-text-area-stepper__textarea t-sm"
        placeholder=""
        value={value?.desc || ""}
        disabled={isDisabled}
      />

      <div className="p-text-area-stepper__wrapper">
        {types.map((type, index) => (
          <div className="p-text-area-stepper__container" key={type}>
            <div className="p-text-area-stepper__label t-md">{type}</div>
            <PRating
              disabled={isDisabled}
              value={value[`${type.toLowerCase()}Rating`] || 0}
              onChange={(rating: number) => handleRatingChange(type, rating)}
              useCircles
              type={type}
              maxValue={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PTextAreaStepper;
