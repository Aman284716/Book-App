import React, { useState, useEffect } from 'react';
import axios from 'axios';

//adding commit for git commit
const BookForm = ({ bookToEdit, onSave, onCancel }) => {
    const [book, setBook] = useState({ title: '', author: '', isbn: '' });

    useEffect(() => {
        if (bookToEdit) {
            setBook(bookToEdit);
        } else {
            setBook({ title: '', author: '', isbn: '' });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (book.id) {
                await axios.put(`http://localhost:8080/books/${book.id}`, book);
            } else {
                await axios.post('http://localhost:8080/books', book);
            }
            onSave();
        } catch (error) {
            console.error('Error saving book', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" bg-white m-5 p-5 rounded-xl
        mb-20
        drop-shadow-md flex flex-col gap-5">
            <h2>{book.id ? 'Update Book' : 'Add New Book'}</h2>
            <input
                className="p-2 rounded-xl border border-spacing-1 "
                type="text"
                name="title"
                placeholder="Title"
                value={book.title}
                onChange={handleChange}
                required
            />
            <input
                className="p-2 rounded-xl border border-spacing-1 "
                type="text"
                name="author"
                placeholder="Author"
                value={book.author}
                onChange={handleChange}
                required
            />
            <input
                className="p-2 rounded-xl border border-spacing-1 "
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={book.isbn}
                onChange={handleChange}
                required
            />
            <div className="flex justify-items-center gap-5">
                <button className="w-32 bg-green-500 p-2 rounded-xl drop-shadow text-white hover:bg-green-700" type="submit">{book.id ? 'Update Book' : 'Add Book'}</button>
                <button className="w-40 bg-red-500 p-2 rounded-xl drop-shadow text-white hover:bg-red-700" type="button" onClick={onCancel}>Cancel</button>
            </div>

        </form>
    );
};

export default BookForm;
