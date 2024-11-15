import axios from "axios";
import { useState } from "react";

const useUpdateContact = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updatedResponse, setUpdatedResponse] = useState(null);

  const updateContact = async (id, contactData) => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/contacts/${id}`,
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res?.data?.body);
      setUpdatedResponse(() => res?.data?.body);
      setUpdateError(null);
    } catch (err) {
      setUpdateError("An error occurred");
    } finally {
      setUpdateLoading(false);
    }
  };

  return { updateContact, updateLoading, updateError, updatedResponse };
};

export default useUpdateContact;
