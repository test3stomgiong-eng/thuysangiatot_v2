document.addEventListener("DOMContentLoaded", function() {

    // --- 1. XỬ LÝ API ĐỊA CHÍNH (GIỮ NGUYÊN) ---
    const host = "https://provinces.open-api.vn/api/";
    
    var callAPI = (api) => {
        return axios.get(api).then((response) => { renderData(response.data, "province"); });
    }
    var callApiDistrict = (api) => {
        return axios.get(api).then((response) => { renderData(response.data.districts, "district"); });
    }
    var callApiWard = (api) => {
        return axios.get(api).then((response) => { renderData(response.data.wards, "ward"); });
    }
    var renderData = (array, select) => {
        let row = ' <option disable value="">Chọn</option>';
        array.forEach(element => {
            row += `<option data-code="${element.code}" value="${element.name}">${element.name}</option>`
        });
        document.querySelector("#" + select).innerHTML = row;
    }

    const fetchProvinces = async () => {
        try {
            const response = await fetch(host + "?depth=1");
            const data = await response.json();
            renderData(data, "province");
        } catch (error) { console.error(error); }
    };
    fetchProvinces();

    const provinceSelect = document.querySelector("#province");
    const districtSelect = document.querySelector("#district");
    const wardSelect = document.querySelector("#ward");

    if(provinceSelect) {
        provinceSelect.addEventListener("change", async function() {
            districtSelect.innerHTML = '<option value="">Đang tải...</option>';
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            const selectedOption = provinceSelect.options[provinceSelect.selectedIndex];
            const provinceCode = selectedOption.getAttribute("data-code");
            if (provinceCode) {
                const response = await fetch(host + "p/" + provinceCode + "?depth=2");
                const data = await response.json();
                renderData(data.districts, "district");
            } else { districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>'; }
        });
    }

    if(districtSelect) {
        districtSelect.addEventListener("change", async function() {
            wardSelect.innerHTML = '<option value="">Đang tải...</option>';
            const selectedOption = districtSelect.options[districtSelect.selectedIndex];
            const districtCode = selectedOption.getAttribute("data-code");
            if (districtCode) {
                const response = await fetch(host + "d/" + districtCode + "?depth=2");
                const data = await response.json();
                renderData(data.wards, "ward");
            } else { wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>'; }
        });
    }

    // --- 2. LOGIC NÚT ĐẶT HÀNG (DÙNG SWEETALERT2) ---
    var orderBtns = document.querySelectorAll('#btnOrder, #btnOrderMobile');
    var isHidePrice = document.body.classList.contains('mode-hide-price');

    if (isHidePrice) {
        var paymentSection = document.querySelector('.payment-section');
        if (paymentSection) paymentSection.style.display = 'none';

        orderBtns.forEach(function(btn) {
            btn.innerText = "GỬI YÊU CẦU BÁO GIÁ";
            btn.style.background = "#0056b3";
        });
    }

    orderBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            
            // Lấy địa chỉ để hiển thị cho đẹp
            var addrInfo = "";
            if(provinceSelect && provinceSelect.value !== "") {
                addrInfo = "Đơn hàng sẽ được giao đến: <b>" + provinceSelect.value + "</b>";
            }

            if (isHidePrice) {
                // Modal Báo giá (Xanh dương)
                Swal.fire({
                    title: 'Gửi yêu cầu thành công!',
                    text: 'Chúng tôi sẽ liên hệ lại với bạn sớm nhất để báo giá.',
                    icon: 'info',
                    confirmButtonText: 'Về trang chủ',
                    confirmButtonColor: '#0056b3'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'index.html';
                    }
                });

            } else {
                // Modal Đặt hàng (Thành công - Xanh lá)
                Swal.fire({
                    title: 'Đặt hàng thành công!',
                    html: 'Cảm ơn bạn đã mua sắm tại Pharmacity.<br>' + addrInfo,
                    icon: 'success',
                    confirmButtonText: 'Tiếp tục mua sắm',
                    confirmButtonColor: '#d0021b'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'index.html';
                    }
                });
            }
        });
    });

});