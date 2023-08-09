import { useCallback, useState } from "react";

//   Lấy API từ hàm giả định để tải video thông tin phim ảnh
const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3${requestConfig.url}`
      );
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err);
    }
  }, []);
  return {
    error,
    sendRequest,
  };
};

export default useHttp;
