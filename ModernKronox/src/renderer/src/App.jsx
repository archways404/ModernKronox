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
    <div className="App bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">ModernKronox</h1>
      <div className="flex space-x-4 mb-6">
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
      </div>
      <div className="w-full max-w-4xl">
        <ScheduleTable data={tableData} />
      </div>
    </div>
  )

}

export default App
