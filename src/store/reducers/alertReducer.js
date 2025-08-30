import { SHOW_ALERT, CLEAR_ALERT } from '../actionTypes';

const initialState = {
    show: false,
    message: '',
    variant: 'danger',
    timeoutId: null
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
            return {
                show: true,
                message: action.payload.message,
                variant: action.payload.variant,
                timeoutId: action.payload.timeoutId
            };

        case CLEAR_ALERT:
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
            return {
                ...state,
                show: false
            };

        default:
        return state;
    }
};

export default alertReducer;