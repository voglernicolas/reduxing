import jsonPlaceholder from '../jsonPlaceholder'
import _ from 'lodash'


export const fetchPostsAndUser = () => async (dispatch, getState) => {    
    await dispatch(fetchPosts())
    
    const userIds = _.uniq(_.map(getState().posts, 'userId' ))
    userIds.forEach(id => dispatch(fetchUser(id)))
}


export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts')

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({ type: 'FETCH_USER', payload: response.data })
}



/* Usamos memoize para que las request a la API sea solo 1 por cada ID 
(ya que se llama 5 cada 1 id cada vez), un efecto negativo de usar esto
es que cuando la API que hacemos request se actualiza, memoize no lo hara
*/
/*
export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async ( id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({ type: 'FETCH_USER', payload: response.data })
})
*/



/*
export const fetchPosts = () => {

    return function (dispatch, getState) {
        const promise = jsonPlaceholder.get(/posts)
        


        dispatch({ type: 'FETCH_POSTS', payload: })
    }
*/


