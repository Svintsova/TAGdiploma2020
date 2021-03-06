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
                    is_admin: action.payload.is_admin
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
        case 'PROFILE_UPDATE':
            return {
                user: {
                    id: state.user.id,
                    token: state.user.token,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    email: state.user.email,
                    is_admin: state.user.is_admin
                },
                loading: false,
                IsLoaded: true
            }
        case "CHANGE_ADMIN":
            return {
                user: {
                    id: state.user.id,
                    token: state.user.token,
                    name: state.user.name,
                    surname: state.user.surname,
                    email: state.user.email,
                    is_admin: action.payload.is_admin
                },
                loading: false,
                IsLoaded: true
            }
        default:
            return state

    }
}

