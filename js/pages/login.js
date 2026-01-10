// Hàm chuyển đổi giữa Tab Đăng nhập và Đăng ký
function switchTab(tabName) {
    // 1. Xử lý nút Tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Tìm nút có onclick chứa tabName để active (Mẹo nhỏ)
    event.target.classList.add('active'); // Cách đơn giản nhất khi click
    
    // Nếu gọi hàm từ code (không qua click), ta cần tìm nút tương ứng (Code backup)
    if (!event.target.classList.contains('tab-btn')) {
        let index = tabName === 'login' ? 0 : 1;
        document.querySelectorAll('.tab-btn')[index].classList.add('active');
    }

    // 2. Xử lý Form
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    if (tabName === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
    }
}

// Hàm hiện/ẩn mật khẩu (Click vào con mắt)
function togglePass(inputId) {
    var input = document.getElementById(inputId);
    var icon = input.nextElementSibling; // Icon nằm ngay sau input

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}