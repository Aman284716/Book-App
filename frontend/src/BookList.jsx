import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            setBooks(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/books/${id}`);
            fetchBooks(); // Refresh the book list after deletion
        } catch (error) {
            console.error('Error deleting book', error);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingBook(null);
        setShowForm(true);
    };

    const handleSave = () => {
        fetchBooks(); // Refresh the book list after adding/updating
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div id="display-container" className="flex flex-row">
            <div id="list-container" className=" flex flex-col p-4 w-3/5">
                <h1 className="p-4 text-4xl font-semibold">Book List</h1>
                <button className="w-40 bg-green-400 p-2 rounded-lg text-white shadow-sm hover:bg-green-950" onClick={handleAddNew}>Add New Book</button>
                <div className="overflow-auto grid grid-cols-2 gap-5 w-full bg-white  rounded-xl p-5 my-5">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white
                            transition-transform duration-200 transform hover:scale-105
                        p-4 rounded-xl drop-shadow-md hover:">
                            <h3 className="text-xl font-semibold">{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>ISBN: {book.isbn}</p>
                            <br />
                            <div className="flex gap-1 items-stretch">
                                <button className="flex-1 bg-blue-500 p-2 hover:bg-blue-700 text-white rounded-xl" onClick={() => handleEdit(book)}>Edit</button>
                                <button className="flex-1 bg-red-500 p-2 hover:bg-red-700 text-white rounded-xl" onClick={() => handleDelete(book.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="  w-2/5">
                {/* <div className="bg-white m-5 drop-shadow-md rounded-xl p-5"> */}
                    {showForm && (
                        <BookForm
                            bookToEdit={editingBook}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    )}
                {/* </div> */}

            </div>
        </div >

    );
};

export default BookList;
