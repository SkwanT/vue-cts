
export default {

  loadData: (state) => {

    fetch('./api/contacts', {
      method: 'get',
      redirect: 'follow'
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        state.contacts = [...jsonData];
        state.filteredContacts = [...jsonData];
        state.load = false;

      })
      .catch(error => {
        console.log('error', error);
        state.load = false;
        return false;
      });

    return true;
  },

  getMaxID: (state) => {
    return Math.max.apply(null, state.contacts.map(item => item.id)) | 0;
  },

  filterContacts: (state) => (searchItem, tag) => {

    searchItem === undefined ? searchItem = '' : searchItem;
    searchItem = searchItem.replace(/[+*/&%#?<>.\\]/g, '');

    if (!searchItem) {
      state.filteredContacts = [...state.contacts];
      return state.filteredContacts;
    }


    if (tag) {
      state.filteredContacts = state.filteredContacts.filter(item => item.tagName?.toLowerCase() === searchItem.toLowerCase());
      return state.filteredContacts;
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`./api/contacts/search/${searchItem}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        state.filteredContacts = [...jsonData];
      })
      .catch(error => console.log('error', error));

    return state;

  },

  orderContactsBy: (state) => (value, order) => {

    let factor = order === 'desc' ? -1 : 1

    if (value === 'id') {
      return state.filteredContacts.sort((a, b) => ((a['id'] - b['id']) * factor));
    }

    return state.filteredContacts.sort((a, b) => {
      if (a === null) a = '';
      if (b === null) b = '';
      if ('' + a[value] < '' + b[value]) return -1 * factor
      return ('' + a[value] > '' + b[value]) ? (1 * factor) : 0
    })

  }
}


