"use client";
import { useEffect, useState } from "react";

const ListLeagueTable = () => {
  const [tables, setTables] = useState({});

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then(setTables)
      .catch(console.error);
  }, []);

  const renderTable = (rows, name) => (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border-b text-left">Pos</th>
              <th className="px-4 py-2 border-b text-left">Team</th>
              <th className="px-4 py-2 border-b text-center">P</th>
              <th className="px-4 py-2 border-b text-center font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2 border-b text-left">{index + 1}</td>
                <td className="px-4 py-2 border-b text-left font-medium">{row.team}</td>
                <td className="px-4 py-2 border-b text-center">{row.played}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {Object.keys(tables).length === 0 ? (
        <p>Loading table...</p>
      ) : (
        <>
          {tables.div_one && renderTable(tables.div_one, "Division One")}
          {tables.div_two && renderTable(tables.div_two, "Division Two")}
        </>
      )}
    </div>
  );
};

export default ListLeagueTable;
