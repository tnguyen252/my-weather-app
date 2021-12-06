import { createStore } from 'redux';

function detailsReducer(state = { value: null }, action) {
    switch (action.type) {
        case 'updateDetails':
          return { value: action.payload }
        default:
          return state
    }
}

let store = createStore(detailsReducer)

export default store;