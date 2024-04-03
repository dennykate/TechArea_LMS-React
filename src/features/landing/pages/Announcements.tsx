import MyPagination from "@/components/common/MyPagination";
import { Footer, Home } from "../components";
import AnnouncementCard from "../components/AnnouncementCard";
import { dailyUpdateData, subTitle, title } from "../data";

const Accouncements = () => {
  return (
    <>
      <Home />

      <div className="max-w-5xl mx-auto pb-20 sm:mt-20 pt-0 px-2">
        <div className="w-2/3 mx-auto text-center">
          <h6 className={subTitle}>Together We Can Create</h6>
          <h1 className={title}>Accouncements Updated Daily</h1>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {dailyUpdateData?.map((data, index) => (
            <AnnouncementCard key={index} data={data} />
          ))}
          {dailyUpdateData?.map((data, index) => (
            <AnnouncementCard key={index} data={data} />
          ))}
          {dailyUpdateData?.map((data, index) => (
            <AnnouncementCard key={index} data={data} />
          ))}
        </div>

        <div className="w-full flex justify-end mt-12">
          <MyPagination total={5} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accouncements;
