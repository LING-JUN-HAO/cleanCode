import { apiGetTodo, apiPostAddTodo, getCookie, setCookie } from "../api/apis.js";
import { showMessage } from "../all.js";


const todoListContainer = document.getElementById("todo-list");
let todoList = [];

// 確認是否存在 cookie
function hasCookie () {
    const token = getCookie()
    if (!token) {
        showMessage("warning", "尚未登入！請先登入");
        return;
    }
    setCookie(token);
}

// 渲染 todo
function renderTodo () {
    todoListContainer.innerHTML = todoList
        .map((todo) => `<li><b>${todo.content}</b></li>`)
        .join("");
}

// 處理取得 todo 資料及渲染流程
async function handleGetTodoList () {
    const getTodoListResponse = await apiGetTodo();
    todoList = getTodoListResponse.data.data;
    renderTodo();
}

// todo 新增項目按鈕 click 觸發事件
async function addTodo () {
    try {
        const todoInput = document.getElementById("todo-input").value;
        if (!todoInput) return;

        await apiPostAddTodo({ content: todoInput });
        await handleGetTodoList();
        document.getElementById("todo-input").value = '';
    } catch (error) {
        showMessage("warning", error.response?.data?.message || "發生未知錯誤");
    }
}

hasCookie()
handleGetTodoList()

const todoListAddButton = document.getElementById("todo-btn");
todoListAddButton.addEventListener("click", () => addTodo());