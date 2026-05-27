"use client";
import { useEffect, useState } from "react";

const Tables = () => {
  const [tables, setTables] = useState({});

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then(setTables)
      .catch(console.error);
  }, []);

  const renderTable = (rows, name) => (
    <div className="mb-10" style={{ marginBottom: '2.5rem' }}>
      <h2 className="text-2xl font-semibold mb-4" style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{name}</h2>
      <div className="overflow-x-auto" style={{ overflowX: 'auto' }}>
        <table className="min-w-full bg-white border border-gray-200" style={{ minWidth: '100%', backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
          <thead className="bg-gray-50" style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="px-4 py-2 border-b text-left" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Pos</th>
              <th className="px-4 py-2 border-b text-left" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Team</th>
              <th className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>P</th>
              <th className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>W</th>
              <th className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>L</th>
              <th className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>FW</th>
              <th className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>FL</th>
              <th className="px-4 py-2 border-b text-center font-bold" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center', fontWeight: 'bold' }}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                <td className="px-4 py-2 border-b text-left" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>{index + 1}</td>
                <td className="px-4 py-2 border-b text-left font-medium" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left', fontWeight: '500' }}>{row.team}</td>
                <td className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{row.played}</td>
                <td className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{row.won}</td>
                <td className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{row.lost}</td>
                <td className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{row.framesWon}</td>
                <td className="px-4 py-2 border-b text-center" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{row.framesLost}</td>
                <td className="px-4 py-2 border-b text-center font-bold" style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center', fontWeight: 'bold' }}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main className="p-4 max-w-5xl mx-auto" style={{ padding: '1rem', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <h1 className="text-3xl font-bold mb-6" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>League Tables</h1>
      {Object.keys(tables).length === 0 ? (
        <p>Loading tables...</p>
      ) : (
        <>
          {tables.div_one && renderTable(tables.div_one, "Division One")}
          {tables.div_two && renderTable(tables.div_two, "Division Two")}
        </>
      )}
    </main>
  );
};

export default Tables;
