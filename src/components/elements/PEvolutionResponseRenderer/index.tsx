import React from "react";
import { TPEvaluationDivPropsType } from "./type";

const PEvolutionResponseRenderer: React.FC<TPEvaluationDivPropsType> = ({
  label,
  value,
  update,
  staticProps,
  enableValidation = false,
}) => {
  return (
    <>
      {value && value.improvement && (
        <div className="p-evolution-response-renderer__wrapper">
          <div className="p-evolution-response-renderer__heading">
            <div>Evaluation</div>
            <div className="p-evolution-response-renderer__tag">
              {value.data?.length}
            </div>
          </div>
          <div className="p-evolution-response-renderer__content">
            {value.data?.map((suggestion: string, index: number) => (
              <div key={index} className="p-evolution-response-renderer__item">
                <div className="p-evolution-response-renderer__dot"></div>
                <div className="p-evolution-response-renderer__text">
                  {suggestion}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {value && !value.isError && !value.improvement && !value.serviceDown && (
        <div className="p-evolution-response-renderer__status">
          You are good to go!
        </div>
      )}

      {value && value.isError && (
        <div className="p-evolution-response-renderer__error">
          Please ensure your input is coherent and relevant to the task
          instructions.
        </div>
      )}
    </>
  );
};

export default PEvolutionResponseRenderer;
