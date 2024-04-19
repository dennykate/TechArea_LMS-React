import Heading from "@/components/typography/Heading";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import StudentZoomRecordFilterSearch from "./components/StudentZoomRecordFilterSearch";

const Grid = () => {
  return (
    <div className="md:p-8 sm:p-4 p-2 md:py-8 py-6 space-y-4">
      <Heading tag="h1">Student Zoom Records</Heading>
      <StudentZoomRecordFilterSearch />
    </div>
  );
};

export default withPermissions(Grid, banRoles.zoom_records);
