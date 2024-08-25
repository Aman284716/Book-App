import React from 'react';
import './index.css'; // Import CSS for styling
import BookList from './BookList'; // Import the BookList component

function App() {
    return (
        <div className="App">
            <header className=" p-5 text-2xl text-center bg-white shadow-md font-extralight font-bold">
                <h1>Book Management</h1>
            </header>
            <main>
                <BookList />
            </main>
        </div>
    );
}

export default App;
