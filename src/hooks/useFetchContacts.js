import { useState } from "react";
import axios from "axios";

export default function useFetchContacts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://localhost:3001/api/v1/contacts/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(() => res?.data?.data);
      setError(null);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { fetchContacts, loading, error, response };
}
