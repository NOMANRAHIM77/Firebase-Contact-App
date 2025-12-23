// React hooks for managing state and side effects
import { useEffect, useState } from "react";

// Navbar component
import Navbar from "./components/Navbar";

// Icons for search and add contact
import { FaSearch, FaPlusCircle } from "react-icons/fa";

// Firestore functions for CRUD operations
import {
  collection,   // reference a Firestore collection
  getDocs,      // read documents
  addDoc,       // add new document
  deleteDoc,    // delete a document
  doc,          // reference a single document
  updateDoc,    // update a document
} from "firebase/firestore";

// Firestore database instance
import { db } from "./config/firebase";

// UI components
import ContactBar from "./components/ContactBar";
import Modal from "./components/Modal";

function App() {
  // State to store all contacts fetched from Firestore
  const [contacts, setContacts] = useState([]);

  // State to control modal open / close
  const [isOpen, setOpen] = useState(false);

  // State to store the contact being edited (null when adding)
  const [editContact, setEditContact] = useState(null);

  // State to store search input value
  const [search, setSearch] = useState("");

  // Reference to "contacts" collection in Firestore
  const contactsRef = collection(db, "contacts");

  // Function to fetch all contacts from Firestore
  const getContacts = async () => {
    const snapshot = await getDocs(contactsRef);

    // Convert Firestore documents into usable objects
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,       // document ID
      ...doc.data(),    // document fields (name, email)
    }));

    // Store contacts in state
    setContacts(list);
  };

  // Fetch contacts once when component mounts
  useEffect(() => {
    getContacts();
  }, []);

  // Open modal for adding a new contact
  const onOpen = () => {
    setEditContact(null); // ensure no contact is selected
    setOpen(true);
  };

  // Close modal and reset edit state
  const onClose = () => {
    setEditContact(null);
    setOpen(false);
  };

  // Function to add or update contact in Firestore
  const addOrUpdateContact = async (data) => {
    if (editContact) {
      // If editing, update existing document
      const docRef = doc(db, "contacts", editContact.id);
      await updateDoc(docRef, data);
    } else {
      // If adding, create new document
      await addDoc(contactsRef, data);
    }

    // Close modal and refresh contacts list
    onClose();
    getContacts();
  };

  // Function to delete contact from Firestore
  const deleteContact = async (id) => {
    await deleteDoc(doc(db, "contacts", id));
    getContacts(); // refresh list after deletion
  };

  // Filter contacts based on search input (name or email)
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Search bar and add button */}
      <div className="w-full flex justify-center items-center gap-3">
        <FaSearch className="text-xl" />

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="bg-transparent border-white rounded-md h-7 w-75 px-11"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add contact button */}
        <FaPlusCircle
          className="text-3xl cursor-pointer"
          onClick={onOpen}
        />
      </div>

      {/* Display contact list */}
      <div className="flex flex-col items-center p-8 gap-3">
        {filteredContacts.map((contact) => (
          <ContactBar
            key={contact.id}     // unique key for React
            contact={contact}   // contact data
            onEdit={() => {
              setEditContact(contact); // set selected contact
              setOpen(true);           // open modal
            }}
            onDelete={() => deleteContact(contact.id)} // delete contact
          />
        ))}
      </div>

      {/* Modal for Add / Edit Contact */}
      <Modal
        isOpen={isOpen}                 // controls visibility
        onClose={onClose}               // close modal
        onSubmit={addOrUpdateContact}   // add or update contact
        editContact={editContact}       // contact to edit
      />
    </>
  );
}

export default App;
