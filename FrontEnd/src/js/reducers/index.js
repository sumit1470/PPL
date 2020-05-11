const initialState = {
    post: [],
    categories: []
}

export function rootReducer(state = initialState, action){
    if(action.type === "POST_UPLOADED"){
        return Object.assign({},state,{
            post: [...action.payload]
        })
    }

    else if(action.type === 'CATEGORY_UPLOADED'){
        return Object.assign({},state,{
            categories: action.payload
        })
    }
    return state;
}