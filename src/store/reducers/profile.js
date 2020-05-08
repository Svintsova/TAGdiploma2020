

const initialState = {
    user: null,
    loading: false,
    IsLoaded: false
}

export default function profileReducer (state = initialState, action) {
    switch (action.type) {
        case 'USER_UPDATE':
            return {
                user: {
                    id: action.payload.id,
                    token: action.payload.token,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    email: action.payload.email,
                    password: action.payload.password,
                    root: 'admin'
                },
                loading: false,
                IsLoaded: true
            }
        case 'USER_LOGOUT':
            return {
                user: null,
                loading: false,
                IsLoaded: true
            }
        case 'SET_LOADED':
            return {
                user: state.user,
                loading: state.loading,
                IsLoaded: true
            }
        default:
            return state

    }
}

