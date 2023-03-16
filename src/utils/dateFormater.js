function formatDate(d) {
  const date = new Date(d);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  };
  const formatter = new Intl.DateTimeFormat("pt-BR", options);
  return formatter.format(date);
}

export default formatDate;
