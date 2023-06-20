//export function CustomDateFormat(this: any) {
//  return this.duration.asSeconds() >= 86400 ? "w [Weeks], d [Days]" : this.duration.asSeconds() >= 60 ? "H [Hours], m [Minutes]" : "s [Seconds]";
//}

import moment from 'moment';

export function CustomDateFormat(this: any) {
  const duration = moment.duration(this.duration);

  if (duration.asSeconds() < 60) {
    return "s [Seconds]";
  } else if (duration.asMinutes() < 10) {
    return "m [Minutes], s [Seconds]";
  } else if (duration.asMinutes() < 60) {
    return "m [Minutes]";
  } else if (duration.asHours() < 6) {
    return "H [Hours], m [Minutes]";
  } else if (duration.asHours() < 24) {
    return "H [Hours]";
  } else if (duration.asDays() < 7) {
    return "d [Days]";
  } else if (duration.asDays() < 30) {
    return "w [Weeks]";
  } else {
    return "M [Months]";
  }
}