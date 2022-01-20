import {
    ADD_COMMENT,
    CREATING_POST,
    POST_CREATED,
    SET_POST,
} from './actionTypes';
import axios from 'axios';
import { setMessage } from './message';

export const addPost = post => {
    return (dispatch, getState) => {
        dispatch(creatingPost());
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-1b7dd.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(resp => {
                post.image = resp.data.imageURL;
                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }));
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                    });
            })
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => console.log(err))
            .then(res => {
                const comments = res.data.comments || [];
                comments.push(payload.comment);
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(fetchPosts());
                    });
            })
    }
}

export const setPosts = payload => {
    return {
        type: SET_POST,
        payload
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res => {
                const rawPosts = res.data;
                const posts = [];
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key,
                    })
                }
                dispatch(setPosts(posts.reverse()));
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST,
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED,
    }
}