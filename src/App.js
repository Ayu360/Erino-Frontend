import React, { useEffect, useState } from "react";
import "./App.css";
import AddContactModal from "./components/AddContactModal";
import useFetchContacts from "./hooks/useFetchContacts";
import useDeleteContact from "./hooks/useDeleteContact";
import BasicTable from "./components/table";
import Header from "./components/Header";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const { fetchContacts, loading, error, response } = useFetchContacts();
  const { deleteCurrentContact, deletedLoading, deletedError } =
    useDeleteContact();

  useEffect(() => {
    try {
      fetchContacts();
    } catch (e) {
      console.log("Error occured while calling createContact");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setContacts(response.contacts);
    }
  }, [response]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = async (id) => {
    try {
      deleteCurrentContact(id);
      setContacts(contacts.filter((contact) => contact["_id"] !== id));
    } catch (e) {
      alert("Something went wrong while deleting. Please try again later!");
    }
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.email === updatedContact.email ? updatedContact : contact
      )
    );
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={`content-wrapper ${showModal ? "container-blur" : ""}`}>
          <header>
            <div className="projectName">
              <AccountCircleOutlinedIcon style={{ fontSize: 40 }} />
              <h2>Contact Management System</h2>
            </div>
            <button onClick={() => setShowModal(true)}>Add Contact</button>
          </header>
          {(!loading || !deletedLoading) &&
            (error === null || deletedError !== null) && (
            <BasicTable
              contacts={contacts}
              onDelete={deleteContact}
              onEdit={handleEdit}
            />
          )}
          {(loading || deletedLoading) && <div>Loading...</div>}
          {(!loading || !deletedLoading) &&
            (error !== null || deletedError !== null) && (
              <div>Something went wrong, please try again later... </div>
            )}
        </div>
        {showModal && (
          <AddContactModal
            onClose={() => {
              setShowModal(false);
              setEditingContact(null);
            }}
            onSave={editingContact ? updateContact : addContact}
            contactToEdit={editingContact}
          />
        )}
      </div>
    </>
  );
}

export default App;
