export function formatDate(date) {
  // Array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month, day, and year from the Date object
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ' year' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' month' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' day' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hour' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minute' + (interval === 1 ? '' : 's') + ' ago';
  }
  return 'just now';
}
