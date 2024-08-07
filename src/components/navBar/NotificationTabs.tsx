import React from "react";

interface PropsType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  counts: {
    all: number;
    tests: number;
    homeworks: number;
  };
}

const NotificationTabs = ({ activeTab, setActiveTab, counts }: PropsType) => {
  const tabs = [
    { name: "All", count: counts.all },
    { name: "Tests", count: counts.tests },
    { name: "Homeworks", count: counts.homeworks },
  ];

  return (
    <div className="flex gap-5 px-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`py-3 border-b-2  translate-y-[1px] flex items-center ${
            activeTab === tab.name ? " border-primary" : " border-transparent"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab(tab.name);
          }}
        >
          {tab.name}
          {tab.count > 0 && (
            <span className="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NotificationTabs;
