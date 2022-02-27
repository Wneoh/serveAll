const defaultState = {
    loggedIn: false,
    user: {},
    authMsg : ""
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                loggedIn: true,
                user: {...action.payload},
                authMsg : `Welcome ${action.payload.name}`
            }
        case "LOG_FAILED":
            return {
                loggedIn: false,
                user: {},
                authMsg : 'Wrong Password/email..'
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default userReducer