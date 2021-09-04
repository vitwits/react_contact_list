import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState( [] );
  const addContactHandler = (contact) => {
    setContacts( [...contacts, { id: uuidv4(), ...contact }] );
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter( contact => contact.id !== id );

    setContacts( newContactList );
  }

  useEffect( () => {
    const retrieveContacts = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) );
    if (retrieveContacts) setContacts( retrieveContacts );
  }, [] );

  useEffect( () => {
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( contacts ) );
  }, [contacts] );

  useEffect( () => console.log( contacts ) );

  return (
    <div className="ui main container">
      <Router>

        <Header />
        <Switch>
          <Route path="/"
                 exact
                 render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler}/>)}
                  />
          <Route path="/add"
                 render={(props) => (
                   <AddContact {...props} addContactHandler={addContactHandler} />
                 )} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
