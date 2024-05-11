/* eslint-disable @typescript-eslint/no-explicit-any */
import QuizCard from "./QuizCard";
import SubjectLayout from "@/components/layouts/SubjectLayout";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import useQuery from "@/hooks/useQuery";
import { useDebouncedState } from "@mantine/hooks";
import { useMemo, useState } from "react";

const StudentQuizFilterSearch = () => {
  const { get } = useEncryptStorage();
  const [subjectId, setSubjectId] = useState<string>("");
  const [search, setSearch] = useDebouncedState("", 500);
  const [page, setPage] = useState(1);

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  const { data, total, isLoading } = useQuery(
    `/quizzes?filter[subject_id]=${subjectId}&key=asdffdsa&search=${search}&page=${page}`
  );

  return (
    <SubjectLayout
      isFetching={isLoading}
      total={total}
      setPage={setPage}
      gradeId={userInfo?.grade_id}
      setSubjectId={setSubjectId}
      search={search}
      setSearch={setSearch}
    >
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-2">
        {data?.length > 0 ? (
          data.map((dt: any) => <QuizCard key={dt?.id} data={dt} />)
        ) : (
          <div
            className="w-full h-[200px] flex justify-center items-center 
           xl:col-span-4 lg:col-span-3 sm:col-span-2"
          >
            <p>No Quiz</p>
          </div>
        )}
      </div>
    </SubjectLayout>
  );
};

export default StudentQuizFilterSearch;
