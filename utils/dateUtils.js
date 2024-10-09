export const formatDate = (date) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles'
    };
    const formattedDate = date.toLocaleString('en-US', options);
    const [datePart, timePart] = formattedDate.split(', ');
    return `${datePart} at ${timePart.toLowerCase()} PST`;
  };
  
  export const getInitialDates = () => {
    const now = new Date();
    return {
      current: formatDate(now),
      yesterday: formatDate(new Date(now.getTime() - 86400000)),
      monthAgo: formatDate(new Date(now.getTime() - 30 * 86400000))
    };
  };