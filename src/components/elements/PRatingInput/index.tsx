import { FC, useEffect, useState } from "react";
import { PInput, PRatingMarker } from "../../..";
import { TPRatingInputProps } from "./type";

const PRatingInput: FC<TPRatingInputProps> = ({
  schema,
  value,
  isDisabled,
  onUpdate,
}) => {
  console.log({
    schema,
    value,
  });
  const [internalValue, setInternalValue] = useState<any[]>(value);

  useEffect(() => {
    if (!internalValue) {
      const initialValue = schema?.map((item) => ({
        ...item,
        rating: null,
        justification: "",
      }));
      setInternalValue(initialValue);
      onUpdate(initialValue);
    }
  }, [schema, onUpdate, internalValue?.length]);

  const handleOnChange = (
    key: string,
    keyValue: string | number,
    index: number
  ) => {
    const updatedValue = [...internalValue];
    updatedValue[index] = {
      ...updatedValue[index],
      [key]: keyValue,
    };
    setInternalValue(updatedValue);
    onUpdate(updatedValue);
  };

  return (
    <div className="p-rating-input-container">
      {schema?.map((questObj, index) => (
        <div key={index} className="p-rating-input-sub-container">
          <div className="p-rating-input-question">{questObj.question}</div>
          <div className="p-rating-input-rating-container">
            <PRatingMarker
              disabled={isDisabled}
              options={questObj.ratingOptions}
              selectedRating={
                internalValue && internalValue[index]
                  ? internalValue[index].rating
                  : null
              }
              onRatingClick={(rating) =>
                handleOnChange("rating", rating, index)
              }
            />
          </div>
          <div className="p-rating-input-justification-container">
            <PInput
              disabled={isDisabled}
              customClassName="p-rating-input-textarea"
              placeholder="Please give justification for your selection"
              value={
                internalValue && internalValue[index]
                  ? internalValue[index].justification
                  : ""
              }
              onChange={(val) => handleOnChange("justification", val, index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PRatingInput;
