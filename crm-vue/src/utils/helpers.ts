/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'

// Used to generate a delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Used with api calls and logs the error
export const handleApi = async (
  promise: Promise<any>
): Promise<[any, Error | AxiosError | null]> => {
  try {
    await sleep(300)
    const data = await promise
    return [data, null]
  } catch (err: AxiosError | Error | any) {
    if (axios.isAxiosError(err)) {
      console.error('🚀 ~ file: helpers.ts ~ line 16 ~ err', err.response?.data)
      return [null, err.response?.data]
    } else {
      console.error('🚀 ~ file: helpers.ts ~ line 16 ~ err', err)
      return [null, err]
    }
  }
}

// Used with vuex actions
export const handleActions = async (promise: Promise<any>): Promise<[any, null | any]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (err: AxiosError | any | Error) {
    if (axios.isAxiosError(err)) {
      return [null, err.response?.data]
    } else {
      return [null, err]
    }
  }
}

export const sortByUpdatedAt = (a: any, b: any): number => {
  if (a.updated_at < b.updated_at) {
    return 1
  }
  if (a.updated_at > b.updated_at) {
    return -1
  }
  return 0
}
export const today = (): string => {
  const currentDate = new Date()
  let dd: number | string = currentDate.getDate()

  let mm: number | string = currentDate.getMonth() + 1
  const yyyy = currentDate.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  return `${yyyy}-${mm}-${dd}`
}

// Validate email
export const validEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
