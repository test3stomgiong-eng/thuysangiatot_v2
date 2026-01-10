function changeCartQty(btn, change) {
  var input = btn.parentElement.querySelector("input");
  var currentVal = parseInt(input.value);

  var newVal = currentVal + change;
  if (newVal < 1) newVal = 1;

  input.value = newVal;
}

function removeCartItem(btn) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    var item = btn.closest(".cart-item");
    item.remove();

    var countSpan = document.getElementById("cartCount");
    if (countSpan) countSpan.innerText = "(0)";
  }
}

function toggleCartVariant(btn) {
  var dropdown = btn.nextElementSibling;

  document.querySelectorAll(".variant-list-dropdown").forEach((el) => {
    if (el !== dropdown) el.classList.remove("show");
  });

  dropdown.classList.toggle("show");
}

function selectCartVariant(item, text) {
  var wrapper = item.closest(".variant-dropdown-wrapper");
  var displaySpan = wrapper.querySelector(".curr-var");

  displaySpan.innerText = "Phân loại: " + text;

  wrapper.querySelector(".variant-list-dropdown").classList.remove("show");

  console.log("Đã đổi sang: " + text);
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".variant-dropdown-wrapper")) {
    document.querySelectorAll(".variant-list-dropdown").forEach((el) => {
      el.classList.remove("show");
    });
  }
});
