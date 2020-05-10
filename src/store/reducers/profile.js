

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
                    id: state.profile.id,
                    token: state.profile.token,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    email: state.profile.email,
                    is_admin: state.profile.is_admin
                },
                loading: false,
                IsLoaded: true
            }
        default:
            return state

    }
}

