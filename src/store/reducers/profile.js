const initialState = {
    user: null,
    loading: 10,
    isLogining: false
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
                },
                loading: true,
                isLogining: true
            }
        default:
            return state

    }
}

