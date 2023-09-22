import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import BookCard from "./components/BookCard";
import { Toast, toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  //! Variables
  const inputRef = useRef(null);
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleEditBook = (editItem) => {
    const cloneEditedItem = [...books];
    const editIndex = cloneEditedItem.findIndex(
      (item) => item.id === editItem.id
    );
    cloneEditedItem.splice(editIndex, 1, editItem);
    setBooks(cloneEditedItem);
    toast.info("Item Renamed !", { autoClose: 2000 });
  };

  //! Confirm Deleting
  const handleModal = (id) => {
    setShowConfirm(!showConfirm);
    //get Id
    setDeleteId(id);
  };

  //! isRead list of item
  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };
    //Clone array as to set new state(clonedCopy)
    //!splice("index of old item","how many item wil be deleted","new item" )
    const clonedBooks = [...books];
    const index = clonedBooks.findIndex((item) => item.id === book.id);
    clonedBooks.splice(index, 1, updatedBook);
    setBooks(clonedBooks);
  };

  //! Delete List of item
  const handleDelete = (id) => {
    const filtered = books.filter((item) => item.id !== id);
    setBooks(filtered);
    //toast error
    toast.error("Item Deleted", { autoClose: 2000 });
  };

  //! Add List of item
  const handleSubmit = (e) => {
    //Cancel refresh
    e.preventDefault();

    if (!bookName) {
      toast.warn("Enter an item name !", { autoClose: 2000 });
      //stop function
      return;
    }
    //Create object
    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //! Add new object with ...Spread to create edited array
    setBooks([...books, newBook]);
    //input Value reset
    setBookName("");
    //input focus
    inputRef.current.focus();
    //toast success
    toast.success("Item Added", { autoClose: 2000 });
  };

  //------------------------
  return (
    <div className="App ">
      {/* header */}
      <div className="bg-dark text-light px-5 py-2 fs-4 text-center">Books</div>
      {/* container */}
      <div className="container border mt-5 p-3">
        {/* form */}
        <form onSubmit={(e) => handleSubmit(e)} className="d-flex gap-3 mt-4">
          <input
            ref={inputRef}
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            type="text"
            className="form-control shadow"
          />
          <button className="btn btn-warning shadow">Add</button>
        </form>
        <div className="d-flex flex-column gap-3 py-5">
          {/* if list is empty */}
          {books.length === 0 && <h4>No item added</h4>}
          {/* if any item */}
          {books.length !== 0 &&
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                handleModal={handleModal}
                handleRead={handleRead}
                setShowEditModal={setShowEditModal}
                setEditItem={setEditItem}
              />
            ))}
        </div>
      </div>
      {/* Render Delete Modal */}
      {showConfirm && (
        <div className="confirm-modal ">
          <div className="modal-inner">
            <h5>Delete Item?</h5>
            <button
              className="btn btn-primary"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => (handleDelete(deleteId), setShowConfirm(false))}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {/* Render Edit Modal */}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
