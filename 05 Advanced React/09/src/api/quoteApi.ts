import api from "./api";

export const fetchTopQuotes = () => api.get("top_quotes").then((res) => res.data.quotes);
