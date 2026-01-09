/* ==============================================
   FILE: js/pages/detail.js
   Xử lý logic riêng cho trang Chi tiết sản phẩm
   ============================================== */

/* --- 1. XỬ LÝ ẢNH SẢN PHẨM (GALLERY) --- */
window.changeImage = function (element, srcUrl) {
    // Tìm thẻ ảnh lớn
    var mainImg = document.getElementById("mainImg");

    if (mainImg) {
        // Đổi đường dẫn ảnh lớn
        mainImg.src = srcUrl;

        // --- Xử lý viền xanh (active) ---
        // 1. Tìm tất cả ảnh nhỏ và bỏ class active cũ đi
        var thumbs = document.querySelectorAll(".thumb-item");
        thumbs.forEach(function (el) {
            el.classList.remove("active");
        });

        // 2. Thêm class active vào ảnh vừa bấm
        if (element) {
            element.classList.add("active");
        }
    } else {
        console.error("Lỗi: Không tìm thấy ảnh có id='mainImg'");
    }
};

/* --- 2. XỬ LÝ TABS NỘI DUNG (Thành phần, Công dụng...) --- */
window.openTab = function (evt, tabName) {
    // 1. Ẩn tất cả nội dung tab đang hiện
    var tabPanes = document.querySelectorAll(".tab-pane");
    tabPanes.forEach(function (el) {
        el.style.display = "none";
    });

    // 2. Bỏ trạng thái active ở tất cả các nút bấm
    var tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(function (btn) {
        btn.classList.remove("active");
    });

    // 3. Hiện nội dung tab được chọn
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        // Hiệu ứng fade in nhẹ
        selectedTab.style.opacity = 0;
        setTimeout(function() { selectedTab.style.opacity = 1; }, 50);
    }

    // 4. Active nút vừa bấm (đổi màu chữ)
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
};

/* --- 3. XỬ LÝ SỐ LƯỢNG (Đồng bộ cả PC và Mobile) --- */
window.updateQty = function (change) {
    // Lấy cả 2 ô input (trên trang PC và trên Popup Mobile)
    var inputPC = document.getElementById("qtyInput");
    var inputMobile = document.getElementById("qtyInputMobile");

    // Lấy giá trị hiện tại (ưu tiên lấy từ PC nếu có, ko thì lấy Mobile)
    var currentVal = 1;
    if (inputPC) currentVal = parseInt(inputPC.value);
    else if (inputMobile) currentVal = parseInt(inputMobile.value);

    // Kiểm tra lỗi NaN
    if (isNaN(currentVal)) currentVal = 1;

    // Tính toán giá trị mới
    var newVal = currentVal + change;
    if (newVal < 1) newVal = 1;

    // Cập nhật giá trị mới cho cả 2 ô input (nếu tồn tại trên trang)
    if (inputPC) inputPC.value = newVal;
    if (inputMobile) inputMobile.value = newVal;
};

/* --- 4. LOGIC POPUP MOBILE (BOTTOM SHEET) --- */
// Mở Popup
window.openMobileModal = function () {
    var modal = document.getElementById("mobileBuyModal");
    if (modal) modal.classList.add("open");
};

// Đóng Popup
window.closeMobileModal = function () {
    var modal = document.getElementById("mobileBuyModal");
    if (modal) modal.classList.remove("open");
};

/* --- 5. CHỌN PHÂN LOẠI (VARIANTS - 30ml/50ml...) --- */
window.selectVariant = function (element, priceText, typeName) {
    // 1. Xử lý giao diện nút bấm (Chuyển class active)
    // Tìm tất cả nút trong nhóm và bỏ active cũ
    var allBtns = element.parentElement.querySelectorAll(".var-btn");
    allBtns.forEach(function (btn) {
        btn.classList.remove("active");
    });

    // Thêm active cho nút vừa bấm
    element.classList.add("active");

    // 2. Cập nhật Giá tiền trên Popup
    var priceDisplay = document.getElementById("popupPrice");
    if (priceDisplay) {
        priceDisplay.innerText = priceText;

        // Hiệu ứng nháy nhẹ giá tiền cho khách chú ý
        priceDisplay.style.opacity = 0.5;
        setTimeout(function () {
            priceDisplay.style.opacity = 1;
        }, 200);
    }

    // 3. Cập nhật tên Phân loại
    var variantDisplay = document.getElementById("popupVariantName");
    if (variantDisplay) {
        variantDisplay.innerText = "Phân loại: " + typeName;
    }
};