/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ScheduleTable from './components/ScheduleTable'
const { ipcRenderer } = window.require('electron')

function App() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    ipcRenderer.on('action-result', (event, data) => {
      if (data !== 'error') {
        setTableData(data)
      } else {
        console.error('Error fetching table data')
      }
    })

    return () => {
      ipcRenderer.removeAllListeners('action-result')
    }
  }, [])

  const handleClick = () => {
    ipcRenderer.send('perform-action', 'fetch data')
  }

  return (
    <div className="App bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">ModernKronox</h1>
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Test 1
        </button>
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Test 2
        </button>
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Test 3
        </button>
        <ScheduleTable data={tableData} />
      </div>
    </div>
  )
}

export default App
