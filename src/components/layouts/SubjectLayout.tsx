import { ActionIcon, Menu } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Tabs } from "@mantine/core";
import { subjects } from "@/features/student-course/components/data";

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

        <div className="sm:w-auto w-full gap-2 flex items-center">
          <TextInputComponent
            placeholder="Search ..."
            inputClassName="sm:w-[350px] w-full"
          />

          <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon
                size="lg"
                className="border border-black border-opacity-20"
              >
                <IconAdjustments size="1.125rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Section - A</Menu.Item>
              <Menu.Item>Section - B</Menu.Item>
              <Menu.Item>Section - C</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {children}
    </div>
  );
};

export default SubjectLayout;
