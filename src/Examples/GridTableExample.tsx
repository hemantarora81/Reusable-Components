import React, { useState, useMemo } from 'react';
import GridTableComponent, { Column } from '../commonComponents/GridComponent';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

const GridTableExample = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', department: 'Engineering', position: 'Frontend Developer', salary: 85000, hireDate: '2020-05-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', salary: 95000, hireDate: '2019-03-10', status: 'Active' },
    { id: 3, name: 'Mike Johnson', department: 'Engineering', position: 'Backend Developer', salary: 90000, hireDate: '2021-01-20', status: 'Active' },
    { id: 4, name: 'Sarah Williams', department: 'HR', position: 'HR Specialist', salary: 75000, hireDate: '2022-06-05', status: 'On Leave' },
    { id: 5, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 6, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 7, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 8, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 9, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 10, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id:11, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 12, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 13, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 14, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 15, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 16, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 17, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 18, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 19, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 20, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 21, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 22, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 23, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 24, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 25, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 26, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 27, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 28, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 29, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 30, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 31, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 32, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 33, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 34, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 35, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 36, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 37, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 38, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 39, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
    { id: 40, name: 'David Brown', department: 'Sales', position: 'Sales Executive', salary: 80000, hireDate: '2018-11-30', status: 'Terminated' },
  ]);

  const columns: Column<Employee>[] = useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      width: 80,
      textAlign: "center",
      sortable: true,
      darkBgColor: "rgb(31 41 55)" // Custom dark mode background
    },
    {
      Header: "Name",
      accessor: "name",
      filter: "text",
      isTooltip: true,
      resizable: true,
      darkTextColor: "rgb(209 213 219)" // Custom dark mode text
    },
    {
      Header: "Department",
      accessor: "department",
      filter: "multiSelect",
      width: 150
    },
    {
      Header: "Position",
      accessor: "position",
      filter: "text",
      width: 200
    },
    {
      Header: "Salary",
      accessor: "salary",
      textAlign: "right",
      Cell: ({ value }) => `$${value.toLocaleString()}`,
      width: 120
    },
    {
      Header: "Hire Date",
      accessor: "hireDate",
      width: 120,
      Cell: ({ value }) => new Date(value).toLocaleDateString()
    },
    {
      Header: "Status",
      accessor: "status",
      filter: "multiSelect",
      width: 120,
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
      darkCellClassName: "dark:text-white" // Custom dark mode cell class
    }
  ], []);

  return (
    <div className={`p-6 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Grid Table Example</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <GridTableComponent<Employee>
            data={employees}
            columns={columns}
            darkMode={darkMode}
            columnChooser={true}
            reorderable={true}
            resizable={true}
            filterable={true}
            sortable={true}
            virtualized={true}
            virtualScrollHeight={600}
            rowClassName={(row, index) => 
              row.status === 'Terminated' ? 'line-through opacity-70' : ''
            }
            emptyState={
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No employees found</p>
                <button 
                  className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={() => setEmployees([...employees])} // Example refresh action
                >
                  Refresh Data
                </button>
              </div>
            }
          />
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Tip: Drag column headers to reorder, hover to resize, and click filter icons to filter data.</p>
        </div>
      </div>
    </div>
  );
};

export default GridTableExample;