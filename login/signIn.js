import { apiPostSignIn, setCookie } from "../api/apis.js";
import { showMessage, isEmptyField } from "../all.js";

// 登入按鈕 click 觸發事件
async function handleUserSignIn ({ email, password }) {
    const userInfo = { email, password };
    const signInResponse = await apiPostSignIn(userInfo);
    const { token, exp } = signInResponse.data
    showMessage("success", "登入成功");
    setCookie(token, exp)
    return
}

async function signIn (userData) {
    try {
        const { email, password } = userData;
        isEmptyField(email, password);
        await handleUserSignIn({ email, password });
    } catch (error) {
        showMessage("warning", error.response?.data?.message || "發生未知錯誤");
    }
}

document.querySelector('#btn-submit').addEventListener('click', (event) => {
    event.preventDefault()
    const userInfo = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };
    signIn(userInfo)
})