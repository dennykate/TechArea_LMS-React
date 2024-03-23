import MyBreadcrumbs from "../MyBreadcrumbs";

interface PropsType {
  children: React.ReactNode;
  linkItems: { title: string; link: string }[];
}

const DetailsLayout: React.FC<PropsType> = ({ children, linkItems }) => {
  return (
    <div className="w-full md:p-8 sm:p-4 p-2 md:py-8 py-6 ">
      <MyBreadcrumbs items={linkItems} />

      <div className="w-full border border-opacity-30 shadow-md rounded-md md:p-8 sm:p-4 p-3 bg-white mt-6">
        {children}
      </div>
    </div>
  );
};

export default DetailsLayout;
