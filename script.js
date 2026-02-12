/* ========================================
   microCMS 設定
======================================== */

const SERVICE_ID = "sukekuro-newslist";
const API_KEY = "6XoNchmbKM1yojG4bAyTRG9GXBGCPkzSkhCH";
const ENDPOINT = "news";

const NEWS_URL = `https://${SERVICE_ID}.microcms.io/api/v1/${ENDPOINT}?limit=3`;


data.contents.forEach(item => {
    const li = document.createElement('li');
    li.className = 'news-item fade-in';

    li.innerHTML = `
        <span class="news-date">${item.title}</span>
        <span class="news-title">${item.content}</span>
    `;

    container.appendChild(li);

    observer.observe(li);
});



/* ========================================
   フェードインアニメ
======================================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});



/* ========================================
   Instagram アプリ起動（スマホ対応）
======================================== */

const instaUsername = "sukekuro.onigiri";

function openInstagramApp(e) {
  e.preventDefault();

  // アプリ起動
  window.location.href = `instagram://user?username=${instaUsername}`;

  // 失敗時Web
  setTimeout(() => {
    window.location.href = `https://www.instagram.com/${instaUsername}/`;
  }, 800);
}

document.querySelectorAll("[data-instagram]").forEach(el => {
  el.addEventListener("click", openInstagramApp);
});

document.getElementById("instaLink")
 
