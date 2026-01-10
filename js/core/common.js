/* =========================================================
   FILE: js/core/common.js
   STRUCTURE:
   1. GLOBAL VARIABLES & CONFIG
   2. DOM INITIALIZATION (Main Logic)
      2.1. System Config Apply (Show Price / Flash Sale)
      2.2. Mega Menu (Desktop)
      2.3. Mobile Menu (Drawer & Accordion)
      2.4. Hero Slider
      2.5. Sticky Header
      2.6. Floating Contact (Dynamic Render)
   3. GLOBAL FUNCTIONS (Window Scope)
      3.1. Scroll Utilities (Slider & Tags)
      3.2. Toast Notification
      3.3. Modal Controls (Open/Close)
   4. EVENT DELEGATION (Shared Logic)
      4.1. Quantity Handler (+/-)
      4.2. Add to Cart Handler
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ==================================================
  // 1. CẤU HÌNH HỆ THỐNG (SYSTEM CONFIG)
  // ==================================================

  // --- Config 1: Chế độ hiển thị giá ---
  const IS_SHOW_PRICE = true; // true = Hiện giá, false = Ẩn giá (Chế độ Catalog)

  if (!IS_SHOW_PRICE) {
    document.body.classList.add("mode-hide-price");
  } else {
    document.body.classList.remove("mode-hide-price");
  }

  // --- Config 2: Flash Sale Timer ---
  const FLASH_SALE_CONFIG = {
    active: true, // true = Bật, false = Tắt
    duration: 2 * 3600 + 45 * 60 + 18, // Thời gian đếm ngược (giây)
  };

  // ==================================================
  // 2. DOM INITIALIZATION
  // ==================================================

  // --- 2.2. Mega Menu (Desktop) ---
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const megaMenuBox = document.getElementById("mega-menu-box");

  if (menuToggleBtn && megaMenuBox) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      megaMenuBox.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !megaMenuBox.contains(e.target) &&
        !menuToggleBtn.contains(e.target)
      ) {
        megaMenuBox.classList.remove("show");
      }
    });
  }

  // --- 2.3. Mobile Menu (Drawer & Accordion) ---
  const mobileMenuBtn = document.querySelector(".m-btn-menu");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");
  const mobileOverlay = document.getElementById("mobile-menu-overlay");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  function openMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add("active");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove("active");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMobileMenu();
    });
  }
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  // Accordion Menu (Sub-menu sổ xuống)
  const drawerItems = document.querySelectorAll(".drawer-item.has-child");
  drawerItems.forEach((item) => {
    const row = item.querySelector(".drawer-row");
    if (row) {
      row.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.toggle("active");
      });
    }
  });

  // --- 2.4. Hero Slider (Banner) ---
  const slides = document.querySelectorAll(".slide-item");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const dots = document.querySelectorAll(".dot");

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides[currentSlide].classList.remove("active");
      if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    };

    const startAutoSlide = () => {
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    };

    const resetTimer = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        resetTimer();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        resetTimer();
      });

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        showSlide(idx);
        resetTimer();
      });
    });

    startAutoSlide();
  }

  // --- 2.5. Flash Sale Timer ---
  const flashSaleSection = document.querySelector(".fs-new-section");
  if (flashSaleSection) {
    if (!FLASH_SALE_CONFIG.active) {
      flashSaleSection.style.display = "none";
    } else {
      let duration = FLASH_SALE_CONFIG.duration;
      const hEl = document.getElementById("h_new");
      const mEl = document.getElementById("m_new");
      const sEl = document.getElementById("s_new");

      if (hEl && mEl && sEl) {
        const timer = setInterval(() => {
          let hours = Math.floor(duration / 3600);
          let minutes = Math.floor((duration % 3600) / 60);
          let seconds = duration % 60;

          hEl.textContent = hours < 10 ? "0" + hours : hours;
          mEl.textContent = minutes < 10 ? "0" + minutes : minutes;
          sEl.textContent = seconds < 10 ? "0" + seconds : seconds;

          if (duration > 0) {
            duration--;
          } else {
            clearInterval(timer);
            flashSaleSection.style.display = "none";
          }
        }, 1000);
      }
    }
  }

  // --- 2.6. Sticky Header ---
  const mobileHeader = document.querySelector(".mobile-header");
  window.addEventListener("scroll", () => {
    if (mobileHeader) {
      if (window.scrollY > 50) {
        mobileHeader.classList.add("header-pinned");
      } else {
        mobileHeader.classList.remove("header-pinned");
      }
    }
  });

  // --- 2.7. Floating Contact (Dynamic Render) ---
  // Cấu hình danh sách nút chat
  const contactList = [
    {
      type: "messenger",
      link: "https://m.me/yourpage",
      icon: '<i class="fab fa-facebook-messenger"></i>',
      title: "Chat Facebook",
    },
    {
      type: "zalo",
      link: "https://zalo.me/#",
      icon: '<span class="zalo-icon-text">Zalo</span>',
      title: "Chat Zalo",
    },
  ];

  const contactContainer = document.createElement("div");
  contactContainer.className = "floating-contact";

  contactList.forEach((item) => {
    const btn = document.createElement("a");
    btn.href = item.link;
    btn.className = `fc-btn ${item.type}`;
    btn.target = "_blank";
    btn.innerHTML = `${item.icon}<span class="fc-tooltip">${item.title}</span>`;
    contactContainer.appendChild(btn);
  });

  document.body.appendChild(contactContainer);
}); // END DOMContentLoaded

/* =========================================================
   3. GLOBAL FUNCTIONS (Window Scope)
   ========================================================= */

// --- 3.1. Scroll Utilities (Slider & Tags) ---
window.scrollSection = function (btn, direction) {
  const container = btn.parentElement.querySelector(".product-list-scroll");
  if (container) {
    container.scrollBy({
      left: container.offsetWidth * direction,
      behavior: "smooth",
    });
  }
};

window.scrollTags = function (direction) {
  const container = document.getElementById("newsTags");
  if (container) {
    container.scrollBy({ left: 200 * direction, behavior: "smooth" });
  }
};

// --- 3.2. Toast Notification ---
window.showToast = function (message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const icons = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    error: "fas fa-exclamation-circle",
  };

  toast.classList.add("toast", type);
  toast.innerHTML = `<i class="${icons[type]}"></i><div class="toast-msg">${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    if (container.contains(toast)) container.removeChild(toast);
  }, 4500);
};

// --- 3.3. Modal Controls (Open/Close) ---
// Dùng cho nút "Chọn sản phẩm" (onclick="openModal()")
window.openModal = function () {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.add("open");
};

window.closeModal = function () {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("open");
};

/* =========================================================
   4. EVENT DELEGATION (Shared Logic)
   ========================================================= */

document.addEventListener("click", function (e) {
  // --- 4.1. Quantity Handler (+/-) ---
  // Xử lý nút tăng giảm có class .qty-minus / .qty-plus
  const btnMinus = e.target.closest(".qty-minus");
  const btnPlus = e.target.closest(".qty-plus");

  if (btnMinus || btnPlus) {
    const wrapper = (btnMinus || btnPlus).closest(".qty-wrapper");
    const input = wrapper ? wrapper.querySelector(".qty-input") : null;

    if (input) {
      let currentVal = parseInt(input.value) || 1;
      if (btnMinus) {
        if (currentVal > 1) input.value = currentVal - 1;
      } else if (btnPlus) {
        input.value = currentVal + 1;
      }
    }
  }

  // --- 4.2. Add to Cart Handler ---
  // Xử lý nút "Thêm vào giỏ" có class .btn-action-add-cart
  const btnAdd = e.target.closest(".btn-action-add-cart");

  if (btnAdd) {
    e.preventDefault(); // Chặn thẻ a href="#" nhảy trang

    // Tìm ô số lượng gần nhất (Trong modal hoặc trong trang chi tiết)
    const container =
      btnAdd.closest(".modal-content-box, .product-detail-layout, .pd-info") ||
      document.body;
    const qtyInput = container.querySelector(".qty-input");

    let quantity = qtyInput ? parseInt(qtyInput.value) : 1;

    // Hiển thị thông báo Toast hoặc SweetAlert
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Đã thêm vào giỏ!",
        text: "Sản phẩm đã được thêm với số lượng: " + quantity,
        icon: "success",
        confirmButtonColor: "#d0021b",
        confirmButtonText: "Xem giỏ hàng",
        showCancelButton: true,
        cancelButtonText: "Đóng",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "cart.html";
        } else {
          if (typeof closeModal === "function") closeModal();
        }
      });
    } else {
      // Fallback nếu chưa cài SweetAlert
      if (window.showToast)
        window.showToast(`Đã thêm ${quantity} sản phẩm vào giỏ!`, "success");
      if (typeof closeModal === "function") closeModal();
    }
  }
});
