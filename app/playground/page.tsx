'use client';

import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { Tabs } from './components/Tabs';
import { Disclosure } from './components/Disclosure';

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold mb-8">Accessibility Playground</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Modal Dialog</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Open Modal
        </button>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Accessible Modal"
        >
          <p className="text-gray-700 mb-4">
            This modal traps focus. You can tab through the interactive elements, but you cannot tab outside the modal.
          </p>
          <input 
            type="text" 
            placeholder="Focusable input" 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </Modal>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Tabs</h2>
        <Tabs
          ariaLabel="Example Tabs"
          tabs={[
            {
              id: 'tab1',
              label: 'Account',
              content: <p>Make changes to your account here.</p>
            },
            {
              id: 'tab2',
              label: 'Password',
              content: <p>Change your password here.</p>
            },
            {
              id: 'tab3',
              label: 'Settings',
              content: <p>Manage your account settings.</p>
            }
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Disclosure (Accordion)</h2>
        <Disclosure id="faq-1" title="What is the purpose of this playground?">
          <p>
            This playground is designed to practice and understand the WAI-ARIA authoring practices by implementing them manually.
          </p>
        </Disclosure>
      </section>
    </div>
  );
}
