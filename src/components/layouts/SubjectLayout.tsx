import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Tabs } from "@mantine/core";
import { subjects } from "@/features/studentCourse/components/data";

interface PropsType {
  children: React.ReactNode;
}

const SubjectLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div
      className="w-full bg-white space-y-4 shadow-md sm:p-4 p-2 border border-black 
    border-opacity-5 rounded-md"
    >
      <div
        className="w-full flex justify-between md:items-center items-end 
      gap-2 md:flex-row flex-col-reverse "
      >
        <Tabs defaultValue="gallery">
          <Tabs.List>
            {subjects?.map((subject) => (
              <Tabs.Tab key={subject.id} value={subject.name}>
                {subject.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>

        <div className="sm:w-auto w-full">
          <TextInputComponent
            placeholder="Search ..."
            inputClassName="sm:w-[350px] w-full"
          />
        </div>
      </div>

      {children}
    </div>
  );
};

export default SubjectLayout;
