export default {
    addContact : ({commit}, payload) => {
        commit('appendContact',payload)
    },
    deleteContact : ({commit}, id) => {
        commit('removeContact', id)
    },
    editContact : ({commit}, contact) => {
        commit('alterContact', contact)
    }
}