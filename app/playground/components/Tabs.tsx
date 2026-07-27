import React, { useState, useRef, KeyboardEvent } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, ariaLabel }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = -1;

    if (e.key === 'ArrowRight') {
      newIndex = index === tabs.length - 1 ? 0 : index + 1;
    } else if (e.key === 'ArrowLeft') {
      newIndex = index === 0 ? tabs.length - 1 : index - 1;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== -1) {
      e.preventDefault();
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div 
        role="tablist" 
        aria-label={ariaLabel}
        className="flex space-x-2 border-b border-gray-200 mb-4"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 font-medium rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === index 
                ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200 -mb-[1px]' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          tabIndex={0}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-4 bg-white border border-gray-200"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
