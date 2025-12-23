// Import user icon
import { IoPerson } from "react-icons/io5";

// Import edit and delete icons
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

// ContactBar component displays a single contact
// contact  → contact data (name, email, id)
// onEdit   → function to edit the contact
// onDelete → function to delete the contact
const ContactBar = ({ contact, onEdit, onDelete }) => {
  return (
    // Main container for contact card
    <div className="bg-black text-white p-4 flex justify-between w-96 rounded">
      
      {/* Left section: user icon and contact details */}
      <div className="flex gap-3 items-center">
        
        {/* User icon */}
        <IoPerson />

        {/* Contact name and email */}
        <div>
          <p>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
      </div>

      {/* Right section: edit and delete actions */}
      <div className="flex gap-3">
        
        {/* Edit icon triggers edit functionality */}
        <FaRegEdit
          className="cursor-pointer"
          onClick={onEdit}
        />

        {/* Delete icon removes the contact */}
        <FaRegTrashAlt
          className="cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default ContactBar;
