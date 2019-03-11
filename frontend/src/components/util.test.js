import { formatDay, formatTime, padZeroesToTime } from './util'

describe('formatDay', () => {
  it('returns Wed when param is 3', () => {
    // Arrange
    const expected = 'Wed'

    // Act
    const result = formatDay(3)

    // Assert
    expect(result).toEqual(expected)
  })

  it('returns an error when param is not valid', () => {
    // Arrange
    const expected = 'Day must be in range 0-6'

    // Act
    const result = formatDay('something-weird')

    // Assert
    expect(result).toEqual(expected)
  })
})

describe('formatTime', () => {
  it('returns 02:50 for valid time', () => {
    // Arrange
    const expected = '02:50'

    // Act
    const result = formatTime('2019-03-10T02:50:00+01:00')

    // Assert
    expect(result).toEqual(expected)
  })
})

describe('padZeroesToTime', () => {
  it('returns 02 for param of 2', () => {
    // Arrange
    const expected = '02'

    // Act
    const result = padZeroesToTime(2)

    // Assert
    expect(result).toEqual(expected)
  })

  it('returns 15 for param of 15', () => {
    // Arrange
    const expected = '15'

    // Act
    const result = padZeroesToTime(15)

    // Assert
    expect(result).toEqual(expected)
  })
})
