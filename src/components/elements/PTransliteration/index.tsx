import { FC, useState } from "react";
import { Language, ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { transliteration_languages } from "../../../constant/langList";
import PSelect from "../PSelect";
import { TPTransliterationProps } from "./type";
const PTransliteration: FC<TPTransliterationProps> = ({
  value,
  onChange,
  language = "",
  containerClassName = "",
  placeholder = "Start typing in English...",
  maxOptions = 8,
  offsetY = 8,
  activeItemStyles = {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
  },
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(language || "");

  const handleLanguageChange = (value: string | string[] | null) => {
    if (typeof value === "string") {
      setSelectedLang(value);
    }
  };

  const languageOptions = transliteration_languages.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  return (
    <div className="p-transliteration-wrapper">
      {!Boolean(language) && (
        <div className="language-selector">
          <PSelect
            onChange={handleLanguageChange}
            value={selectedLang}
            options={languageOptions}
            placeholder="Select Language"
            isSearchable={true}
            isClearable={false}
          />
        </div>
      )}

      <div className="text-area-wrapper">
        <ReactTransliterate
          renderComponent={(props) => (
            <textarea
              {...props}
              className="input-textarea"
              placeholder={placeholder}
              aria-label="Transliteration input"

            />
          )}
          value={value}
          onChangeText={onChange}
          lang={selectedLang as Language}
          containerClassName={containerClassName}
          maxOptions={maxOptions}
          offsetY={offsetY}
          activeItemStyles={activeItemStyles}
        />
      </div>
    </div>
  );
};

export default PTransliteration;
