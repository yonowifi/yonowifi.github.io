
function kirimLokasi() {
    const nama = document.getElementById("nama").value.trim();
    if (!nama) {
        alert("Silakan masukkan nama pelanggan INFODES.");
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const email = "majumakmurbumdes04@gmail.com";

            const subject = encodeURIComponent("Lokasi Pelanggan INFODES");
            const body = encodeURIComponent(
                `Nama Pelanggan: ${nama}\nLatitude: ${latitude}\nLongitude: ${longitude}\n\nhttps://www.google.com/maps?q=${latitude},${longitude}`
            );

            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        }, (error) => {
            alert("Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.");
        });
    } else {
        alert("Perangkat Anda tidak mendukung fitur lokasi.");
    }
}
