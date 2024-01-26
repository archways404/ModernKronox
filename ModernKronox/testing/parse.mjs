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

const scheduleEntries = []
let currentEntry = {}
let entryFieldIndex = 0 // To keep track of the current field in an entry

rawData.forEach((item) => {
  const trimmedItem = item.trim()

  if (validDays.includes(trimmedItem)) {
    if (currentEntry.day) {
      scheduleEntries.push(currentEntry)
    }
    currentEntry = { day: trimmedItem }
    entryFieldIndex = 1
  } else if (currentEntry.day) {
    switch (entryFieldIndex) {
      case 1:
        if (dateRegex.test(trimmedItem)) {
          currentEntry.date = trimmedItem
        } else {
          console.warn(`Invalid date format: ${trimmedItem}`)
        }
        break
      case 2:
        currentEntry.time = trimmedItem
        break
      // ... other cases ...
    }
    entryFieldIndex++
  }
})

if (currentEntry.day) {
  scheduleEntries.push(currentEntry)
}

console.log(scheduleEntries)
