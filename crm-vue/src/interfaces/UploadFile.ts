export interface UploadFile {
  id: string | number
  name: string
  status: 'pending' | 'uploading' | 'error' | 'finished' | 'removed'
  percentage: number
  file: File
}
