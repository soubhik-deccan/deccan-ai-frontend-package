import DOMPurify from "dompurify";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { convertArrayToObject } from "../../../util/component/radioGroup";
import PAccordion from "../PAccordion";
import PInput from "../PInput";
import PRadio from "../PRadio";
import { TPRadioGroupProps, TPReturnPRadioGroupOption } from "./type";

const PRadioGroup: FC<TPRadioGroupProps> = ({
  listOfOptions,
  customClassName,
  initialValues,
  onChange,
  error,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [supportedTexts, setSupportedTexts] = useState<
    Record<string, string | null>
  >({});

  const memoizedListOfOptions = useMemo(() => listOfOptions, [listOfOptions]);

  useEffect(() => {
    const initializeValues = () => {
      if (initialValues && Object.keys(initialValues).length > 0) {
        if (Array.isArray(initialValues)) {
          const { selectedOptions, supportedTexts } =
            convertArrayToObject(initialValues);
          return { selectedOptions, supportedTexts };
        } else {
          return {
            selectedOptions:
              (initialValues as TPReturnPRadioGroupOption).selectedOptions ||
              {},
            supportedTexts:
              (initialValues as TPReturnPRadioGroupOption).supportedTexts || {},
          };
        }
      } else {
        const emptySelectedOptions: Record<string, string> = {};
        const emptySupportedTexts: Record<string, string | null> = {};
        memoizedListOfOptions.forEach((question) => {
          emptySelectedOptions[question.label] = "";
          emptySupportedTexts[question.label] = null;
        });
        return {
          selectedOptions: emptySelectedOptions,
          supportedTexts: emptySupportedTexts,
        };
      }
    };

    const {
      selectedOptions: initSelectedOptions,
      supportedTexts: initSupportedTexts,
    } = initializeValues();
    setSelectedOptions(initSelectedOptions);
    setSupportedTexts(initSupportedTexts);
  }, [initialValues, memoizedListOfOptions]);

  const handleChange = useCallback(
    (question: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const idOfSelectedOption = memoizedListOfOptions
        .find((op) => op.label === question)
        ?.options.find((o) => o.value === value)?.id;

      setSelectedOptions((prev) => {
        const updatedSelectedValues = {
          ...prev,
          [question]: value,
        };
        const updatedInputValues = { ...supportedTexts };
        if (
          !memoizedListOfOptions
            .find((q) => q.label === question)
            ?.config.showInputForOptions.includes(idOfSelectedOption || "")
        ) {
          updatedInputValues[question] = null;
        }
        setSupportedTexts(updatedInputValues);
        onChange({
          selectedOptions: updatedSelectedValues,
          supportedTexts: updatedInputValues,
        });
        return updatedSelectedValues;
      });
    },
    [memoizedListOfOptions, onChange, supportedTexts]
  );

  const handleInputChange = useCallback(
    (question: string) => (value: string) => {
      setSupportedTexts((prev) => {
        const updatedInputValues = {
          ...prev,
          [question]: value,
        };
        onChange({
          selectedOptions,
          supportedTexts: updatedInputValues,
        });
        return updatedInputValues;
      });
    },
    [onChange, selectedOptions]
  );

  return (
    <div className={`p-radio-group ${customClassName} ${error ? "error" : ""}`}>
      {memoizedListOfOptions.map((questionItem, index) => (
        <div key={`question-${index}`} className="p-radio-group__item">
          <PRadio
            disabled={disabled}
            options={questionItem.options}
            name={`question-${questionItem.id}`}
            label={`&nbsp;${index + 1}. ${questionItem.label}`}
            value={selectedOptions[questionItem.label] || ""}
            onChange={handleChange(questionItem.label)}
          />
          {questionItem.config.showInputForOptions.includes(
            memoizedListOfOptions
              .find((q) => q.label === questionItem.label)
              ?.options.find(
                (o) => o.value === selectedOptions[questionItem.label]
              )?.id || ""
          ) && (
            <PInput
              disabled={disabled}
              customClassName="p-radio-group__input"
              placeholder="Please provide more details"
              value={supportedTexts[questionItem.label] || ""}
              onChange={handleInputChange(questionItem.label)}
            />
          )}
          {questionItem.metaInfo?.toolTip?.enable && (
            <div className="p-radio-group__tooltip">
              <PAccordion title="Explanation of rubrics" isOpen={false}>
                <div
                  className="p-radio-group__tooltip-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      questionItem.metaInfo?.toolTip?.content ?? "",
                      { ADD_ATTR: ["target"], FORBID_ATTR: ['target="_blank"'] }
                    ),
                  }}
                />
              </PAccordion>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(PRadioGroup);
