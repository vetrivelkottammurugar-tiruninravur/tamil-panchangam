const C_ID = '3268922e-286b-441c-a1fc-49c72790c638';
const C_SEC = 'Jxr1a0ux7UcAqCoZc8xW1uhVeDTHETHvcoqlcwp4';
let token = null;

const mNames = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];
const dNames = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
const tMonths = ["தை", "மாசி", "பங்குனி", "சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி"];

async function getToken() {
    const res = await fetch('https://api.prokerala.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${C_ID}&client_secret=${C_SEC}`
    });
    const d = await res.json();
    token = d.access_token;
}

async function render() {
    const m = parseInt(document.getElementById('mS').value);
    const y = parseInt(document.getElementById('yS').value);
    const grid = document.getElementById('grid'); grid.innerHTML = '';
    
    const start = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();

    for(let i=0; i<start; i++) grid.innerHTML += `<div></div>`;
    for(let d=1; d<=total; d++) {
        const date = new Date(y, m, d);
        const cell = document.createElement('div');
        cell.className = 'date-cell';
        let tamD = (d < 14) ? (d + 17) : (d - 13);
        
        cell.innerHTML = `
            <div class="mini-header"><div class="m-ora">விசு</div><div class="m-blu">${tamD}</div><div class="m-gre">${mNames[m].substr(0,3)}</div></div>
            <div class="cell-num">${d}</div>
            <div class="cell-foot">Click for Info</div>
        `;
        cell.onclick = () => openP(d, m+1, y, tamD, dNames[date.getDay()]);
        grid.appendChild(cell);
    }
}

async function openP(d, m, y, tamD, day) {
    const modal = document.getElementById('pop');
    modal.style.display = 'flex'; // Reset state here
    
    document.getElementById('pBigNum').innerText = d;
    document.getElementById('pTamDate').innerText = tamD;
    document.getElementById('pEngInfo').innerHTML = `${mNames[m-1]} ${y}<br>${day}`;
    document.getElementById('pYearInfo').innerHTML = `விசுவாவசு<br>${tMonths[(m+8)%12]}`;

    if(!token) await getToken();
    try {
        const res = await fetch(`https://prokerala.com{y}-${m.toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}T06:00:00+05:30&location=13.08,80.27`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const out = await res.json();
        document.getElementById('pTithi').innerText = out.data.tithi.name;
        document.getElementById('pStar').innerText = out.data.nakshatra.name;
    } catch(e) { document.getElementById('pTithi').innerText = "Loading Error"; }
}

function closeP() { document.getElementById('pop').style.display = 'none'; }
function downloadImg() {
    html2canvas(document.getElementById('captureArea')).then(c => {
        const a = document.createElement('a'); a.download = `Panchangam_${document.getElementById('pBigNum').innerText}.png`;
        a.href = c.toDataURL(); a.click();
    });
}

// Initial Setup
const ms = document.getElementById('mS'); const ys = document.getElementById('yS');
mNames.forEach((n, i) => ms.innerHTML += `<option value="${i}" ${i==3?'selected':''}>${n}</option>`);
for(let i=1950; i<=2100; i++) ys.innerHTML += `<option value="${i}" ${i==2026?'selected':''}>${i}</option>`;
render();
