import axios from "axios";
import { useState } from "react";

const useCreateContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const createContact = async (contactData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/contacts/",
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(() => res?.data?.data?.newContact);
      setError(null);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { createContact, loading, error, response };
};

export default useCreateContact;
