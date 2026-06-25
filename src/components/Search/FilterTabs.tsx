type TabType = "materials" | "contractors" | "tools" | "free";

interface FilterTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export function FilterTabs({ activeTab, onChange }: FilterTabsProps) {
  const tabs: TabType[] = ["materials", "contractors", "tools", "free"];

  return (
    <div className="flex w-full gap-2 overflow-x-auto no-scrollbar py-0.5 select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        let tabStyle = "";
        
        if (isActive) {
          if (tab === "free") {
            tabStyle = "bg-free-active-bg border-free-active-border text-free-active-text";
          } else {
            tabStyle = "bg-[var(--brand-gold)] border-[var(--brand-gold)] text-white";
          }
        } else {
          if (tab === "free") {
            tabStyle = "bg-free-inactive-bg border-free-inactive-border text-free-inactive-text";
          } else {
            tabStyle = "bg-tab-inactive-bg border-tab-inactive-border text-tab-inactive-text hover:text-foreground";
          }
        }

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex-1 min-w-[76px] py-2 text-[9px] font-extrabold uppercase tracking-wider border rounded-none transition duration-150 active-scale ${tabStyle}`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
