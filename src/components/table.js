import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "./Pagination";

export default function BasicTable({ contacts, onDelete, onEdit }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  console.log(contacts);

  const sortedContacts = [...contacts].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === "asc"
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });

  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    if (contacts.length === 0) {
      return;
    }
    if (contacts.length === (currentPage - 1) * itemsPerPage) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }, [contacts, currentPage]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("firstName")}>
                First Name
              </TableCell>
              <TableCell onClick={() => handleSort("lastName")}>
                Last Name
              </TableCell>
              <TableCell onClick={() => handleSort("email")}>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell onClick={() => handleSort("company")}>
                Company
              </TableCell>
              <TableCell onClick={() => handleSort("jobTitle")}>
                Job Title
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact["_id"]}>
                <TableCell component="th" scope="row">
                  {contact?.firstName}
                </TableCell>
                <TableCell>{contact?.lastName}</TableCell>
                <TableCell>{contact?.email}</TableCell>
                <TableCell>{contact?.phone}</TableCell>
                <TableCell>{contact?.company}</TableCell>
                <TableCell>{contact?.jobTitle}</TableCell>
                {/* <TableCell>{contact?.JobTitle}</TableCell> */}
                <TableCell>
                  <button onClick={() => onEdit(contact)}>Edit</button>
                  <button onClick={() => onDelete(contact["_id"])}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        totalItems={contacts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
