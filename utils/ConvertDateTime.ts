export const convertUtcToLocaleDatetime = (utcTime: any) => {
  const date = new Date(utcTime)
  const localTimeString = date.toLocaleTimeString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  return localTimeString
}
