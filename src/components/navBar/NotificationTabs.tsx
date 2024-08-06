import React from "react";
interface PropsType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const NotificationTabs = ({ activeTab, setActiveTab }: PropsType) => {
  const tabs = ["Inbox", "General", "Archive"];

  return (
    <div className="flex gap-5 px-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`py-3 border-b-2  translate-y-[1px] ${
            activeTab === tab ? " border-primary" : " border-transparent"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab(tab);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NotificationTabs;
