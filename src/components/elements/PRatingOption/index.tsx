import { InfoCircle } from "iconsax-react";
import { FC, memo } from "react";

import DOMPurify from "dompurify";
import {
  getExplanation,
  getRadioReason,
  getRatingValue,
} from "../../../util/component/ratingmarkerGroup";
import PAccordion from "../PAccordion";
import PHtmlTooltip from "../PHtmlToolTip";
import PInput from "../PInput";
import PRatingMarker from "../PRatingMarker";
import PCheckBox from "../TCheckBox";
import { TPRatingOptionProps } from "./type";

const PRatingOption: FC<TPRatingOptionProps> = memo(
  ({
    option,
    index,
    selectedRating,
    errorQuestionIndices,
    disabled,
    onRatingClick,
    onCheckboxChange,
    onInputChange,
    onRadioReasonChange,
  }) => {
    const {
      title,
      description,
      toolTip,
      options,
      checkBox,
      showInputForOption,
    } = option;
    const ratingValue = getRatingValue(selectedRating);
    const explanation = getExplanation(selectedRating);
    const reason = getRadioReason(selectedRating);

    return (
      <div
        className={`p-rate-marker-group ${
          errorQuestionIndices.includes(index + 1) ? "error-question" : ""
        }`}
      >
        <p className="t-sm p-rate-marker-group__title">{title}</p>
        {description && (
          <span className="t-sm p-rate-marker-group__description">
            {description}
          </span>
        )}

        <div className="bottom-div">
          <PRatingMarker
            initialValue={ratingValue}
            options={options}
            selectedRating={ratingValue}
            onRatingClick={onRatingClick}
            disabled={disabled}
          />
        </div>

        {showInputForOption && (
          <div className="p-rate-marker-group__radio_input">
            <PInput
              customClassName="p-rate-marker-group__input"
              placeholder="Enter justification..."
              value={reason}
              onChange={(e) => onRadioReasonChange(e)}
            />
          </div>
        )}

        {checkBox && checkBox.length > 0 && (
          <div className="p-rate-marker-group__checkboxes">
            {checkBox.map(
              ({ enable, content, showInputForOption, toolTip }, idx) =>
                enable &&
                content && (
                  <div
                    key={content}
                    className="p-rate-marker-group__checkbox_item"
                  >
                    <div className="p-rate-marker-group__checkbox">
                      <PCheckBox
                        checked={explanation[content]?.value ?? false}
                        onChange={(checked: boolean) =>
                          onCheckboxChange(content, checked)
                        }
                        label={content}
                      />
                      {toolTip?.enable && (
                        <PHtmlTooltip htmlContent={toolTip?.content ?? ""}>
                          <InfoCircle size="12" color="#b3b3b3" />
                        </PHtmlTooltip>
                      )}
                    </div>
                    {showInputForOption && explanation[content]?.value && (
                      <div className="p-rate-marker-group__checkbox_input">
                        <PInput
                          customClassName="p-rate-marker-group__input"
                          placeholder="Enter reason..."
                          value={explanation[content]?.reason || ""}
                          onChange={(e) => onInputChange(content, e)}
                        />
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        )}

        {toolTip?.enable && (
          <PAccordion title="Explanation of rubrics" isOpen={false}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(toolTip?.content ?? ""),
              }}
            />
          </PAccordion>
        )}

        {errorQuestionIndices.includes(index + 1) && (
          <p className="t-sm p-rate-marker-group__error">{`*Field missing for ${title}`}</p>
        )}
      </div>
    );
  }
);

export default PRatingOption;
