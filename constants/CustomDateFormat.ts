//export function CustomDateFormat(this: any) {
//  return this.duration.asSeconds() >= 86400 ? "w [Weeks], d [Days]" : this.duration.asSeconds() >= 60 ? "H [Hours], m [Minutes]" : "s [Seconds]";
//}

import moment from 'moment';

export function CustomDateFormat(this: { duration: number }) {
  const duration = moment.duration(this.duration);

  const formatTimeUnit = (value: number, singular: string, plural: string): string => {
    return value === 1 ? `1 [${singular}]` : `${value} [${plural}]`;
  };

  if (duration.asSeconds() < 60) {
    return formatTimeUnit(duration.seconds(), 'Second', 'Seconds');
  } else if (duration.asMinutes() < 60) {
    let formatted = formatTimeUnit(duration.minutes(), 'Minute', 'Minutes');
    if (duration.asMinutes() >= 10) {
      formatted += `, ${formatTimeUnit(duration.seconds(), 'Second', 'Seconds')}`;
    }
    return formatted;
  } else if (duration.asHours() < 24) {
    let formatted = formatTimeUnit(duration.hours(), 'Hour', 'Hours');
    if (duration.asHours() < 6) {
      formatted += `, ${formatTimeUnit(duration.minutes(), 'Minute', 'Minutes')}`;
    }
    return formatted;
  } else if (duration.asDays() < 30) {
    let formatted = formatTimeUnit(duration.days(), 'Day', 'Days');
    if (duration.asDays() < 7) {
      formatted += `, ${formatTimeUnit(duration.hours(), 'Hour', 'Hours')}`;
    }
    return formatted;
  } else {
    return formatTimeUnit(duration.months(), 'Month', 'Months');
  }
}