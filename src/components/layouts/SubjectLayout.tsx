/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Loader, Menu, Skeleton } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Tabs } from "@mantine/core";
import useQuery from "@/hooks/useQuery";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import MyPagination from "../common/MyPagination";

interface PropsType {
  children: React.ReactNode;
  gradeId?: string;
  setSubjectId?: (x: string) => void;
  search?: string;
  setSearch?: (x: string) => void;
  setPage?: (x: number) => void;
  total?: number;
  isFetching?: boolean;
}

const SubjectLayout: React.FC<PropsType> = ({
  children,
  gradeId,
  setSubjectId,
  search,
  setSearch,
  total = 0,
  setPage,
  isFetching,
}) => {
  const [activeSubject, setActiveSubject] = useState<string | null>("");
  const [activeSection, setActiveSection] = useState<string | null>("");
  const [value, setValue] = useState(1);

  const { data: subjects, isLoading } = useQuery(
    `/subjects?filter[grade_id]=${gradeId}`
  );
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
            {isLoading &&
              [0, 1, 2, 3, 4, 5]?.map((id) => (
                <Tabs.Tab key={id} value={`${id}`}>
                  <Skeleton height={15} width={30} />
                </Tabs.Tab>
              ))}

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
            defaultValue={search}
            onChange={(e) => setSearch && setSearch(e?.target?.value)}
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

      {isFetching ? (
        <div className="w-full h-[300px] flex justify-center items-center ">
          <Loader size="md" />
        </div>
      ) : (
        children
      )}

      <div className="w-full flex justify-end">
        <MyPagination
          total={total ? total : 1}
          value={value}
          onChange={(val) => {
            setValue(val);
            setPage && setPage(val);
          }}
        />
      </div>
    </div>
  );
};

export default SubjectLayout;
