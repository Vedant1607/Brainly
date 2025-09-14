import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            "Authorization":localStorage.getItem("token")
          }
        });
        setContents(await response.data.data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchContent();
  }, []);

  return contents;
}
