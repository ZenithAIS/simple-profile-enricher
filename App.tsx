
import React, { useState, useMemo } from 'react';
import ConfigPanel from './components/ConfigPanel';
import CodeViewer from './components/CodeViewer';
import { ScraperConfig, FileType } from './types';
import { generatePythonScript, generateReadme } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<ScraperConfig>({
    minDelay: 2,
    maxDelay: 7,
    useRotation: true,
    headless: false,
    fields: {
      name: true,
      headline: true,
      location: true,
      about: true
    }
  });

  const [activeTab, setActiveTab] = useState<FileType>(FileType.PYTHON);

  const pythonScript = useMemo(() => generatePythonScript(config), [config]);
  const readmeContent = useMemo(() => generateReadme(), []);

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-screen bg-[#0d1117]">
      {/* Sidebar - Config */}
      <aside className="w-full lg:w-96 flex-shrink-0">
        <ConfigPanel config={config} onChange={setConfig} />
      </aside>

      {/* Main Content - Code Display */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Python</span>
              <h1 className="text-2xl font-bold text-white">Ethical LinkedIn Scraper</h1>
            </div>
            <p className="text-gray-400 text-sm">Automated script generation for educational research.</p>
          </div>
          
          <nav className="flex bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab(FileType.PYTHON)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === FileType.PYTHON 
                ? 'bg-gray-700 text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              script.py
            </button>
            <button
              onClick={() => setActiveTab(FileType.README)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === FileType.README 
                ? 'bg-gray-700 text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              README.md
            </button>
          </nav>
        </header>

        <div className="flex-1 min-h-0">
          {activeTab === FileType.PYTHON ? (
            <CodeViewer code={pythonScript} filename="linkedin_scraper.py" />
          ) : (
            <CodeViewer code={readmeContent} filename="README.md" />
          )}
        </div>

        <footer className="mt-6 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-800 pt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Ready to Export
            </span>
            <span className="hover:text-gray-300 cursor-help underline decoration-dotted">V1.0.0 Enterprise Stable</span>
          </div>
          <div className="flex items-center space-x-4 italic">
            <span>Built for Educational Transparency</span>
            <a href="https://selenium.dev" target="_blank" className="hover:text-indigo-400">Selenium Docs</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
