const rawData = [
  'Fre',
  '26 Jan',
  '10:15-12:00',
  'Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time',
  'AG0834',
  'NI:A0411',
  '',
  'Optional: Introduction to Excel',
  '2023-11-22',
  'Mån',
  '29 Jan',
  '15:15-17:00',
  'Information Security, 7.5 credits Subject course,  50% day-time, Information Security, 7.5 credits Course as part of programme,  50% day-time',
  'AO4800',
  'OR:D131',
  '',
  'Lecture 3: Threat modeling and analysis',
  '2024-01-12',
  'Tis',
  '30 Jan',
  '10:15-12:00',
  'Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time',
  'AG0834',
  'NI:A0411',
  '',
  'Designing Experiments and Validity',
  '2023-11-22',
  'Ons',
  '31 Jan',
  '13:15-15:00',
  'Information Security, 7.5 credits Subject course,  50% day-time, Information Security, 7.5 credits Course as part of programme,  50% day-time',
  'CTANJA',
  'OR:D131',
  '',
  'Lecture 4: Malicious software and application attacks',
  '2024-01-12',
  '',
  '',
  '15:15-17:00',
  'Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time',
  'AG0834',
  'NI:A0411',
  '',
  'Lecture: Performance & issue based metrics',
  '2023-11-22',
  'Nancy',
  'Russo',
  '',
  'Kayode Sakariyah',
  'Adewole',
  '',
  'Andreas',
  'Jacobsson',
  '',
  'Classroom',
  '4',
  'Niagara',
  '46',
  'NI:A0411',
  'Large auditorium',
  '1',
  'Orkanen',
  '200',
  'OR:D131',
  'Information Security, 7.5 credits Subject course,  50% day-time',
  'Information Security, 7.5 credits Course as part of programme,  50% day-time',
  'Evaluation Methods for User Experience, 7.5 credits Course as part of programme,  50% day-time'
]

const validDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
const dateRegex = /^\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/
const timeRegex = /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/
const roomRegex = /^[A-Z]{2}:[A-Z0-9]+$/

const scheduleEntries = []
let currentEntry = { day: '', date: '', time: '', courseTitle: '', room: '' }
let lastDay = ''
let lastDate = ''
let lastProcessedType = ''

rawData.forEach((item) => {
  const trimmedItem = item.trim()

  // Process day
  if (validDays.includes(trimmedItem)) {
    if (currentEntry.day) {
      scheduleEntries.push(currentEntry)
    }
    lastDay = trimmedItem
    lastDate = ''
    currentEntry = { day: trimmedItem, date: '', time: '', courseTitle: '', room: '' }
    lastProcessedType = 'day'
  }
  // Process date
  else if (dateRegex.test(trimmedItem)) {
    lastDate = trimmedItem
    currentEntry.date = trimmedItem
    lastProcessedType = 'date'
  }
  // Process time
  else if (timeRegex.test(trimmedItem)) {
    if (currentEntry.time) {
      // If there's already a time for the current entry, push it and start a new entry
      scheduleEntries.push(currentEntry)
      currentEntry = { day: lastDay, date: lastDate, time: trimmedItem, courseTitle: '', room: '' }
    } else {
      currentEntry.time = trimmedItem
    }
    lastProcessedType = 'time'
  }
  // Process course title
  else if (lastProcessedType === 'time') {
    currentEntry.courseTitle = trimmedItem.split(',')[0].trim()
    lastProcessedType = 'courseTitle'
  }
  // Process room
  else if (lastProcessedType === 'courseTitle' && roomRegex.test(trimmedItem)) {
    currentEntry.room = trimmedItem
    lastProcessedType = 'room'
  }
})

// Check if there's an unprocessed entry after the loop
if (currentEntry.day && (currentEntry.date || currentEntry.time || currentEntry.courseTitle)) {
  scheduleEntries.push(currentEntry)
}

console.log(scheduleEntries)
