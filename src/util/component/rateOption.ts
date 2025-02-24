import _ from "lodash";
import {
  TCheckboxReason,
  TCustomRatingGroupOption,
  TRatingValue,
} from "../../interface/components/ratemarker.type";

export const parseInitialValues = (
  options: TCustomRatingGroupOption[],
  initialValues: Record<string, any>
): Record<string, TRatingValue> => {
  const parsedRatings: Record<string, TRatingValue> = {};

  options.forEach(({ title, checkBox, showInputForOption }) => {
    const initialRating = initialValues[title];

    if (initialRating !== undefined && initialRating !== null) {
      if ((checkBox && checkBox.length > 0) || showInputForOption) {
        parsedRatings[title] = {
          value: initialRating.value || null,
          explanation: initialRating.explanation || {},
          reason: initialRating.reason || "",
        };
      } else {
        parsedRatings[title] = initialRating;
      }
    } else {
      parsedRatings[title] = null;
    }
  });

  return parsedRatings;
};

export const getRatingValue = (
  rating: TRatingValue
): string | number | null => {
  if (_.isNil(rating)) return null;
  if (_.isString(rating) || _.isNumber(rating)) {
    return rating;
  } else if (_.isObject(rating) && "value" in rating) {
    return rating.value;
  }
  return null;
};

export const getExplanation = (rating: TRatingValue): TCheckboxReason => {
  if (_.isNil(rating)) return {};
  if (_.isObject(rating) && "explanation" in rating) {
    return rating.explanation || {};
  }
  return {};
};

export const getRadioReason = (rating: TRatingValue): string => {
  if (_.isNil(rating)) return "";
  if (_.isObject(rating) && "reason" in rating) {
    return rating.reason || "";
  }
  return "";
};
