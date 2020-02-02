import moment from 'moment';

const relativeTime = date => {
  const duration = moment.duration(moment().diff(date));
  const days = duration.asDays();

  // relativeTime is set for 7 days minimum
  const dateFormated = days > 6.9 ? moment(date).format('MMM DD, YYYY') : moment(date, 'YYYY-MM-DD hh:mm:ss').fromNow()
  return dateFormated;
}

export { relativeTime };
