export default {
    appendContact: (state, contact) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (!contact.phoneNumbers)
            contact.phoneNumbers = [];

        if (!contact.emails)
            contact.emails = [];

        var raw = JSON.stringify(contact);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("../api/contacts", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                contact.id = jsonData.id;
                state.contacts.push(contact);
                state.filteredContacts = [...state.contacts];
            })
            .catch(error => console.log('error', error));

    },
    removeContact: (state, id) => {

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`../api/contacts/${id}`, requestOptions)
            .then(response => response.text())
            .then(() => {
                let index = state.contacts.findIndex(x => x.id === id);
                state.contacts.splice(index, 1);
                state.filteredContacts = [...state.contacts];
            })
            .catch(error => console.log('error', error));

    },
    alterContact: (state, contact) => {


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(contact);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`../api/contacts/${contact.id}`, requestOptions)
            .then(response => response.text())
            .then(() => {
                let index = state.contacts.findIndex(x => x.id === contact.id);
                state.contacts[index] = contact;
            })
            .catch(error => console.log('error', error));


    }
}