import { apiPostSignUp } from "../api/apis.js";
import { showMessage, isEmptyField } from "../all.js";

// 註冊按鈕 click 觸發事件
async function signUp (userInfo, nickname) {
    try {
        const { email, password } = userInfo;
        isEmptyField(email, password);

        const newUserInfo = {
            ...userInfo,
            nickname
        };

        await apiPostSignUp(newUserInfo)
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
    signUp(userInfo, "admin");
})