// Keep token in session storage
export const authenticate = (res, next) => {
    if(window != 'undefined'){
        sessionStorage.setItem('token', JSON.stringify(res.data.token));
        sessionStorage.setItem('user', JSON.stringify(res.data.username));
    }
    next();
};