import api from "./api";

export const fetchTopQuotes = (config = {}) => api.get("top_quotes", config).then((res) => res.data.quotes);

export const postQuote = (quote: ObjectI) => api.post("", quote);

export const resetQuotes = () => api.post("reset", {});

export const fetchQuotesByPage = (page: number) => api.get("", { params: { page } }).then((res) => res.data);

export const fetchQuotesByCursor = (cursor: number) => api.get("", { params: { cursor } }).then((res) => res.data);
