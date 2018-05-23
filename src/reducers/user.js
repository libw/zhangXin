let initialState = {
    token: '',






}

export default function sign(state = initialState, action = {}) {

    switch (action.type) {

        case 'LOGIN':
            const {phone,mt4_live_id,status,address,email} = action.data
            state.userName = phone

            state.token = true
            state.status = status
            // state.MT4 = mt4_live_id
            return Object.assign({}, state, {})

        case 'MODIFYPWD':
            return Object.assign({}, state, {})

        case 'REGISTER':
            return Object.assign({}, state, {})

        case 'GET_BASEUSERMSG':
            const {balance,total_withdraw,total_position_profit} = action.data
            state.balance = balance
            state.netWorth = total_withdraw
            state.floating = total_position_profit
            return Object.assign({}, state, {})

        case 'GET_DETAILMSG':
            console.log("ttt",action.data)
            const {branch_name,bank_card,real_name,id_card,bank_name} = action.data
            state.branch = branch_name
            state.bankNo = bank_card
            state.realName = real_name
            state.id = id_card
            state.bankName = bank_name

            return Object.assign({}, state, {})


        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}
