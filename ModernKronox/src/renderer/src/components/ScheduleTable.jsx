/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function ScheduleTable({ data }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Time</th>
          <th>Course Group</th>
          <th>Location</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.dag}</td>
            <td>{item.datum}</td>
            <td>{item.startSlut}</td>
            <td>{item.kursGrp}</td>
            <td>{item.lokal}</td>
            <td>{item.moment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ScheduleTable
