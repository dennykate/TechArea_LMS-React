/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorInputProps {
  content: any;
  handleChange: (value: any) => void;
  label: string;
}
const TextEditorInput = ({
  content,
  handleChange,
  label,
}: TextEditorInputProps) => {
  return (
    <>
      <label htmlFor="text-editor" className="-mb-2">{label}</label>
      <ReactQuill
        id="text-editor"
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            // [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
        ]}
      />
    </>
  );
};

export default TextEditorInput;
