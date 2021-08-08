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
    return newDate.getTime()
  }
}
