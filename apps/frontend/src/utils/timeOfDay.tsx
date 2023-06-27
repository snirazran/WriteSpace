export const timeOfADay = () => {
  //get the local time
  let hour: string = '';
  const now = new Date();
  if (now.getHours() >= 5 && now.getHours() < 12) {
    hour = 'Morning';
  }
  if (now.getHours() >= 12 && now.getHours() < 17) {
    hour = 'Afternoon';
  }
  if (now.getHours() >= 17 && now.getHours() < 21) {
    hour = 'Evening';
  }
  if (now.getHours() >= 21 && now.getHours() <= 23) {
    hour = 'Night';
  }
  if (now.getHours() >= 0 && now.getHours() <= 4) {
    hour = 'Night';
  }

  return hour;
};
