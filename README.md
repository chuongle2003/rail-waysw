# Dự án Xây dựng Website Đặt vé xe lửa – SGU Train System

## Giới thiệu

Dự án này sử dụng công nghệ Next.js, được khởi tạo với lệnh `create-next-app`. Phần frontend được thiết kế để cung cấp trải nghiệm tốt nhất cho người dùng khi sử dụng hệ thống đặt vé tàu.

## Hướng dẫn khởi chạy

### 1. Chạy ứng dụng

Sử dụng một trong các lệnh sau để khởi chạy ứng dụng ở chế độ phát triển:

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Sau khi khởi động thành công, mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

### 2. Chỉnh sửa trang

Để bắt đầu chỉnh sửa, hãy thay đổi nội dung trong file `app/page.tsx`. Ứng dụng sẽ tự động cập nhật khi có thay đổi.

### 3. Tối ưu hóa phông chữ

Dự án sử dụng `next/font` để tối ưu hóa và tải phông chữ tự động.

## Cấu trúc dự án Frontend

### Các thành phần chính

#### Group client route:

Bao gồm các trang chạy phía client để điều hướng các route hợp lý.

#### Tìm kiếm, đặt vé, thanh toán:

Tích hợp giao diện và API xử lý việc tìm kiếm lịch trình, đặt vé, và thanh toán.

#### Quản lý tài khoản:

Giao diện và API dành cho chức năng đăng nhập, đăng ký, quên mật khẩu.

#### Components:

Các thành phần giao diện tái sử dụng được xây dựng để phục vụ toàn bộ ứng dụng.

#### Custom hooks và context:

Xử lý các logic đặc thù như call API, quản lý trạng thái, và giao tiếp qua web-socket.

#### Thư viện tích hợp (shadcn library):

Cung cấp các components giao diện UI hiện đại và đẹp mắt.

#### Config và packages:

Cấu hình và thư viện cần thiết để triển khai ứng dụng.

## Tính năng nổi bật

- Tìm kiếm lịch trình và đặt vé tàu một chiều hoặc khứ hồi.
- Thanh toán qua ví điện tử MOMO, Paypal.
- Chatbot hỗ trợ giải đáp thắc mắc của người dùng.
- Tích hợp quét mã QR để xác thực vé.
- Hỗ trợ đa ngôn ngữ và các giao diện thân thiện với người dùng.

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs) - Tài liệu chính thức của Next.js.
- [Learn Next.js](https://nextjs.org/learn) - Hướng dẫn sử dụng Next.js tương tác.
- [MOMO Payment Docs](https://developers.momo.vn) - Hướng dẫn tích hợp thanh toán MOMO.
