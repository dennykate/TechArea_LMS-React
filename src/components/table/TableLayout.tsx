import MyBreadcrumbs from "../MyBreadcrumbs";

interface PropsType {
  children: React.ReactNode;
  linkItems: { title: string; link: string }[];
}

const TableLayout: React.FC<PropsType> = ({ children, linkItems }) => {
  return (
    <div className="w-full p-8 space-y-6">
      <MyBreadcrumbs items={linkItems} />

      {children}
    </div>
  );
};

export default TableLayout;
