export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGIN_ACTION_OUT = 'LOGIN_ACTION_OUT';

export function loginAction(subreddit) {
    return {
        type: LOGIN_ACTION,
        subreddit
    }
}

export function loginOutAction(subreddit) {
    return {
        type: LOGIN_ACTION_OUT,
        subreddit
    }
}