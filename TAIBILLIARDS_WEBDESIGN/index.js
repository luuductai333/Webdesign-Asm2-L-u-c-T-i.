// Đợi cho trang tải hoàn thành trước khi thêm các sự kiện
document.addEventListener("DOMContentLoaded", function() {
    // Lấy ra tất cả các liên kết trong navbar
    var navLinks = document.querySelectorAll('#navbar a');

    // Thêm sự kiện click vào từng liên kết
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {

            // Kiểm tra xem liên kết được nhấp có phải là "Predator Home Page" hay không
            if (link.textContent === "Predator Home Page") {
                // Chuyển hướng đến trang chủ
                window.location.href = "/";
            }
        });
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lấy danh sách tất cả các tên sản phẩm
var products = document.querySelectorAll('.billiards-item .des span');

// Gán sự kiện cho ô tìm kiếm
document.getElementById('searchInput').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();

    // Ẩn tất cả các sản phẩm trước khi tìm kiếm lại
    products.forEach(function(product) {
        product.parentElement.parentElement.style.display = 'none';
    });

    // Hiển thị sản phẩm tương ứng với từ khóa tìm kiếm
    products.forEach(function(product) {
        if (product.textContent.toLowerCase().includes(searchTerm)) {
            // Hiển thị sản phẩm
            product.parentElement.parentElement.style.display = 'block';

            // Cuộn đến sản phẩm
            product.parentElement.parentElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    // Xử lý sự kiện khi nhấp vào nút "Add to Cart"
    document.querySelectorAll('.billiards-item a[href="#"]').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của nút
            const productName = this.closest('.billiards-item').querySelector('.des span').textContent;
            const productPrice = this.closest('.billiards-item').querySelector('.price p').textContent;
            const productImage = this.closest('.billiards-item').querySelector('img').src;

            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({ name: productName, price: productPrice, image: productImage });
            localStorage.setItem('products', JSON.stringify(products));

            // Tự chuyển hướng setTimeout(function() {
            //     window.location.href = 'cart.html';
            // }, 4000); // Chuyển hướng sau 4 giây
        });
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JavaScript code to show success message when adding product to cart
document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.billiards-item .fa-cart-shopping');
    var successMessage = document.getElementById('successMessage');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            successMessage.style.display = 'block'; // Hiển thị thông báo
            setTimeout(function () {
                successMessage.style.display = 'none'; // Ẩn thông báo sau một khoảng thời gian nhất định
            }, 1000); // 1 giây
        });
    });
});

