export class TimeStamp {
  protected date: string
  constructor(date: Date | string) {
    this.date = `${date}`
  }
  public getTimeStamp = (format = 'YYYY-MM-DD', separator = '-'): number => {
    let newDate = new Date()
    const flattenedDate: string[] = this.date.split(`${separator}`)
    if (format === 'YYYY-MM-DD') {
      newDate = new Date(
        parseInt(flattenedDate[0]),
        parseInt(flattenedDate[1]) - 1,
        parseInt(flattenedDate[2])
      )
    } else {
      // OPTION FOR THE DATE FORMAT : DD-MM-YYYY
      newDate = new Date(
        parseInt(flattenedDate[2]),
        parseInt(flattenedDate[1]) - 1,
        parseInt(flattenedDate[0])
      )
    }
    return newDate.getTime() / 1000.0
  }

  getDateFromTimestamp(timestamp: number): string {
    const milliSecond = timestamp * 1000
    const dateObject = new Date(milliSecond)
    const dateFlattened: string[] = dateObject.toLocaleDateString().split('/')
    const year = dateFlattened[2].toString()
    const day = dateFlattened[1].length > 1 ? dateFlattened[1].toString() : `0${dateFlattened[1]}`
    const month = dateFlattened[0].length > 1 ? dateFlattened[0].toString() : `0${dateFlattened[0]}`
    const fullDate = `${year}-${month}-${day}`
    return fullDate
  }
}
