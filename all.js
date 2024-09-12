const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

function showMessage (status = "warning", message = "") {
    Toast.fire({
        icon: status,
        title: message
    });
}

function isEmptyField (email, password) {
    if (!email || !password) {
        showMessage("warning", "用戶名稱和密碼不能為空");
        return;
    }
}

export { showMessage, isEmptyField }