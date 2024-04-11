document.addEventListener('DOMContentLoaded', function() {
    // Trích xuất danh sách sản phẩm từ Local Storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Hiển thị thông tin sản phẩm trên trang
    const selectedProducts = document.getElementById('selected-products');
    const totalPriceElement = document.getElementById('total-price');

    function displayProducts() {
        let productHTML = '';
        let totalPriceVND = 0; // Tổng giá trị sản phẩm trong VND
        products.forEach(function(product, index) {
            productHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p>Price: ${product.price.toLocaleString()}$</p>
                        <button class="remove-button" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            totalPriceVND += parseInt(product.price); // Cộng giá trị sản phẩm vào tổng giá trị
        });

        // Chuyển đổi tổng giá trị từ VND sang USD
        const exchangeRate = 1.000000; // Tỷ giá hối đoái từ VND sang USD (ví dụ)
        const totalPriceUSD = totalPriceVND * exchangeRate;

        selectedProducts.innerHTML = productHTML;

        // Hiển thị tổng giá trị
        totalPriceElement.textContent = `Total: $${totalPriceUSD.toFixed(2)}`; 

        // Lắng nghe sự kiện click để xóa sản phẩm
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                products.splice(indexToRemove, 1); // Xóa sản phẩm khỏi danh sách
                localStorage.setItem('products', JSON.stringify(products)); // Cập nhật Local Storage
                displayProducts(); // Hiển thị lại danh sách sản phẩm sau khi xóa
            });
        });
    }

    // Lắng nghe sự kiện click trên nút "Pay Now"
    const payNowButton = document.querySelector('#payment-form button[type="submit"]');
    payNowButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit

        // Tính toán tổng giá trị cần thanh toán
        let totalPriceVND = 0;
        products.forEach(function(product) {
            totalPriceVND += parseInt(product.price);
        });
        const exchangeRate = 1.000000; 
        const totalPriceUSD = totalPriceVND * exchangeRate;

        // Lấy thông tin từ form
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Hiển thị thông tin xác nhận và yêu cầu xác nhận
        const confirmed = window.confirm(`Confirm payment information:
        Name: ${name}
        Phone Number: ${phone}
        Address: ${address}
        Payment amount: $${totalPriceUSD.toFixed(2)}
        Do you want to continue?`);

        // Xử lý hành động dựa trên sự xác nhận
        if (confirmed) {
            // Hiển thị thông báo thanh toán thành công
            alert(`Payment success! Thank you ${name} for your purchase.
            The product will be sent to the address ${address} on the nearest date.`);

            // Xóa danh sách sản phẩm từ Local Storage
            localStorage.removeItem('products');

            // Cập nhật giao diện hiển thị sản phẩm
            displayProducts();

            // Hiển thị thông báo trước khi chuyển hướng về trang chủ
            alert("Redirect to home page in 3 seconds...");

            // Chuyển hướng về trang chủ sau 3 giây
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 3000);
        }
    });

    displayProducts();
});
