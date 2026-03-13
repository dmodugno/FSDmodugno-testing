import { useState } from 'react';
import { exportData, importData } from '../db';

export default function Backup() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const jsonData = await exportData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oil-protocol-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Backup exported successfully!');
    } catch (error) {
      alert('Failed to export backup');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      await importData(text);
      alert('Backup imported successfully! Reload the page to see changes.');
    } catch (error) {
      alert('Failed to import backup. Please check the file format.');
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="backup">
      <h2>Backup & Restore</h2>

      <div className="section export">
        <h3>Export Data</h3>
        <p>
          Download all your saved sets, overrides, and settings as a JSON file.
          Store this file safely as a backup.
        </p>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="primary"
        >
          {isExporting ? 'Exporting...' : 'Export Backup'}
        </button>
      </div>

      <div className="section import">
        <h3>Import Data</h3>
        <p>
          Restore your data from a previously exported backup file.
          <strong> Warning:</strong> This will replace all current data.
        </p>
        <label className="file-input">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={isImporting}
          />
          <span className="button">
            {isImporting ? 'Importing...' : 'Choose Backup File'}
          </span>
        </label>
      </div>

      <div className="section info">
        <h3>What's Included</h3>
        <ul>
          <li>Saved oil sets</li>
          <li>Custom oil overrides</li>
          <li>Application settings</li>
        </ul>
        <p className="note">
          <strong>Note:</strong> Base rules (baseRules.json) are never stored in
          backups. They are always loaded fresh from the app.
        </p>
      </div>
    </div>
  );
}
