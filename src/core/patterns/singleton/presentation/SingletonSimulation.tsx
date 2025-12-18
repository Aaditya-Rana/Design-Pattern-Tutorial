'use client';

import { useState, useEffect } from 'react';
import { DatabaseConnection } from '../domain/DatabaseConnection';
import { Database, CheckCircle, XCircle } from 'lucide-react';

export default function SingletonSimulation() {
  const [instances, setInstances] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    DatabaseConnection.resetInstance();
  }, []);

  const createInstance = () => {
    const db = DatabaseConnection.getInstance();
    const id = db.getConnectionId();
    setInstances((prev) => [...prev, id]);
  };

  const toggleConnection = () => {
    const db = DatabaseConnection.getInstance();
    if (connected) {
      db.disconnect();
    } else {
      db.connect();
    }
    setConnected(!connected);
  };

  const allSame = instances.length > 0 && instances.every((id) => id === instances[0]);

  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Database Connection Singleton</h3>
        <p className="text-sm text-slate-600">Only one instance exists, no matter how many times you call getInstance()</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={createInstance}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
        >
          <Database size={20} />
          Get Instance
        </button>
        <button
          onClick={toggleConnection}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
            connected
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-slate-600 hover:bg-slate-700 text-white'
          }`}
        >
          {connected ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {connected ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-700 mb-4">Instance IDs Created:</h4>
        {instances.length === 0 ? (
          <p className="text-slate-500 italic">No instances created yet</p>
        ) : (
          <div className="space-y-2">
            {instances.map((id, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-mono">
                <span className="text-slate-600">Instance {index + 1}:</span>
                <span className="font-bold text-blue-600">{id}</span>
              </div>
            ))}
          </div>
        )}
        
        {instances.length > 1 && (
          <div className={`mt-4 p-3 rounded ${allSame ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={`text-sm font-semibold ${allSame ? 'text-green-700' : 'text-red-700'}`}>
              {allSame ? '✓ All instances are the SAME!' : '✗ Instances are different'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
