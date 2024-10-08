/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import MyCarousel from "@/components/common/MyCarousel";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import useMutate from "@/hooks/useMutate";
import { useForm } from "@mantine/form";

interface PropsType {
  assignmentMarks: number;
  report: any;
  onClose: () => void;
}

const RateStudent: React.FC<PropsType> = ({
  report,
  assignmentMarks,
  onClose,
}) => {
  const form = useForm({
    initialValues: {
      marks: parseInt(report?.marks) || 0,
    },
    validateInputOnBlur: true,
    validate: {
      marks: (value: number) => (value > 0 ? null : "Marks are required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => onClose(),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(`/assignment-reports/${report?.id}/rate`, values)
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

      <MyCarousel
        slides={report?.attachments}
        height={150}
        className="h-[150px]"
      />
    </form>
  );
};

export default RateStudent;
