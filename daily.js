const params = new URLSearchParams(window.location.search);

const day = params.get("d") || new Date().getDate();
const month = params.get("m") || new Date().getMonth() + 1;
const year = params.get("y") || new Date().getFullYear();

document.getElementById("dateTitle").innerText =
  `${day}-${month}-${year}`;

fetch(PANCHANG_CONFIG.apiUrl, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${PANCHANG_CONFIG.token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    api_key: PANCHANG_CONFIG.apiKey,
    day,
    month,
    year,
    lat: PANCHANG_CONFIG.location.lat,
    lon: PANCHANG_CONFIG.location.lon,
    tzone: PANCHANG_CONFIG.location.timezone,
    lan: PANCHANG_CONFIG.language
  })
})
.then(res => res.json())
.then(p => {
  const d = p.data;
  document.getElementById("panchang").innerHTML = `
    <b>திதி (Tithi):</b> ${d.tithi.name}<br>
    <b>நட்சத்திரம் (Nakshatra):</b> ${d.nakshatra.name}<br>
    <b>சூரியோதயம்:</b> ${d.sunrise}<br>
    <b>சூரியாஸ்தமனம்:</b> ${d.sunset}
  `;
});
