import React from "react";

const EditModal = ({
  setShowEditModal,
  setEditItem,
  editItem,
  handleEditBook,
}) => {
  //-----------
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Rename Item</h5>
        {/* Input */}
        <input
          value={editItem.title}
          type="text"
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4">
          {/* Button Cancel */}
          <button
            className="btn btn-primary"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          {/* Button Save */}
          <button
            className="btn btn-success"
            onClick={() => (handleEditBook(editItem), setShowEditModal(false))}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
