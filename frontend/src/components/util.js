// @flow

/*
 * This function formats the day to 3 letter abbreviation.
 *
 * @param {number} day
 * @return {string} 3 letter abbreviation
 */
function formatDay(day: number): string {
  switch (day) {
    case 0:
      return 'Sun'
    case 1:
      return 'Mon'
    case 2:
      return 'Tue'
    case 3:
      return 'Wed'
    case 4:
      return 'Thu'
    case 5:
      return 'Fri'
    case 6:
      return 'Sat'
    default:
      return 'Day must be in range 0-6'
  }
}

/*
 * This function pads zeroes to a given value if needed.
 *
 * @param {number} value
 * @return {string} formatted string
 */
function padZeroesToTime(value: number): string {
  if (value < 10) {
    return `0${value}`
  }
  return `${value}`
}

/*
 * This function creates a Date object, calls padZerosToTime
 * function, and returns a formatted string.
 *
 * @param {string} date
 * @return {string} formatted time string
 */
function formatTime(date: string): string {
  const dateObj = new Date(date)
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return `${padZeroesToTime(hours)}:${padZeroesToTime(minutes)}`
}

/*
 * This function formats a given date to a more readable format.
 *
 * @param {Date} date
 * @return {string} formatted string
 */
function formatDayMonth(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.`
}

export { formatDay, formatTime, padZeroesToTime, formatDayMonth }
