# Vocab Lab

Sổ tay từ vựng tiếng Anh cá nhân — ghi lại, ôn tập bằng flashcard, và tự kiểm tra bằng quiz.
Dữ liệu lưu trong `localStorage` của trình duyệt (không cần đăng nhập, không cần server).

## Cấu trúc dự án

```
src/
  main.jsx              # điểm khởi động React
  App.jsx               # component gốc, quản lý state + localStorage
  hooks/
    useLocalStorage.js   # hook đọc/ghi localStorage
  data/
    seed.js              # dữ liệu mẫu ban đầu + form rỗng
  utils/
    helpers.js            # hàm tiện ích: shuffle, uid, màu theo từ loại
  styles/
    tokens.js             # bảng màu + font dùng xuyên suốt app
  components/
    GlobalStyle.jsx, Header.jsx, TabBar.jsx
    ListView.jsx, EntryForm.jsx, EntryCard.jsx, EmptyState.jsx, Chip.jsx
    FlashcardsView.jsx, QuizView.jsx, FilterRow.jsx
```

## Chạy thử ở máy local

Yêu cầu: đã cài [Node.js](https://nodejs.org) (bản 18 trở lên).

```bash
npm install       # cài dependencies (chỉ cần làm 1 lần)
npm run dev       # chạy dev server, mở link hiện ra (thường http://localhost:5173)
```

Sửa code xong, lưu file là trình duyệt tự refresh.

## Build bản production

```bash
npm run build     # build ra thư mục dist/
npm run preview   # xem thử bản đã build trước khi deploy
```

## Deploy lên GitHub Pages (tự động)

Repo đã có sẵn file `.github/workflows/deploy.yml` — mỗi lần bạn `git push` lên nhánh `main`,
GitHub Actions sẽ tự build và deploy. Bạn chỉ cần bật Pages **một lần duy nhất**:

1. Vào repo trên GitHub → **Settings** → **Pages**.
2. Ở mục **Source**, chọn **GitHub Actions** (không chọn "Deploy from a branch").
3. Push code lên (xem hướng dẫn bên dưới) → vào tab **Actions** để xem quá trình build/deploy.
4. Sau khi job "deploy" chạy xong (dấu tích xanh), trang sẽ có ở:
   `https://<username>.github.io/vocab-lap/`

> **Lưu ý:** nếu bạn đổi tên repo khác `vocab-lap`, phải sửa lại dòng `base:` trong
> `vite.config.js` cho khớp tên repo mới, nếu không CSS/JS sẽ load sai đường dẫn (trang trắng).

## Đẩy code lên GitHub lần đầu

Repo `vocab-lap` của bạn hiện có sẵn 1 file `README.md` (initial commit). Làm theo các bước sau
ngay trong thư mục dự án này (`vocab-lab/`):

```bash
git init
git branch -M main
git add .
git commit -m "Migrate to Vite + React project structure"
git remote add origin https://github.com/TEN06-LAB/vocab-lap.git

# vì repo trên GitHub đã có sẵn README.md, cần kéo về trước rồi mới đẩy lên
git pull origin main --allow-unrelated-histories
# nếu có xung đột file README.md, mở file lên xoá phần đánh dấu <<<<<<< / ======= / >>>>>>>
# rồi: git add README.md && git commit

git push -u origin main
```

Sau lần đầu, các lần sau chỉ cần:

```bash
git add .
git commit -m "mô tả thay đổi"
git push
```

## Backup / chuyển dữ liệu sang máy khác

Tính năng Export/Import JSON sẽ được thêm ở Giai đoạn 2. Hiện tại dữ liệu chỉ nằm trong
`localStorage` của trình duyệt bạn đang dùng — nếu xoá cache trình duyệt, dữ liệu sẽ mất.
