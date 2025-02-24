import _ from "lodash";
import {
  FC,
  Suspense,
  lazy,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { parseInitialValues } from "../../../util/component/ratingmarkerGroup";
import {
  TPComplexRatingValue,
  TPRatingMarkerGroupProps,
  TPRatingValue,
} from "./type";

type Action =
  | {
      type: "SET_RATINGS";
      payload: Record<string, TPRatingValue>;
    }
  | {
      type: "UPDATE_RATING";
      payload: { title: string; value: string | number };
    }
  | {
      type: "UPDATE_CHECKBOX";
      payload: {
        title: string;
        checkboxContent: string;
        checked: boolean;
      };
    }
  | {
      type: "UPDATE_INPUT";
      payload: {
        title: string;
        checkboxContent: string;
        inputValue: string;
      };
    }
  | {
      type: "UPDATE_RADIO_REASON";
      payload: { title: string; reason: string };
    };

const ratingReducer = (
  state: Record<string, TPRatingValue>,
  action: Action
): Record<string, TPRatingValue> => {
  switch (action.type) {
    case "SET_RATINGS":
      return action.payload;
    case "UPDATE_RATING":
      const { title, value } = action.payload;
      const currentRating = state[title];
      if (typeof currentRating === "object" && currentRating !== null) {
        return {
          ...state,
          [title]: { ...currentRating, value },
        };
      } else {
        return {
          ...state,
          [title]: {
            value,
            explanation: {},
            reason: "",
          },
        };
      }
    case "UPDATE_CHECKBOX":
      const { title: checkboxTitle, checkboxContent, checked } = action.payload;
      const checkboxRating = state[checkboxTitle] as TPComplexRatingValue;
      const updatedExplanation = {
        ...checkboxRating.explanation,
        [checkboxContent]: {
          ...checkboxRating.explanation[checkboxContent],
          value: checked,
        },
      };
      return {
        ...state,
        [checkboxTitle]: {
          ...checkboxRating,
          explanation: updatedExplanation,
        },
      };
    case "UPDATE_INPUT":
      const {
        title: inputTitle,
        checkboxContent: inputCheckboxContent,
        inputValue,
      } = action.payload;
      const inputRating = state[inputTitle] as TPComplexRatingValue;
      const inputUpdatedExplanation = {
        ...inputRating.explanation,
        [inputCheckboxContent]: {
          ...inputRating.explanation[inputCheckboxContent],
          reason: inputValue,
        },
      };
      return {
        ...state,
        [inputTitle]: {
          ...inputRating,
          explanation: inputUpdatedExplanation,
        },
      };
    case "UPDATE_RADIO_REASON":
      const { title: radioTitle, reason } = action.payload;
      const radioRating = state[radioTitle] as TPComplexRatingValue;
      return {
        ...state,
        [radioTitle]: {
          ...radioRating,
          reason: reason,
        },
      };
    default:
      return state;
  }
};

const RatingOption = lazy(() => import("../PRatingOption"));

const CustomRatingMarkerGroup: FC<TPRatingMarkerGroupProps> = memo(
  ({
    listOfOptions = [],
    onGroupRatingsChange,
    value = {},
    disabled = false,
    className = "",
    errorQuestionIndices = [],
  }) => {
    const [selectedRatings, dispatch] = useReducer(
      ratingReducer,
      parseInitialValues(listOfOptions, value)
    );

    useEffect(() => {
      const parsedValues = parseInitialValues(listOfOptions, value);
      if (!_.isEqual(selectedRatings, parsedValues)) {
        dispatch({
          type: "SET_RATINGS",
          payload: parsedValues,
        });
      }
    }, [value, listOfOptions]);

    const handleRatingClick = useCallback(
      (title: string, newValue: string | number) => {
        dispatch({
          type: "UPDATE_RATING",
          payload: { title, value: newValue },
        });
        const updatedRatings = ratingReducer(selectedRatings, {
          type: "UPDATE_RATING",
          payload: { title, value: newValue },
        });
        onGroupRatingsChange(updatedRatings);
      },
      [onGroupRatingsChange, selectedRatings]
    );

    const handleCheckboxChange = useCallback(
      (title: string, checkboxContent: string, checked: boolean) => {
        dispatch({
          type: "UPDATE_CHECKBOX",
          payload: { title, checkboxContent, checked },
        });
        const updatedRatings = ratingReducer(selectedRatings, {
          type: "UPDATE_CHECKBOX",
          payload: { title, checkboxContent, checked },
        });
        onGroupRatingsChange(updatedRatings);
      },
      [onGroupRatingsChange, selectedRatings]
    );

    const handleInputChange = useCallback(
      (title: string, checkboxContent: string, inputValue: string) => {
        dispatch({
          type: "UPDATE_INPUT",
          payload: { title, checkboxContent, inputValue },
        });
        const updatedRatings = ratingReducer(selectedRatings, {
          type: "UPDATE_INPUT",
          payload: {
            title,
            checkboxContent,
            inputValue,
          },
        });
        onGroupRatingsChange(updatedRatings);
      },
      [onGroupRatingsChange, selectedRatings]
    );

    const handleRadioReasonChange = useCallback(
      (title: string, reason: string) => {
        dispatch({
          type: "UPDATE_RADIO_REASON",
          payload: { title, reason },
        });
        const updatedRatings = ratingReducer(selectedRatings, {
          type: "UPDATE_RADIO_REASON",
          payload: { title, reason },
        });
        onGroupRatingsChange(updatedRatings);
      },
      [onGroupRatingsChange, selectedRatings]
    );

    const memoizedOptions = useMemo(
      () =>
        listOfOptions.map((option, index) => ({
          option,
          index,
          selectedRating: selectedRatings[option.title],
          onRatingClick: (newValue: string | number) =>
            handleRatingClick(option.title, newValue),
          onCheckboxChange: (checkboxContent: string, checked: boolean) =>
            handleCheckboxChange(option.title, checkboxContent, checked),
          onInputChange: (checkboxContent: string, inputValue: string) =>
            handleInputChange(option.title, checkboxContent, inputValue),
          onRadioReasonChange: (reason: string) =>
            handleRadioReasonChange(option.title, reason),
        })),
      [
        listOfOptions,
        selectedRatings,
        handleRatingClick,
        handleCheckboxChange,
        handleInputChange,
        handleRadioReasonChange,
      ]
    );

    return (
      <div className={`p-rate-marker-group-container ${className}`}>
        <Suspense fallback={<div>Loading...</div>}>
          {memoizedOptions.map(
            ({
              option,
              index,
              selectedRating,
              onRatingClick,
              onCheckboxChange,
              onInputChange,
              onRadioReasonChange,
            }) => (
              <RatingOption
                key={option.title}
                option={option}
                index={index}
                selectedRating={selectedRating}
                errorQuestionIndices={errorQuestionIndices}
                disabled={disabled}
                onRatingClick={onRatingClick}
                onCheckboxChange={onCheckboxChange}
                onInputChange={onInputChange}
                onRadioReasonChange={onRadioReasonChange}
              />
            )
          )}
        </Suspense>
      </div>
    );
  }
);

export default CustomRatingMarkerGroup;
