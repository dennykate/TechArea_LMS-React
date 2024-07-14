import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import ZoomInformation from "./components/ZoomInformation";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import { useNavigate, useParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";

const Details = () => {
  const navigate = useNavigate();
  const { zoomMeetingId } = useParams();

  const { data } = useQuery(`/zooms/${zoomMeetingId}`);

  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Online Classroom List", link: "/zoom-meetings/list" },
        { title: "Online Classroom Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3 relative">
        <ZoomInformation data={data} />

        <div className="absolute top-0 right-0">
          <div>
            <MyButton
              onClick={() => navigate(`/zoom-meetings/edit/${zoomMeetingId}`)}
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        </div>
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.zoom_meetings);
