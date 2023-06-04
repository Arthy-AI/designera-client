export function CustomDateFormat(this: any) {
  return this.duration.asSeconds() >= 86400 ? "w [Weeks], d [Days]" : this.duration.asSeconds() >= 60 ? "H [Hours], m [Minutes]" : "s [Seconds]";
}