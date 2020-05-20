

const initialState = {
    item: null,
    isChosen: false,
}

export default function rentItemReducer (state = initialState, action) {
    switch (action.type) {
        case 'RENT_STATUS_UPDATE':
            return {
                item: state.item,
                isChosen: action.payload.isChosen
            }
        case 'SELECT_ITEM':
            return {
                item: action.payload.item,
                isChosen: state.isChosen
            }
        default:
            return state

    }
}

