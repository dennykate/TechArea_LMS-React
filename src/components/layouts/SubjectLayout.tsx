/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Menu } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Tabs } from "@mantine/core";
import useQuery from "@/hooks/useQuery";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface PropsType {
  children: React.ReactNode;
  gradeId?: string;
  setSubjectId?: (x: string) => void;
}

const SubjectLayout: React.FC<PropsType> = ({
  children,
  gradeId,
  setSubjectId,
}) => {
  const [activeSubject, setActiveSubject] = useState<string | null>("");
  const [activeSection, setActiveSection] = useState<string | null>("");

  const { data: subjects } = useQuery(`/subjects?filter[grade_id]=${gradeId}`);
  const { data: sections } = useQuery(`/sections?filter[grade_id]=${gradeId}`);

  useEffect(() => {
    if (subjects?.length > 0) {
      setActiveSubject(subjects[0]?.id as string);
      setSubjectId && setSubjectId(subjects[0]?.id as string);
    }
  }, [subjects]);

  useEffect(() => {
    if (sections?.length > 0) setActiveSection(sections[0]?.id as string);
  }, [sections]);

  return (
    <div
      className="w-full bg-white space-y-4 shadow-md sm:p-4 p-2 border border-black 
    border-opacity-5 rounded-md"
    >
      <div
        className="w-full flex justify-between md:items-center items-end 
      gap-2 md:flex-row flex-col-reverse "
      >
        <Tabs
          value={activeSubject}
          onTabChange={(val: string) => {
            setActiveSubject(val);
            setSubjectId && setSubjectId(val);
          }}
        >
          <Tabs.List>
            {subjects?.map((subject: any) => (
              <Tabs.Tab key={subject.id} value={subject.id}>
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
              {sections?.map((section: any) => (
                <Menu.Item
                  key={section?.id}
                  className={twMerge(
                    activeSection == section?.id &&
                      "bg-primary text-white hover:!bg-primary-600"
                  )}
                  onClick={() => setActiveSection(section?.id as string)}
                >
                  {section?.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {children}
    </div>
  );
};

export default SubjectLayout;
