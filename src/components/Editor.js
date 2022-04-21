import React, { useEffect } from "react";
import AceEditor from "react-ace";
import Select from "react-select";
import { colorStyles, LANGUAGES } from "../constants";

const Editor = ({
  question,
  visible,
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
  currentQuestionData,
}) => {
  useEffect(() => {
    if (currentQuestionData) {
      console.log(currentQuestionData.limit);
    }
  }, [currentQuestionData]);

  function onChange(newValue) {
    setCode(newValue);
  }
  return (
    <div className={`${visible ? "flex" : "hidden"} flex-col gap-8`}>
      <p className="text-white80 font-semibold text-xl">{question}</p>
      <div className="w-1/4 z-10">
        <Select
          value={selectedLanguage}
          styles={colorStyles}
          options={LANGUAGES.map((op) => ({
            value: op.value,
            label: op.label,
          }))}
          onChange={(options) => {
            setSelectedLanguage(options);
          }}
          placeholder="Select language"
        />
      </div>
      <div className="w-full">
        <AceEditor
          style={{ width: "100%" }}
          placeholder="Write your code here..."
          mode={selectedLanguage.value}
          theme="monokai"
          name="code-editor"
          onChange={onChange}
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          showLineNumbers={true}
          tabSize={2}
        />
      </div>
    </div>
  );
};

export default Editor;
