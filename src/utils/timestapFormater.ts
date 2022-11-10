import moment from 'moment'

const format = 'DD MMM YYYY HH:mm:ss [UTC]'

export const formatDate = (timestamp: number, formatType: string = format) =>
  moment.unix(timestamp).utc().format(formatType)

export const formatTimeLeft = (timestamp: number, formatType: string = format) =>
  moment(moment.unix(timestamp).utc().format(formatType)).fromNow()

export const formatTimeStamp = (timestamp: number) => {
  const from = moment.unix(timestamp).utc().format(format)
  const to = moment(moment.unix(timestamp).utc().format(format)).fromNow()
  return `${from} ${to}`
}
