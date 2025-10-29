# Kirim Lokasi Web

Repository ini berisi aplikasi sederhana yang meminta izin lokasi dari pengguna dan mengirimkan koordinat (latitude, longitude), link Google Maps, serta informasi perangkat ke alamat email yang ditentukan.

> **Penting:** Pastikan Anda mematuhi hukum dan kebijakan privasi. Selalu minta izin pengguna secara jelas sebelum mengirim lokasi mereka.

## Fitur

- Halaman frontend `public/index.html` yang meminta izin Geolocation API
- Server Node.js (Express) untuk menerima data dan mengirim email (nodemailer)
- Opsi menampilkan thumbnail peta kecil (Google Static Maps) jika `GOOGLE_MAPS_API_KEY` disediakan

## Cara pakai (lokal)

1. Clone repository atau unggah ke komputer Anda.
2. Salin file `.env.example` menjadi `.env` dan isi konfigurasi SMTP serta `TO_EMAIL`.
3. Install dependensi:

```bash
npm install
```

4. Jalankan server (untuk pengujian):

```bash
npm start
```

5. Buka browser ke `http://localhost:3000` (atau URL yang dijalankan). Untuk pengujian di domain publik, pastikan menggunakan HTTPS agar Geolocation API berfungsi di sebagian besar browser.

## Deployment

Anda dapat deploy ke platform seperti Heroku, Render, Railway, atau VPS. Pastikan variabel lingkungan (.env) terisi dan situs tersedia via HTTPS.

## Kebijakan privasi & catatan

- Browser akan meminta izin dari pengguna sebelum lokasi diambil. Jika ditolak, lokasi tidak akan dikirim.
- `enableHighAccuracy:true` tidak menjamin akurasi sempurna — hasil tergantung perangkat dan kondisi lingkungan.
- Jangan menyimpan atau menyebarkan data lokasi tanpa izin jelas.

## Lisensi

MIT
