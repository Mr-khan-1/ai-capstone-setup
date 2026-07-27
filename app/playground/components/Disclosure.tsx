import React, { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`sect-${id}`}
          id={`accordion-${id}`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3 font-medium text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50 hover:bg-gray-50 transition-colors"
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={`sect-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        hidden={!isOpen}
        className="px-4 py-4 text-gray-700 border-t border-gray-200"
      >
        {children}
      </div>
    </div>
  );
};
