const APIROOT = "https://todolist-api.hexschool.io";

const apiUrls = {
    signUp: `${APIROOT}/users/sign_up`,
    signIn: `${APIROOT}/users/sign_in`,
    todo: `${APIROOT}/todos`
};

const axiosInstance = axios.create({
    baseURL: APIROOT
});

const setCookie = (token, exp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()) => {
    document.cookie = `hexschool=${token}; expires=${exp}; path=/`
    axiosInstance.defaults.headers.authorization = token;
}

const getCookie = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

const apiPostSignIn = async ({ email, password } = {}) => await axiosInstance.post(apiUrls.signIn, { email, password })
const apiPostSignUp = async ({ email, password, nickname } = {} = {}) => await axiosInstance.post(apiUrls.signUp, { email, password, nickname })
const apiPostAddTodo = async ({ content } = {}) => await axiosInstance.post(apiUrls.todo, { content })
const apiGetTodo = async () => await axiosInstance.get(apiUrls.todo)

export {
    apiPostSignIn, apiPostSignUp, apiPostAddTodo, apiGetTodo, setCookie, getCookie
}