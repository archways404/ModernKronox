/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function ScheduleTable({ data }) {
  return (
    <table className="w-full text-left border-collapse border border-gray-700">
      <thead className="bg-gray-700">
        <tr>
          <th className="border border-gray-600 p-2">Day</th>
          <th className="border border-gray-600 p-2">Date</th>
          <th className="border border-gray-600 p-2">Time</th>
          <th className="border border-gray-600 p-2">Course Group</th>
          <th className="border border-gray-600 p-2">Location</th>
          <th className="border border-gray-600 p-2">Topic</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-700">
            <td className="border border-gray-700 p-2">{item.dag}</td>
            <td className="border border-gray-700 p-2">{item.datum}</td>
            <td className="border border-gray-700 p-2">{item.startSlut}</td>
            <td className="border border-gray-700 p-2">{item.kursGrp}</td>
            <td className="border border-gray-700 p-2">{item.lokal}</td>
            <td className="border border-gray-700 p-2">{item.moment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ScheduleTable
