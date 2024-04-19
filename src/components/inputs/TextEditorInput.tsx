/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { twMerge } from "tailwind-merge";

interface TextEditorInputProps {
  value?: any;
  onChange?: (value: any) => void;
  label?: string;
  inputClassName?: string;
}
const TextEditorInput = ({
  value,
  onChange,
  label,
  inputClassName,
}: TextEditorInputProps) => {
  return (
    <div className={twMerge(label ? "min-h-[190px]" : "min-h-[140px] ")}>
      {label && (
        <label htmlFor="text-editor" className="font-medium">
          {label}
        </label>
      )}

      <ReactQuill
        id="text-editor"
        value={value}
        onChange={onChange}
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
        className={twMerge("h-[100px]", label && "mt-2", inputClassName)}
      />
    </div>
  );
};

export default TextEditorInput;
