import axios from "axios";
import { useState } from "react";

const useDeleteContact = () => {
  const [deletedLoading, setDeletedLoading] = useState(false);
  const [deletedError, setDeletedError] = useState(null);

  const deleteContact = async (id) => {
    setDeletedLoading(true);
    setDeletedError(null);

    try {
      await axios.delete(`http://localhost:3001/api/v1/contacts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeletedError(null);
    } catch (err) {
      setDeletedError("An error occurred");
    } finally {
      setDeletedLoading(false);
    }
  };

  return { deleteCurrentContact: deleteContact, deletedLoading, deletedError };
};

export default useDeleteContact;
