import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { logDOM } from "@testing-library/react";

function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);
    const addContactHandler = (contact) => {
        setContacts([...contacts, {id: uuidv4(), ...contact}]);
    };

    useEffect(() => {
        const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (retrieveContacts) setContacts(retrieveContacts);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => console.log(contacts));

    return (
        <div className="ui container">
            <Header />
            <AddContact addContactHandler={addContactHandler} />
            <ContactList contacts={contacts} />
        </div>
    );
}

export default App;
