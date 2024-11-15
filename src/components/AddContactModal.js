import React, { useState, useEffect } from "react";
import useCreateContact from "../hooks/useCreateContact";
import useUpdateContact from "../hooks/useUpdateContact";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Snackbar, Alert } from "@mui/material";

const AddContactModal = ({ onClose, onSave, contactToEdit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const { createContact, loading, error, response } = useCreateContact();
  const { updateContact, updateLoading, updateError, updatedResponse } =
    useUpdateContact();

  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.firstName || "");
      setLastName(contactToEdit.lastName || "");
      setEmail(contactToEdit.email || "");
      setPhone(contactToEdit.phone || "");
      setCompany(contactToEdit.company || "");
      setJobTitle(contactToEdit.jobTitle || "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setJobTitle("");
    }
  }, [contactToEdit]);

  const handleSave = async () => {
    if (!firstName || !lastName || !email || !phone) {
      setErrorMessage("Please fill in all required fields.");
      setShowError(true);
      return;
    }

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    };
    try {
      if (contactToEdit) {
        await updateContact(contactToEdit["_id"], contactData);
      } else {
        await createContact(contactData);
      }
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  useEffect(() => {
    if (response) {
      onSave(response);
      onClose();
    }
  }, [response, onClose, onSave]);

  useEffect(() => {
    if (updatedResponse) {
      onSave(updatedResponse);
      onClose();
    }
  }, [updatedResponse, onClose, onSave]);

  return (
    <div className="modal">
      <h2>{contactToEdit ? "Edit Contact" : "Add Contact"}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Person2OutlinedIcon />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Person2OutlinedIcon />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <EmailOutlinedIcon />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <LocalPhoneOutlinedIcon />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <BusinessCenterOutlinedIcon />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <WorkOutlineOutlinedIcon />
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      {(loading || updateLoading) && <p>Saving...</p>}
      {(error || updateError) && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <p style={{ color: "green" }}>Contact saved successfully!</p>
      )}
      {updatedResponse && (
        <p style={{ color: "green" }}>Contact updated successfully!</p>
      )}
      <button onClick={handleSave} disabled={loading}>
        {contactToEdit ? "Update" : "Save"}
      </button>
      <button onClick={onClose}>Cancel</button>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddContactModal;
