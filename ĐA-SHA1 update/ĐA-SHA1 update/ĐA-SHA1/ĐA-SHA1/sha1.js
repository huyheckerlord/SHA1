function hashSHA1() {
    const inputText = document.getElementById("inputText").value;
    if (inputText === "") {
        alert("Vui lòng nhập chuỗi!");
        return;
    }

    // Bước 1: Chuyển chuỗi sang mã nhị phân
    let binaryText = "";
    for (let i = 0; i < inputText.length; i++) {
        binaryText += inputText.charCodeAt(i).toString(2).padStart(8, '0');
    }
    let detailsText = "<div class='step'>Bước 1: Chuyển chuỗi thành mã nhị phân</div>";
    detailsText += "<div class='step-detail'>Chuỗi nhị phân: " + binaryText + "</div>";

    // Bước 2: Đệm chuỗi đến 512 bit và thêm chiều dài chuỗi
    const originalLength = binaryText.length;
    binaryText += "1";  // Thêm 1 vào cuối
    while (binaryText.length % 512 !== 448) {
        binaryText += "0";
    }
    const lengthBinary = originalLength.toString(2).padStart(64, '0');
    binaryText += lengthBinary;
    detailsText += "<div class='step'>Bước 2: Đệm chuỗi</div>";
    detailsText += "<div class='step-detail'>Chuỗi sau khi đệm: " + binaryText + "</div>";

    // Bước 3: Khởi tạo các hằng số H0, H1, H2, H3, H4
    detailsText += "<div class='step'>Bước 3: Khởi tạo các hằng số SHA-1</div>";
    detailsText += "<div class='step-detail'>H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE, H3 = 0x10325476, H4 = 0xC3D2E1F0</div>";

    // Bước 4: Xử lý các khối và vòng lặp SHA-1
    detailsText += "<div class='step'>Bước 4: Xử lý các khối với 80 vòng lặp</div>";
    
    let loopDetails = "";
    for (let i = 0; i < 80; i++) {
        const round = Math.floor(i / 20); // Xác định loại hàm F
        let F, K;

        // Tính toán F và K cho các vòng lặp
        if (round === 0) {
            F = "(B AND C) OR ((NOT B) AND D)";
            K = "0x5A827999";
        } else if (round === 1) {
            F = "B XOR C XOR D";
            K = "0x6ED9EBA1";
        } else if (round === 2) {
            F = "(B AND C) OR (B AND D) OR (C AND D)";
            K = "0x8F1BBCDC";
        } else {
            F = "B XOR C XOR D";
            K = "0xCA62C1D6";
        }

        // Tạo nội dung cho từng vòng lặp
        loopDetails += "<div class='loop-detail'>";
        loopDetails += `<div class='loop-step'>Vòng lặp ${i + 1}: F = ${F}, K = ${K}</div>`;
        loopDetails += "<div class='loop-description'>Mỗi vòng lặp tính toán TEMP = (A rotl 5) + F + E + K + W[i], sau đó cập nhật A, B, C, D, E.</div>";
        loopDetails += "</div>";
    }
    detailsText += loopDetails;

    // Bước 5: Ghép các hằng số để tạo ra kết quả băm cuối cùng
    const hash = CryptoJS.SHA1(inputText).toString(CryptoJS.enc.Hex);
    detailsText += "<div class='step'>Bước 5: Tạo ra kết quả băm</div>";
    detailsText += "<div class='step-detail'>Kết quả cuối cùng: " + hash + "</div>";

    // Hiển thị kết quả và chi tiết
    document.getElementById("result").innerText = "Kết quả băm SHA-1: " + hash;
    document.getElementById("details").innerHTML = detailsText;
}
function hashFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Vui lòng chọn một tệp!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        const hash = CryptoJS.SHA1(fileContent).toString(CryptoJS.enc.Hex);
        document.getElementById("result").innerText = `Kết quả băm SHA-1 (Tệp): ${hash}`;
    };

    reader.onerror = function () {
        alert("Đã xảy ra lỗi khi đọc tệp.");
    };

    reader.readAsText(file); // Đọc nội dung tệp dưới dạng text
}
function resetForm() {
    document.getElementById("inputText").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("details").innerHTML = "";
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
}
