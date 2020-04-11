import React from "react";

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  return [data, loading];
};
