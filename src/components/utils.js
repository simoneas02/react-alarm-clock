export const formatDate = (date) => {
  const [day, month, year] = date.split("/");
  const dateFormated = `${year}-${month}-${day}`;
  
  return dateFormated;
}

export const getObjectDate = (date) => {
  const [year , month, day] = date.split("-");
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  const objectDate =
    {
      day: d,
      month: m,
      year: y
    };

  return objectDate;
}

export const formatToSeconds = (time) => {
  const [hour, minute, second] = time.split(':');
  const timeSeconds = (+hour) * 60 * 60 + (+minute) * 60 + (+second);
  
  return timeSeconds;
}

export const formatToString = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor(seconds % 3600 / 60);
  const second = Math.floor(seconds % 3600 % 60);
  const timeString = `${(hour < 10 ? "0" : "") + hour}:${(minute < 10 ? "0" : "") + minute}:${(second < 10 ? "0" : "") + second}`;
  
  return timeString;
}

export const secondsDay = 86400;
