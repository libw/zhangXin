let initialState = {
    token: '',






}

export default function sign(state = initialState, action = {}) {

    switch (action.type) {

        case 'LOGIN':
            const {phone,mt4_live_id,status,address,email} = action.data

            state.token = true
            // state.MT4 = mt4_live_id
            return Object.assign({}, state, {})

        case 'MODIFYPWD':
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
