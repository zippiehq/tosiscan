import moment from 'moment'

export const formatTimeStamp = (timestamp: number) => {
  const format = 'DD MMM YYYY HH:mm:ss [UTC]'
  const from = moment.unix(timestamp).utc().format(format)
  const to = moment(moment.unix(timestamp).utc().format(format)).fromNow()
  return `${from} ${to}`
}
