# Ôn thi Nguyên lý HĐH – Chương 4, 5, 6

Trang web tĩnh để ôn trắc nghiệm, có khóa mật khẩu.

## Cấu trúc
- `index.html` – trang chính
- `assets/style.css`, `assets/app.js` – giao diện & logic (làm bài, thi thử, chấm điểm, tổng hợp)
- `assets/lock.js` – màn hình khóa (chỉ lưu mã băm SHA-256 có muối của mật khẩu)
- `data/chuong4.js`, `data/chuong5.js`, `data/chuong6.js` – ngân hàng câu hỏi
- `data/tomtat.js` – tổng hợp kiến thức từng chương

## Thêm / sửa câu hỏi
Mỗi câu trong `data/chuongX.js`:
```js
{id:"c4-99", ch:4, type:"single" | "multi" | "order", topic:"...",
 q:"Câu hỏi", steps:["(chỉ cho type order)"], opts:["A","B","C","D"],
 ans:[1], exp:"Giải thích"}
```
`ans` là chỉ số (bắt đầu từ 0) của đáp án đúng; câu `multi` có nhiều chỉ số.

## Chạy trên máy
Mở thẳng `index.html`, hoặc chạy `python -m http.server` rồi vào http://localhost:8000.

## Đưa lên GitHub Pages
Tạo repo, đẩy toàn bộ thư mục này lên nhánh `main`, vào **Settings → Pages → Deploy from a branch → main / root**.

> Lưu ý: mật khẩu chỉ chặn người xem thông thường. Vì là web tĩnh, ai mở mã nguồn vẫn đọc được nội dung câu hỏi.
