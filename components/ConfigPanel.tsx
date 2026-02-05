
import React from 'react';
import { ScraperConfig } from '../types';

interface ConfigPanelProps {
  config: ScraperConfig;
  onChange: (config: ScraperConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange }) => {
  const updateField = (field: keyof ScraperConfig['fields'], value: boolean) => {
    onChange({
      ...config,
      fields: {
        ...config.fields,
        [field]: value
      }
    });
  };

  const updateRootField = (field: keyof Omit<ScraperConfig, 'fields'>, value: any) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  return (
    <div className="space-y-8 h-full overflow-y-auto p-6 bg-gray-900 border-r border-gray-800 custom-scrollbar">
      <div>
        <h2 className="text-xl font-bold mb-1 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Configuration
        </h2>
        <p className="text-sm text-gray-400">Customize your scraping parameters.</p>
      </div>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Ethical Settings</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">Delay Range (Seconds)</label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={config.minDelay}
                onChange={(e) => updateRootField('minDelay', parseFloat(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Min"
              />
              <span className="text-gray-600">to</span>
              <input
                type="number"
                value={config.maxDelay}
                onChange={(e) => updateRootField('maxDelay', parseFloat(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Max"
              />
            </div>
            <p className="text-[10px] text-gray-500 italic">Recommended: 3 to 10 seconds to avoid detection.</p>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.useRotation}
                onChange={(e) => updateRootField('useRotation', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-5 rounded-full transition-colors ${config.useRotation ? 'bg-indigo-600' : 'bg-gray-700'}`}></div>
              <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${config.useRotation ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Rotate User-Agents</span>
          </label>

           <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={config.headless}
                onChange={(e) => updateRootField('headless', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-5 rounded-full transition-colors ${config.headless ? 'bg-indigo-600' : 'bg-gray-700'}`}></div>
              <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${config.headless ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Headless Mode</span>
          </label>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Fields to Extract</h3>
        <div className="grid grid-cols-1 gap-3">
          {(Object.keys(config.fields) as Array<keyof ScraperConfig['fields']>).map((field) => (
            <button
              key={field}
              onClick={() => updateField(field, !config.fields[field])}
              className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                config.fields[field] 
                ? 'bg-indigo-900/30 border-indigo-500 text-indigo-300' 
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <span className="capitalize">{field}</span>
              {config.fields[field] ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-600"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
        <h4 className="text-xs font-bold text-yellow-500 uppercase mb-1">Educational Note</h4>
        <p className="text-[11px] text-yellow-200/80 leading-relaxed">
          The selectors targeted here are for public LinkedIn profiles. Full data may require an active session, but browser-side scraping of authenticated sessions is complex and risky.
        </p>
      </div>
    </div>
  );
};

export default ConfigPanel;
