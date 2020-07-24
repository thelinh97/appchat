import{ userConstants } from '../actions/constants';
const initState = {
    users: [],
    conversations: [],
    uploadAvatarStatus: '',
}

export default (state = initState, action ) => {

    switch(action.type){
        case `${userConstants.GET_REALTIME_USER}_REQUEST` :
            break;
        case `${userConstants.GET_REALTIME_USER}_SUCCESS` :
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case userConstants.GET_REALTIME_MESSAGE:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
        case `${userConstants.GET_REALTIME_MESSAGE}_FAILURE`:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
        case `${userConstants.UPLOAD_AVATAR_USER}_REQUEST`:
            state = {
                ...state,
                uploadAvatarStatus: action.payload.mess
            }
            break;
        case `${userConstants.UPLOAD_AVATAR_USER}_SUCCESS`:
            state = {
                ...state,
                uploadAvatarStatus: ''
            }
            break;
        case `${userConstants.UPLOAD_AVATAR_USER}_FAILURE`:
            state = {
                ...state,
                uploadAvatarStatus: action.payload.mess
            }
            break;
        case `${userConstants.POST_USER}_REQUEST`:
            state = {
                ...state,
                isLoading: action.payload.isLoading
            }
            break;
        case `${userConstants.POST_USER}_SUCCESS`:
            state = {
                ...state,
                isLoading: action.payload.isLoading
            }
            break;
        default:
            break;
    }
    return state;
}