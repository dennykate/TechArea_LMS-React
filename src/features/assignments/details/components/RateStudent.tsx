/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import MediaViewer from "@/components/common/MediaViewer";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import useMutate from "@/hooks/useMutate";
import { useForm } from "@mantine/form";

interface PropsType {
  reportId: string;
  assignmentMarks: number;
  attachments: any;
}

const RateStudent: React.FC<PropsType> = ({
  reportId,
  assignmentMarks,
  attachments,
}) => {
  const form = useForm({
    initialValues: {
      marks: 0,
    },
    validateInputOnBlur: true,
    validate: {
      marks: (value: number) => (value > 0 ? null : "Marks are required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(`/assignment-reports/${reportId}/rate`, values)
      )}
      className="space-y-4"
    >
      <NumberInputComponent
        placeholder="Rate"
        label="Rate"
        form={form}
        name="marks"
        max={assignmentMarks}
        description={`Maximum marks is ${assignmentMarks}`}
      />

      <div className="flex justify-end">
        <MyButton loading={isLoading} type="submit">
          Rate Now
        </MyButton>
      </div>

      <MediaViewer attachments={attachments} />
    </form>
  );
};

export default RateStudent;
