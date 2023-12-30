import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1)
    return `${formattedNum}M`
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1)
    return `${formattedNum}K`
  } else {
    return num.toString()
  }
}

export const getTimeStamp = (createdAt: Date): string => {
  const currentDate = new Date()
  const timeDiff = currentDate.getTime() - createdAt.getTime()

  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`
  }
}

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  const joinedDate = `${month} ${year}`

  return joinedDate
}

interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

export const formUrlQuery = ({ key, params, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

interface RemoveUrlQueryParams {
  params: string
  keyToRemove: string[]
}

export const removeKeysFromQuery = ({ keyToRemove, params }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params)

  keyToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
