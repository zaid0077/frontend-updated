const loggedReducer = (state = '', action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return {
                token: action.payload.token,
                user: action.payload.user
            }
        default:
            return false
    }
}

export default loggedReducer