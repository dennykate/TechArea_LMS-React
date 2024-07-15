import MyBreadcrumbs from "../MyBreadcrumbs";

interface PropsType {
  children: React.ReactNode;
  linkItems?: { title: string; link: string }[];
}

const TableLayout: React.FC<PropsType> = ({ children, linkItems }) => {
  return (
    <div className="w-full md:p-8 sm:p-4 p-2 md:py-8 py-6 space-y-6">
      {linkItems && <MyBreadcrumbs items={linkItems} />}

      {children}
    </div>
  );
};

export default TableLayout;
