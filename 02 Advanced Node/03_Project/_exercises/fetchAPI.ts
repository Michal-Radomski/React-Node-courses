() => {
  return fetch("/api/blogs", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "My title3",
      content: "My Content3",
    }),
  });
};

() => {
  return fetch("/api/blogs", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
