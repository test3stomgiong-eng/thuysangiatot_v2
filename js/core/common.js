/**
 * COMMON.JS - Main JavaScript File
 * Chứa các xử lý chung cho toàn bộ website
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==================================================
  // 1. CẤU HÌNH HỆ THỐNG (CONFIG)
  // ==================================================

  // --- Cấu hình 1: Hiển thị giá hay ẩn giá (Catalog Mode) ---
  const IS_SHOW_PRICE = false; // true = Hiện giá, false = Ẩn giá (Hiện chữ Liên hệ)

  if (!IS_SHOW_PRICE) {
    document.body.classList.add("mode-hide-price");
  } else {
    document.body.classList.remove("mode-hide-price");
  }

  // --- Cấu hình 2: Flash Sale ---
  const FLASH_SALE_CONFIG = {
    active: true, // true = Bật, false = Tắt
    duration: 2 * 3600 + 45 * 60 + 18, // Thời gian đếm ngược (giây)
  };

  // ==================================================
  // 2. XỬ LÝ MEGA MENU (DESKTOP)
  // ==================================================
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const megaMenuBox = document.getElementById("mega-menu-box");

  if (menuToggleBtn && megaMenuBox) {
    // Click vào nút Danh mục -> Bật/Tắt
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      megaMenuBox.classList.toggle("show");
    });

    // Click ra ngoài -> Đóng menu
    document.addEventListener("click", (e) => {
      if (
        !megaMenuBox.contains(e.target) &&
        !menuToggleBtn.contains(e.target)
      ) {
        megaMenuBox.classList.remove("show");
      }
    });
  }

  // ==================================================
  // 3. XỬ LÝ MOBILE MENU (DRAWER & ACCORDION)
  // ==================================================
  const mobileMenuBtn = document.querySelector(".m-btn-menu");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");
  const mobileOverlay = document.getElementById("mobile-menu-overlay");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  // Hàm mở menu
  function openMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add("active");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Khóa cuộn
    }
  }

  // Hàm đóng menu
  function closeMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove("active");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Mở khóa cuộn
    }
  }

  // Gán sự kiện
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMobileMenu();
    });
  }
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  // --- Accordion Menu (Sổ xuống) ---
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

  // ==================================================
  // 4. XỬ LÝ HERO SLIDER (BANNER TRANG CHỦ)
  // ==================================================
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

  // ==================================================
  // 5. QUẢN LÝ FLASH SALE & ĐỒNG HỒ ĐẾM NGƯỢC
  // ==================================================
  const flashSaleSection = document.querySelector(".fs-new-section");

  if (flashSaleSection) {
    // Kiểm tra cấu hình bật/tắt
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
            // Hết giờ -> Ẩn section
            clearInterval(timer);
            flashSaleSection.style.display = "none";
            console.log("Flash Sale đã kết thúc!");
          }
        }, 1000);
      }
    }
  }

  // ==================================================
  // 6. XỬ LÝ STICKY HEADER & SCROLL EVENTS
  // ==================================================
  const mobileHeader = document.querySelector(".mobile-header");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // Xử lý Mobile Header biến hình
    if (mobileHeader) {
      if (scrollPosition > 50) {
        mobileHeader.classList.add("header-pinned");
      } else {
        mobileHeader.classList.remove("header-pinned");
      }
    }
  });
}); // End DOMContentLoaded

// ==================================================
// 7. GLOBAL FUNCTIONS (Gọi từ HTML onclick)
// ==================================================

/**
 * Xử lý Slider Sản phẩm ngang (Bấm nút mũi tên)
 * @param {HTMLElement} btn - Nút bấm (this)
 * @param {number} direction - 1 (next) hoặc -1 (prev)
 */
window.scrollSection = function (btn, direction) {
  const container = btn.parentElement.querySelector(".product-list-scroll");

  if (container) {
    // Lấy chiều rộng hiện tại của khung chứa để cuộn đúng 1 trang
    const containerWidth = container.offsetWidth;

    container.scrollBy({
      left: containerWidth * direction,
      behavior: "smooth",
    });
  }
};

// --- 11. Xử lý Scroll Tags Tin Tức ---
window.scrollTags = function(direction) {
    const container = document.getElementById('newsTags');
    if (container) {
        // Cuộn 200px mỗi lần bấm
        container.scrollBy({ left: 200 * direction, behavior: 'smooth' });
    }
}