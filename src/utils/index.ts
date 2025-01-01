import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileName(fileName: string): string {
  const extensionIndex = fileName.lastIndexOf('.')
  const baseName = fileName.substring(0, extensionIndex)
  const extension = fileName.substring(extensionIndex)

  return (
    baseName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_') + extension
  )
}

export function convertUuidToNumber(uuid: string) {
  const numbers = uuid.replace(/[^0-9]/g, '').slice(0, 8)
  return parseInt(numbers)
}
