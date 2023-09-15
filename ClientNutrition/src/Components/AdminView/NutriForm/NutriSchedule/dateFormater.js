const formatoCalendar = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  return arr.reduce((formatted, current) => {
    formatted.push([current, current + 1]);
    return formatted;
  }, []);
}

export default formatoCalendar;