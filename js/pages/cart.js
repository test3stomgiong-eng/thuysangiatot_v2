/* ==============================================
   FILE: js/pages/cart.js
   Xử lý logic trang giỏ hàng
   ============================================== */

// 1. Tăng giảm số lượng
function changeCartQty(btn, change) {
    // Tìm ô input bên cạnh nút bấm
    var input = btn.parentElement.querySelector('input');
    var currentVal = parseInt(input.value);
    
    var newVal = currentVal + change;
    if (newVal < 1) newVal = 1;
    
    input.value = newVal;
    
    // (Thực tế: Cần gọi API cập nhật giỏ hàng và tính lại tổng tiền)
    // Ở đây chỉ demo giao diện
}

// 2. Xóa sản phẩm
function removeCartItem(btn) {
    if(confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        // Tìm thẻ cha .cart-item và xóa nó
        var item = btn.closest('.cart-item');
        item.remove();
        
        // Cập nhật lại số lượng trên tiêu đề (Demo)
        var countSpan = document.getElementById('cartCount');
        if(countSpan) countSpan.innerText = "(0)";
        
        // (Thực tế: Cần tính lại tổng tiền)
    }
}