import SelectComponent from "@/components/inputs/SelectComponent";
import { courseContentType } from "./data";
import FileUpload from "@/components/inputs/FileUpload";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import FormLayout from "@/components/layouts/FormLayout";
import { useForm } from "@mantine/form";
import VideoPlayer from "@/components/common/VideoPlayer";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";

interface PropsType {
  close: () => void;
}

const CreateCourseContent: React.FC<PropsType> = ({ close }) => {
  const form = useForm({
    initialValues: {
      type: "image",
      youtubeURL: "",
      text: "",
    },
  });

  return (
    <FormLayout
      wrapperClassName="px-2 py-4"
      isModal
      onSubmit={() => {}}
      onCancel={close}
    >
      <div className="space-y-4">
        {(form.values.type === "image" || form.values.type === "video") && (
          <FileUpload type={form.values.type as "video" | "image"} />
        )}

        {form.values.type === "youtube" && (
          <>
            <VideoPlayer url={form.values.youtubeURL}  />

            <TextInputComponent
              label="Youtube URL"
              placeholder="Enter Youtube URL"
              form={form}
              name="youtubeURL"
              withAsterisk
            />
          </>
        )}

        {form.values.type === "text" && (
          <TextEditorInput
            content={form.values.text}
            handleChange={(val) => form.setFieldValue("text", val)}
          />
        )}

        <TextInputComponent
          label="Name"
          placeholder="Enter Name"
          withAsterisk
        />

        <NumberInputComponent
          label="Order"
          placeholder="Enter Order"
          value={1}
          withAsterisk
        />

        <SelectComponent
          data={courseContentType}
          label="Content Type"
          withAsterisk
          placeholder="Select Content Type"
          form={form}
          name="type"
        />

        <TextAreaComponent
          label="Description"
          placeholder="Enter Description"
          withAsterisk
        />
      </div>
    </FormLayout>
  );
};

export default CreateCourseContent;
