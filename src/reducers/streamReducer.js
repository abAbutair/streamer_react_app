import {CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM} from "../actions/types";

const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // return {...state, ..._.mapKeys(action.payload, "id")};

            const oldState = {};
            for (const [key, value] of Object.entries(state)) {
                oldState[key] = value;
            }

            const newObject1 = {};
            action.payload.forEach(st => {
               newObject1[st.id] = st;
            });

            return {...oldState, ...newObject1}

        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};

        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};

        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};

        case DELETE_STREAM:
            // return _.omit(state, action.payload);

            const newObject2 = {};
            for (const [key, value] of Object.entries(state)) {
                if (!(key === action.payload)) {
                    newObject2[key] = value;
                }
            }
            return newObject2;

        default:
            return state;
    }
};

export default streamReducer;

// const xState = {
//     1: {
//         id: 1,
//         xy: "xy"
//     },
//     2: {
//         id: 2,
//         gh: "gh"
//     },
//     3: {
//         id: 3,
//         ty: "ty"
//     },
//     4: {
//         id: 4,
//         op: "op"
//     }
// }
// const newObject = {};
//
// for (const [key, value] of Object.entries(xState)) {
//     console.log(key, value)
//     if (!(key === "3")) {
//         newObject[key] = value;
//     }
// }
//
// console.log(newObject);