/* =========================================
   ADMIN SCRIPT - LOGIC CHUNG (FULL)
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. TỰ ĐỘNG ACTIVE MENU ---
  // Giúp menu trái tự sáng đèn khi vào đúng trang
  const currentLocation = location.href;

  // 1a. Check menu cấp 1 (Link thường)
  const menuItems = document.querySelectorAll(".side-menu > li > a");
  menuItems.forEach((item) => {
    if (item.href === currentLocation) {
      item.parentElement.classList.add("active");
    }
  });

  // 1b. Check menu cấp 2 (Dropdown con)
  const subMenuItems = document.querySelectorAll(".sub-menu li a");
  subMenuItems.forEach((item) => {
    if (item.href === currentLocation) {
      // Active link con
      item.parentElement.classList.add("active-sub");

      // Mở menu cha ra
      const parentDropdown = item.closest(".dropdown");
      if (parentDropdown) {
        parentDropdown.classList.add("active"); // Sáng vạch xanh
        parentDropdown.classList.add("open"); // Xổ xuống
      }
    }
  });

  // --- 2. TẠO OVERLAY CHO MOBILE ---
  // Tự tạo thẻ đen mờ để bấm vào thì đóng menu trên điện thoại
  const mobileOverlay = document.createElement("div");
  mobileOverlay.className = "mobile-overlay";
  mobileOverlay.onclick = toggleSidebar;
  document.body.appendChild(mobileOverlay);
});

// =======================================================
// CÁC HÀM GLOBAL (PHẢI ĐỂ NGOÀI CÙNG ĐỂ HTML GỌI ĐƯỢC)
// =======================================================

// 1. Hàm bật tắt Dropdown Menu
function toggleDropdown(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle("open");
  } else {
    console.error(
      "Lỗi: Không tìm thấy ID '" + id + "'. Kiểm tra lại file HTML."
    );
  }
}

// 2. Hàm bật tắt Sidebar Mobile
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".mobile-overlay");

  if (sidebar) sidebar.classList.toggle("active");
  if (overlay) overlay.classList.toggle("open");
}

// 3. Hàm Mở Modal (Popup)
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.querySelector(".modal-overlay");

  if (overlay) overlay.classList.add("open");
  if (modal) modal.classList.add("open");
}

// 4. Hàm Đóng Modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.querySelector(".modal-overlay");

  if (overlay) overlay.classList.remove("open");
  if (modal) modal.classList.remove("open");
}

// Đóng modal khi bấm ra ngoài vùng xám
window.onclick = function (event) {
  if (event.target.classList.contains("modal-overlay")) {
    document.querySelectorAll(".modal-box, .modal-overlay").forEach((el) => {
      el.classList.remove("open");
    });
  }
};
