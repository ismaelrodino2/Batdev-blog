export const sleep = (ms: number | undefined) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
