let initialState = {
    token: '',

}

export default function sign(state = initialState, action = {}) {

    switch (action.type) {

        case 'LOGIN':
            state.token = true
            return Object.assign({}, state, {})

        case 'REGISTER':
            return Object.assign({}, state, {})


        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}
