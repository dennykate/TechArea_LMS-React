import DetailsLayout from "@/components/layouts/DetailsLayout";
import StudentClassInformation from "./components/StudentClassInformation";
import { Navigate, useParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Details = () => {
  const { classId } = useParams();

  const { data, isError, isLoading } = useQuery(`/zooms/${classId}`);

  if (isError) return <Navigate to="/student-classes/grid" />;

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Zoom Meeting List", link: "/zoom-meetings/list" },
        { title: "Zoom Meeting Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3 relative">
        <StudentClassInformation data={data} />
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.student_classes);
