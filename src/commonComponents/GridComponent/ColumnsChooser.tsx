import React, { useState, useImperativeHandle, ForwardedRef } from 'react';

interface ColumnChooserProps<D extends object = {}> {
  allColumns: Array<Column<D>>;
  onApply: (selectedColumns: string[]) => void;
}

export interface ColumnChooserRef {
  toggle: () => void;
}

const ColumnChooser = <D extends object = {}>(
  { allColumns, onApply }: ColumnChooserProps<D>,
  ref: ForwardedRef<ColumnChooserRef>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    allColumns.filter(col => col.visible !== false).map(col => col.id!)
  );

  useImperativeHandle(ref, () => ({
    toggle: () => setIsOpen(prev => !prev)
  }));

  const handleToggleColumn = (columnId: string, isChecked: boolean) => {
    setSelectedColumns(prev => 
      isChecked 
        ? [...prev, columnId] 
        : prev.filter(id => id !== columnId)
    );
  };

  const handleApply = () => {
    onApply(selectedColumns);
    setIsOpen(false);
  };

  return (
    <div className={`column-chooser ${isOpen ? 'open' : ''}`}>
      <button onClick={() => setIsOpen(true)}>Columns</button>
      {isOpen && (
        <div className="column-chooser-popup">
          <div className="column-chooser-header">
            <h3>Select Columns</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="column-chooser-body">
            {allColumns.map(column => (
              <label key={column.id}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column.id!)}
                  onChange={(e) => handleToggleColumn(column.id!, e.target.checked)}
                />
                {column.Header}
              </label>
            ))}
          </div>
          <div className="column-chooser-footer">
            <button onClick={handleApply}>Apply</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(ColumnChooser);