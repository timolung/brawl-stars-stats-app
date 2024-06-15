// Parse string time "19 days and 12 hours" to total minutes
export const parseTimeStringToMinutes = (timeString) => {
    const regex = /(\d+)\s*days? and (\d+)\s*hours?/;
    const match = timeString.match(regex);
    if (match) {
      const days = parseInt(match[1], 10);
      const hours = parseInt(match[2], 10);
      return days * 24 * 60 + hours * 60;
    }
    return 0;
};