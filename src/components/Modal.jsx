// React hooks for managing component state and side effects
import { useEffect, useState } from "react";

// Modal component receives props from App.jsx
// isOpen      → controls whether modal is visible
// onClose     → function to close modal
// onSubmit    → function to add or update contact in Firestore
// editContact → contact object when editing, null when adding
const Modal = ({ isOpen, onClose, onSubmit, editContact }) => {

  // State to store name input value
  const [name, setName] = useState("");

  // State to store email input value
  const [email, setEmail] = useState("");

  // Effect runs whenever editContact changes
  // If editing, pre-fill the form with existing contact data
  // If adding, clear the form inputs
  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editContact]);

  // If modal is not open, do not render anything
  // This prevents unnecessary DOM rendering
  if (!isOpen) return null;

  return (
    // Modal background overlay
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      
      {/* Modal container */}
      <div className="bg-white p-6 rounded-lg w-96">

        {/* Dynamic title based on add or edit mode */}
        <h2 className="text-xl font-bold mb-4">
          {editContact ? "Edit Contact" : "Add Contact"}
        </h2>

        {/* Name input field */}
        <input
          type="text"
          placeholder="Name"
          value={name}                          // controlled input
          onChange={(e) => setName(e.target.value)} // update state on change
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}                          // controlled input
          onChange={(e) => setEmail(e.target.value)} // update state on change
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        {/* Action buttons */}
        <div className="flex justify-between">

          {/* Cancel button closes the modal without saving */}
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          {/* Add or Update button sends data to parent component */}
          <button
            onClick={() => onSubmit({ name, email })}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editContact ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
