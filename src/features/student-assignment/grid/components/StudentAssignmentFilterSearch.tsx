/* eslint-disable @typescript-eslint/no-explicit-any */
import AssignmentCard from "./AssignmentCard";
import SubjectLayout from "@/components/layouts/SubjectLayout";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import useQuery from "@/hooks/useQuery";
import { useDebouncedState } from "@mantine/hooks";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const StudentAssignmentFilterSearch = () => {
  const { get } = useEncryptStorage();
  const [subjectId, setSubjectId] = useState<string>("");
  const [search, setSearch] = useDebouncedState("", 500);
  const [page, setPage] = useState(1);

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  const { data, total } = useQuery(
    `/assignments?filter[subject_id]=${subjectId}&start_date=${dayjs().format(
      "YYYY-MM-DD"
    )}&end_date=${dayjs()
      .add(1, "year")
      .format("YYYY-MM-DD")}&search=${search}&page=${page}`
  );

  return (
    <SubjectLayout
      setPage={setPage}
      total={total}
      gradeId={userInfo?.grade_id}
      setSubjectId={setSubjectId}
      search={search}
      setSearch={setSearch}
    >
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-2">
        {data.map((dt: any) => (
          <AssignmentCard key={dt} data={dt} />
        ))}
      </div>
    </SubjectLayout>
  );
};

export default StudentAssignmentFilterSearch;
