/* ============================= DATA ============================= */
const houseSVG = `<svg viewBox="0 0 120 90" fill="none"><path d="M8 46L60 12L112 46" stroke="#12343b" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="22" y="45" width="76" height="34" fill="#fffdfb" stroke="#12343b" stroke-width="3.5"/><rect x="34" y="55" width="16" height="16" fill="#12343b"/><rect x="70" y="55" width="16" height="16" fill="#12343b"/></svg>`;

const kosData = [
  {id:1, name:'Kos Putri Sakura', addr:'Jl. Kaliurang Km. 5, Sleman', price:850000, rating:4.7, reviews:32, facilities:['WiFi','AC','K. Mandi Dalam','Dapur'], status:'Tersedia'},
  {id:2, name:'Kos Putra Harmoni', addr:'Jl. Colombo No. 3, Sleman', price:900000, rating:4.5, reviews:28, facilities:['WiFi','AC','K. Mandi Dalam'], status:'Tersedia'},
  {id:3, name:'Kos Griya Asri', addr:'Jl. Affandi No. 15, Sleman', price:1000000, rating:4.8, reviews:41, facilities:['WiFi','AC','K. Mandi Dalam','Dapur'], status:'Tersedia'},
  {id:4, name:'Kos Exclusive Gejayan', addr:'Jl. Gejayan No. 10, Sleman', price:1200000, rating:4.6, reviews:19, facilities:['WiFi','AC','K. Mandi Dalam','Dapur'], status:'Tersedia'},
  {id:5, name:'Kos Aari Seturan', addr:'Jl. Seturan Raya No. 8, Sleman', price:850000, rating:4.3, reviews:15, facilities:['WiFi','Parkir'], status:'Penuh'},
  {id:6, name:'Kos Melati Gejayan', addr:'Jl. Gejayan No. 22, Sleman', price:950000, rating:4.4, reviews:22, facilities:['WiFi','AC'], status:'Penuh'},
];

let favIds = new Set([1,3,4]);

const bookingSurveiData = [
  {kos:'Kos Putra Harmoni', addr:'Jl. Colombo No. 3, Sleman', tanggal:'20 Mei 2024', status:'Menunggu'},
  {kos:'Kos Griya Asri', addr:'Jl. Affandi No. 15, Sleman', tanggal:'22 Mei 2024', status:'Menunggu'},
  {kos:'Kos Exclusive Gejayan', addr:'Jl. Gejayan No. 10, Sleman', tanggal:'25 Mei 2024', status:'Disetujui'},
];

const bookingMasukData = [
  {nama:'Zahra Aulia', kos:'Kos Putra Harmoni', tanggal:'20 Mei 2024', status:'Menunggu'},
  {nama:'Rizky Pratama', kos:'Kos Griya Asri', tanggal:'22 Mei 2024', status:'Menunggu'},
  {nama:'Siti Nurhaliza', kos:'Kos Exclusive Gejayan', tanggal:'25 Mei 2024', status:'Disetujui'},
  {nama:'Andi Setiawan', kos:'Kos Aari Seturan', tanggal:'27 Mei 2024', status:'Ditolak'},
];

const reviewData = [
  {name:'Siti Nurhaliza', rating:5, time:'2 minggu lalu', text:'Kamar bersih, nyaman dan dekat kampus. Recommended!'},
  {name:'Dewi Lestari', rating:4, time:'1 bulan lalu', text:'Fasilitas lengkap, tapi parkirnya agak sempit.'},
];

const myReviewData = [
  {kos:'Kos Putri Sakura', rating:5, time:'2 minggu lalu', text:'Kamar bersih, nyaman dan dekat kampus. Pelayanan ramah!'},
  {kos:'Kos Griya Asri', rating:4, time:'1 bulan lalu', text:'Tempat nyaman, fasilitas lengkap. Cuma parkirnya agak sempit.'},
  {kos:'Kos Exclusive Gejayan', rating:5, time:'2 bulan lalu', text:'Sangat strategis dan nyaman.'},
];

const ownerKosData = [
  {name:'Kos Putra Harmoni', price:900000, status:'Tersedia'},
  {name:'Kos Griya Asri', price:1000000, status:'Tersedia'},
  {name:'Kos Exclusive Gejayan', price:1200000, status:'Tersedia'},
  {name:'Kos Aari Seturan', price:850000, status:'Penuh'},
  {name:'Kos Melati Gejayan', price:950000, status:'Penuh'},
];

const notifData = [
  {text:'Booking survei Andi di Kos Griya Asri telah disetujui pemilik.', time:'10 menit lalu', read:false},
  {text:'Booking survei Kos Exclusive Gejayan telah ditolak oleh pemilik.', time:'1 jam lalu', read:false},
  {text:'Anda memiliki pesan baru dari pemilik Kos Putra Harmoni.', time:'2 jam lalu', read:false},
  {text:'Kos Melati Gejayan baru saja ditambahkan oleh pemilik.', time:'3 jam lalu', read:true},
];

/* ============================= ICONS ============================= */
function pin(){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;}
function starIcon(){return `<svg viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9.5 16.5,14 18,21 12,17.5 6,21 7.5,14 2,9.5 9,9"/></svg>`;}
function heartIcon(){return `<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.7-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.8.7 4.4 2 .6-1.3 2.4-2.3 4.4-2C18 4.5 19.6 8 22 11.7 19.5 16.3 12 21 12 21z"/></svg>`;}

function starsHtml(rating){
  let s='';
  for(let i=1;i<=5;i++){ s += i<=Math.round(rating) ? starIcon() : `<svg class="empty" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9.5 16.5,14 18,21 12,17.5 6,21 7.5,14 2,9.5 9,9"/></svg>`; }
  return `<div class="stars-row">${s}</div>`;
}

function fmtPrice(p){ return 'Rp ' + p.toLocaleString('id-ID'); }

/* ============================= KOS CARD ============================= */
function kosCard(k){
  const isFav = favIds.has(k.id);
  return `
  <div class="kos-card">
    <div class="kos-photo">
      <span class="status-badge ${k.status==='Tersedia'?'tersedia':'penuh'}">${k.status}</span>
      <button class="fav-btn ${isFav?'active':''}" onclick="event.stopPropagation(); toggleFav(${k.id})">${heartIcon()}</button>
      ${houseSVG}
    </div>
    <div class="kos-body" onclick="go('detail')" style="cursor:pointer;">
      <div class="kname">${k.name}</div>
      <div class="kaddr">${pin()}<span>${k.addr}</span></div>
      <div class="kprice">${fmtPrice(k.price)}<span> / bulan</span></div>
      <div class="krating">${starIcon()} ${k.rating} (${k.reviews} ulasan)</div>
      <div class="kfacilities">${k.facilities.map(f=>`<span class="fac-tag">${f}</span>`).join('')}</div>
    </div>
  </div>`;
}

function toggleFav(id){
  if(favIds.has(id)){ favIds.delete(id); toast('Dihapus dari favorit'); }
  else { favIds.add(id); toast('Ditambahkan ke favorit'); }
  renderAllKosGrids();
}

function renderAllKosGrids(){
  document.getElementById('recoGrid').innerHTML = kosData.slice(0,3).map(kosCard).join('');
  document.getElementById('searchGrid').innerHTML = kosData.map(kosCard).join('');
  const favArr = kosData.filter(k=>favIds.has(k.id));
  document.getElementById('favoritGrid').innerHTML = favArr.length ? favArr.map(kosCard).join('') :
    `<p style="color:var(--text-soft); font-size:14px;">Belum ada kos favorit. Jelajahi kos dan tekan ikon hati untuk menyimpannya.</p>`;
}

/* ============================= DETAIL FAV ============================= */
function toggleDetailFav(){
  toggleFav(1);
  const btn = document.getElementById('favDetailBtn');
  btn.innerHTML = favIds.has(1) ? '♥ Tersimpan di Favorit' : '♡ Simpan Favorit';
}

/* ============================= REVIEWS ============================= */
function renderReviews(){
  document.getElementById('reviewList').innerHTML = reviewData.map(r=>`
    <div class="review-item">
      <div class="avatar" style="flex:none;">${r.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;">
          <b style="font-size:13.5px; color:var(--night-dark);">${r.name}</b>
          <span style="font-size:11.5px; color:var(--text-soft);">${r.time}</span>
        </div>
        ${starsHtml(r.rating)}
        <p style="font-size:13px; color:var(--text-soft); margin-top:5px;">${r.text}</p>
      </div>
    </div>`).join('');

  document.getElementById('myReviewList').innerHTML = myReviewData.map(r=>`
    <div class="card" style="padding:16px; display:flex; gap:14px; margin-bottom:14px; align-items:center;">
      <div class="thumb-sm" style="width:60px; height:50px;"></div>
      <div style="flex:1;">
        <b style="font-size:14.5px; color:var(--night-dark);">${r.kos}</b>
        <div style="display:flex; align-items:center; gap:8px; margin:4px 0;">${starsHtml(r.rating)}<span style="font-size:11.5px; color:var(--text-soft);">${r.time}</span></div>
        <p style="font-size:13px; color:var(--text-soft);">${r.text}</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <button class="btn btn-outline btn-sm" onclick="toast('Edit ulasan (demo)')">Edit</button>
        <button class="btn btn-danger-outline btn-sm" onclick="toast('Ulasan dihapus (demo)')">Hapus</button>
      </div>
    </div>`).join('');
}

/* ============================= BOOKINGS ============================= */
function bookingCard(b, forOwner){
  const cls = b.status==='Menunggu'?'menunggu': b.status==='Disetujui'?'disetujui': b.status==='Ditolak'?'ditolak':'selesai';
  if(forOwner){
    return `<tr data-status="${b.status}">
      <td class="row-flex"><div class="thumb-sm"></div>${b.nama}</td>
      <td>${b.kos}</td>
      <td>${b.tanggal}</td>
      <td><span class="badge ${cls}">${b.status}</span></td>
      <td>${b.status==='Menunggu' ? `<div style="display:flex; gap:6px;"><button class="btn btn-sand btn-sm" onclick="toast('Booking disetujui')">Setujui</button><button class="btn btn-danger-outline btn-sm" onclick="toast('Booking ditolak')">Tolak</button></div>` : `<span style="color:var(--text-soft); font-size:12.5px;">—</span>`}</td>
    </tr>`;
  }
  return `
  <div class="card booking-item" data-status="${b.status}" style="margin-bottom:14px;">
    <div class="thumb-sm" style="width:64px; height:52px;"></div>
    <div style="flex:1;">
      <b style="font-size:14.5px; color:var(--night-dark);">${b.kos}</b>
      <div class="kaddr" style="margin:3px 0;">${pin()}<span>${b.addr}</span></div>
      <div style="font-size:12.5px; color:var(--text-soft);">Tanggal Survei: ${b.tanggal}</div>
    </div>
    <span class="badge ${cls}">${b.status}</span>
    ${b.status==='Menunggu' ? `<button class="btn btn-danger-outline btn-sm" onclick="toast('Booking dibatalkan')">Batalkan</button>` : ''}
  </div>`;
}

function renderBookings(){
  document.getElementById('bsGrid').innerHTML = bookingSurveiData.filter(b=>b.status==='Menunggu').map(b=>bookingCard(b,false)).join('') || emptyState('Belum ada booking dengan status ini.');
  document.getElementById('bmGrid').innerHTML = `<thead><tr><th>Penyewa</th><th>Kos</th><th>Tanggal Survei</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${bookingMasukData.filter(b=>b.status==='Menunggu').map(b=>bookingCard(b,true)).join('')}</tbody>`;
}
function emptyState(msg){return `<p style="color:var(--text-soft); font-size:13.5px; padding:20px 0;">${msg}</p>`;}

function filterBooking(el, gridId){
  el.parentElement.querySelectorAll('.tab-item').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const status = el.dataset.status;
  if(gridId==='bsGrid'){
    const arr = bookingSurveiData.filter(b=>b.status===status);
    document.getElementById('bsGrid').innerHTML = arr.map(b=>bookingCard(b,false)).join('') || emptyState('Belum ada booking dengan status ini.');
  } else {
    const arr = bookingMasukData.filter(b=>b.status===status);
    document.getElementById('bmGrid').innerHTML = `<thead><tr><th>Penyewa</th><th>Kos</th><th>Tanggal Survei</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${arr.map(b=>bookingCard(b,true)).join('') || ''}</tbody>`;
    if(arr.length===0) document.getElementById('bmGrid').innerHTML += '';
  }
}

/* ============================= OWNER KOS TABLE ============================= */
function renderOwnerKos(){
  document.getElementById('ownerKosTable').innerHTML = `
    <thead><tr><th>Foto</th><th>Nama Kos</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody>${ownerKosData.map(k=>`
      <tr>
        <td><div class="thumb-sm"></div></td>
        <td><b style="color:var(--night-dark);">${k.name}</b></td>
        <td>${fmtPrice(k.price)}/bulan</td>
        <td><span class="badge ${k.status==='Tersedia'?'disetujui':'ditolak'}">${k.status}</span></td>
        <td><div style="display:flex; gap:6px;"><button class="btn btn-outline btn-sm" onclick="toast('Edit kos (demo)')">Edit</button><button class="btn btn-danger-outline btn-sm" onclick="toast('Kos dihapus (demo)')">Hapus</button></div></td>
      </tr>`).join('')}</tbody>`;

  document.getElementById('latestKosList').innerHTML = ownerKosData.slice(0,3).map(k=>`
    <div class="row-flex" style="padding:9px 0; border-top:1px solid var(--line);">
      <div class="thumb-sm"></div>
      <div style="flex:1;">
        <div style="font-size:13.5px; font-weight:700; color:var(--night-dark);">${k.name}</div>
        <div style="font-size:12px; color:var(--text-soft);">${fmtPrice(k.price)}/bulan</div>
      </div>
    </div>`).join('');
}

/* ============================= NOTIF ============================= */
function renderNotif(){
  document.getElementById('notifList').innerHTML = notifData.map(n=>`
    <div class="notif-item ${n.read?'read':''}">
      <div class="notif-dot"></div>
      <div style="flex:1;">
        <p style="font-size:13.5px; color:var(--text);">${n.text}</p>
        <span style="font-size:11.5px; color:var(--text-soft);">${n.time}</span>
      </div>
    </div>`).join('');
}
function markAllRead(){ notifData.forEach(n=>n.read=true); renderNotif(); toast('Semua notifikasi ditandai dibaca'); }

/* ============================= MINI CHART ============================= */
function renderChart(){
  const vals = [8,11,7,15,9,13,10];
  const max = Math.max(...vals);
  document.getElementById('miniChart').innerHTML = vals.map(v=>`<div class="bar" style="height:${(v/max*100)}%"></div>`).join('');
}

/* ============================= SIDEBAR / NAV ============================= */
const mahasiswaLinks = [
  {p:'beranda', label:'Beranda', icon:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>'},
  {p:'search', label:'Cari Kos', icon:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'},
  {p:'favorit', label:'Favorit', icon:'<path d="M12 21s-7.5-4.7-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.8.7 4.4 2 .6-1.3 2.4-2.3 4.4-2C18 4.5 19.6 8 22 11.7 19.5 16.3 12 21 12 21z"/>'},
  {p:'booking-survei', label:'Booking Survei', icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'},
  {p:'ulasan-saya', label:'Ulasan Saya', icon:'<polygon points="12,2 15,9 22,9.5 16.5,14 18,21 12,17.5 6,21 7.5,14 2,9.5 9,9"/>'},
  {p:'notifikasi', label:'Notifikasi', icon:'<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>'},
  {p:'profil', label:'Profil Saya', icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'},
];
const pemilikLinks = [
  {p:'dashboard-pemilik', label:'Dashboard', icon:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'},
  {p:'kelola-kos', label:'Data Kos', icon:'<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>'},
  {p:'tambah-kos', label:'Tambah Kos', icon:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'},
  {p:'booking-masuk', label:'Booking Masuk', icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'},
  {p:'notifikasi', label:'Notifikasi', icon:'<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>'},
  {p:'profil', label:'Profil Saya', icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'},
];

let currentRole = 'guest'; // guest | mahasiswa | pemilik
let currentPage = 'beranda';

function buildSidebar(){
  const links = currentRole==='pemilik' ? pemilikLinks : mahasiswaLinks;
  const title = currentRole==='pemilik' ? 'Menu Pemilik' : 'Menu Mahasiswa';
  document.getElementById('sidebar').innerHTML = `
    <div class="side-title">${title}</div>
    ${links.map(l=>`<a class="side-link" data-page="${l.p}" onclick="go('${l.p}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${l.icon}</svg>${l.label}</a>`).join('')}
    <a class="side-link logout" onclick="doLogout()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>Logout</a>
  `;
}

function updateTopbarForRole(){
  const shell = document.getElementById('shell');
  if(currentRole==='guest'){
    shell.classList.add('page-shell-guest');
    document.getElementById('guestNav').style.display='flex';
    document.getElementById('topbarActions').innerHTML = `
      <button class="btn btn-ghost btn-sm" onclick="go('login')">Login</button>
      <button class="btn btn-primary btn-sm" onclick="go('register')">Daftar</button>`;
  } else {
    shell.classList.remove('page-shell-guest');
    document.getElementById('guestNav').style.display='none';
    const name = currentUser?.nama || (currentRole==='pemilik' ? 'Pemilik Kos' : 'Pencari Kos');
    const initials = initialsOf(name);
    document.getElementById('topbarActions').innerHTML = `
      <div class="user-chip" onclick="go('profil')">
        <div class="avatar">${initials}</div>
        <span style="font-size:13.5px; font-weight:600; color:var(--night-dark);">${name}</span>
      </div>`;
    buildSidebar();
  }
}

const pageTitles = {
  'beranda':'Beranda','login':'Login','register':'Daftar','search':'Cari Kos','detail':'Detail Kos',
  'tentang':'Tentang Kami','bantuan':'Bantuan',
  'favorit':'Favorit','booking-survei':'Booking Survei','ulasan-saya':'Ulasan Saya',
  'dashboard-pemilik':'Dashboard','kelola-kos':'Data Kos','tambah-kos':'Tambah Kos','booking-masuk':'Booking Masuk',
  'peta':'Peta Lokasi','notifikasi':'Notifikasi','profil':'Profil Saya','edit-profil':'Edit Profil'
};

function go(page){
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+page);
  if(target) target.classList.add('active');

  document.querySelectorAll('#guestNav .navlink').forEach(a=>a.classList.toggle('active', a.dataset.page===page));
  document.querySelectorAll('.side-link').forEach(a=>a.classList.toggle('active', a.dataset.page===page));

  if(page==='profil'){
    renderProfilPage();
    fetchMyProfile(); // ambil data terbaru dari server (endpoint terproteksi JWT)
  }
  window.scrollTo({top:0, behavior:'smooth'});
}

function initialsOf(name){
  return (name||'').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase() || '??';
}

function renderProfilPage(){
  const u = currentUser || { nama:'-', email:'-', role: currentRole, bergabung:null };
  const pemilik = u.role === 'pemilik';
  document.getElementById('profilAvatar').textContent = initialsOf(u.nama);
  document.getElementById('profilName').textContent = u.nama;
  document.getElementById('profilRoleLabel').textContent = pemilik ? 'Pemilik Kos' : 'Pencari Kos';
  document.getElementById('profilNamaInput').value = u.nama;
  document.getElementById('profilEmailInput').value = u.email;
  document.getElementById('profilBergabungInput').value = u.bergabung ? new Date(u.bergabung).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : '-';
}

/* ============================= AUTH ============================= */
/* Sesuaikan alamat ini kalau back end berjalan di host/port lain.
   PENTING: back end (index.js) di-setting CORS hanya untuk origin
   http://localhost:5173, jadi file HTML ini juga harus dibuka lewat
   dev server di port 5173 (mis. `npx serve -l 5173`), bukan dibuka
   langsung dari file:// atau port lain, atau fetch akan diblokir CORS. */
const API_BASE = 'http://localhost:5000/api';

// role di UI: 'mahasiswa' / 'pemilik'  <->  role di back end: 'penyewa' / 'pemilik'
const roleToApi   = r => r === 'mahasiswa' ? 'penyewa' : 'pemilik';
const roleFromApi = r => r === 'penyewa'   ? 'mahasiswa' : 'pemilik';

let authToken  = null;   // JWT disimpan di memori selama sesi berjalan
let currentUser = null;  // {id, nama, email, role, bergabung}

let loginRoleSel = 'mahasiswa';
let regRoleSel = 'mahasiswa';
function setAuthRole(kind, role){
  if(kind==='login'){
    loginRoleSel = role;
    document.getElementById('loginRole-mahasiswa').classList.toggle('active', role==='mahasiswa');
    document.getElementById('loginRole-pemilik').classList.toggle('active', role==='pemilik');
  } else {
    regRoleSel = role;
    document.getElementById('regRole-mahasiswa').classList.toggle('active', role==='mahasiswa');
    document.getElementById('regRole-pemilik').classList.toggle('active', role==='pemilik');
  }
}

function setBtnLoading(id, loading, label){
  const btn = document.getElementById(id);
  if(!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? 'Memproses...' : label;
}

async function doLogin(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  setBtnLoading('loginSubmitBtn', true, 'Masuk');
  try{
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password, role: roleToApi(loginRoleSel) })
    });
    const json = await res.json();

    if(!res.ok){
      toast(json.message || 'Login gagal. Periksa email/password/role.');
      return false;
    }

    authToken   = json.data.token;
    currentUser = { ...json.data.user, role: roleFromApi(json.data.user.role) };
    currentRole = currentUser.role;

    updateTopbarForRole();
    go(currentRole==='pemilik' ? 'dashboard-pemilik' : 'beranda');
    toast(json.message || 'Berhasil masuk');
  } catch(err){
    toast('Tidak bisa terhubung ke server. Pastikan back end berjalan di ' + API_BASE);
    console.error(err);
  } finally {
    setBtnLoading('loginSubmitBtn', false, 'Masuk');
  }
  return false;
}

async function doRegister(e){
  e.preventDefault();
  const nama = document.getElementById('regNama').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  setBtnLoading('regSubmitBtn', true, 'Daftar');
  try{
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ nama, email, password, role: roleToApi(regRoleSel) })
    });
    const json = await res.json();

    if(!res.ok){
      toast(json.message || 'Registrasi gagal.');
      return false;
    }

    toast(json.message || 'Akun berhasil dibuat! Silakan login.');
    setAuthRole('login', regRoleSel);
    go('login');
  } catch(err){
    toast('Tidak bisa terhubung ke server. Pastikan back end berjalan di ' + API_BASE);
    console.error(err);
  } finally {
    setBtnLoading('regSubmitBtn', false, 'Daftar');
  }
  return false;
}

async function fetchMyProfile(){
  if(!authToken) return;
  try{
    const res = await fetch(`${API_BASE}/users/profile`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const json = await res.json();
    if(res.ok){
      currentUser = { ...json.data, role: roleFromApi(json.data.role) };
      renderProfilPage();
    } else if(res.status===401){
      toast('Sesi berakhir, silakan login ulang.');
      doLogout();
    }
  } catch(err){ console.error(err); }
}

function doLogout(){
  authToken = null;
  currentUser = null;
  currentRole = 'guest';
  updateTopbarForRole();
  go('beranda');
  toast('Anda telah logout');
}
function submitTambahKos(e){
  e.preventDefault();
  toast('Kos baru berhasil ditambahkan');
  go('kelola-kos');
  return false;
}
function saveProfile(e){
  e.preventDefault();
  toast('Perubahan profil disimpan');
  go('profil');
  return false;
}

/* ============================= TOAST ============================= */
function toast(msg){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className='toast';
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>${msg}`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .3s ease'; el.style.opacity='0'; setTimeout(()=>el.remove(),300); }, 2600);
}

/* ============================= FAQ / BANTUAN ============================= */
const faqData = [
  {cat:'Akun', q:'Bagaimana cara mendaftar di KOSKU?', a:'Klik tombol "Daftar" di pojok kanan atas, pilih peran sebagai Pencari Kos atau Pemilik Kos, lalu isi nama, email, dan password. Akunmu langsung aktif setelah mendaftar.'},
  {cat:'Akun', q:'Saya lupa password, bagaimana cara mengatasinya?', a:'Di halaman Login, klik "Lupa password?" lalu ikuti instruksi yang dikirim ke emailmu untuk membuat password baru.'},
  {cat:'Akun', q:'Bisakah satu akun dipakai untuk dua peran (pencari & pemilik kos)?', a:'Saat ini setiap akun hanya memiliki satu peran. Jika ingin menjadi pencari sekaligus pemilik kos, silakan daftarkan dua akun dengan email berbeda.'},
  {cat:'Booking & Survei', q:'Bagaimana cara mengajukan survei kos?', a:'Buka halaman Detail Kos yang kamu minati, lalu klik tombol "Booking Survei". Pemilik kos akan menerima permintaanmu dan bisa menyetujui atau menolaknya.'},
  {cat:'Booking & Survei', q:'Apakah booking survei dikenakan biaya?', a:'Tidak. Mengajukan booking survei di KOSKU sepenuhnya gratis untuk pencari kos.'},
  {cat:'Booking & Survei', q:'Bisakah saya membatalkan booking survei?', a:'Bisa, selama status booking masih "Menunggu". Buka halaman Booking Survei Saya lalu klik "Batalkan" pada booking terkait.'},
  {cat:'Kos & Pembayaran', q:'Apakah harga yang tertera sudah termasuk semua fasilitas?', a:'Harga yang ditampilkan adalah harga sewa per bulan. Fasilitas yang termasuk selalu dicantumkan di bagian "Fasilitas" pada Detail Kos — pastikan membacanya sebelum booking.'},
  {cat:'Kos & Pembayaran', q:'Bagaimana cara membayar sewa kos?', a:'Pembayaran sewa dilakukan langsung antara penyewa dan pemilik kos sesuai kesepakatan, di luar aplikasi KOSKU.'},
  {cat:'Untuk Pemilik Kos', q:'Bagaimana cara menambahkan kos baru?', a:'Masuk sebagai Pemilik Kos, buka menu "Tambah Kos" di sidebar, lalu isi detail kos seperti nama, alamat, harga, dan fasilitas.'},
  {cat:'Untuk Pemilik Kos', q:'Bagaimana cara merespons permintaan booking?', a:'Buka menu "Booking Masuk", pilih tab "Menunggu", lalu klik "Setujui" atau "Tolak" pada permintaan yang masuk.'},
];

function accordionItem(item, idx){
  return `
  <div class="accordion-item" id="faq-item-${idx}">
    <div class="accordion-head" onclick="toggleFaq(${idx})">
      <span>${item.q}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
    </div>
    <div class="accordion-body"><p>${item.a}</p></div>
  </div>`;
}

function renderFaq(list){
  const container = document.getElementById('faqContainer');
  if(!list.length){
    container.innerHTML = `<p style="text-align:center; color:var(--text-soft); font-size:13.5px; padding:30px 0;">Tidak ada pertanyaan yang cocok. Coba kata kunci lain.</p>`;
    return;
  }
  const cats = [...new Set(list.map(i=>i.cat))];
  container.innerHTML = cats.map(cat=>`
    <div class="faq-category">${cat}</div>
    ${list.filter(i=>i.cat===cat).map((item)=>accordionItem(item, faqData.indexOf(item))).join('')}
  `).join('');
}

function toggleFaq(idx){
  document.getElementById('faq-item-'+idx).classList.toggle('open');
}

function filterFaq(query){
  const q = query.trim().toLowerCase();
  const filtered = !q ? faqData : faqData.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q));
  renderFaq(filtered);
}

/* ============================= INIT ============================= */
renderAllKosGrids();
renderReviews();
renderBookings();
renderOwnerKos();
renderNotif();
renderChart();
renderFaq(faqData);
go('beranda');
