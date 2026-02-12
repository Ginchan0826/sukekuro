/* ========================================
   microCMS 設定
======================================== */

const SERVICE_ID = "sukekuro-newslist";
const API_KEY = "EG8Cb3HRmE8LQHjrAGNIP23OL9ixZffOtKoV";
const ENDPOINT = "news";

const NEWS_URL = `https://${SERVICE_ID}.microcms.io/api/v1/${ENDPOINT}?limit=3`;


/* ========================================
   お知らせ取得
======================================== */

async function loadNews() {
  const container = document.getElementById("newsList");

  try {
    const res = await fetch(NEWS_URL, {
      headers: { "X-MICROCMS-API-KEY": API_KEY }
    });

    const data = await res.json();

    container.innerHTML = "";

    data.contents.forEach(item => {

      // ★ ここがあなた仕様（title＝日付 / content＝本文）
      const li = document.createElement("li");
      li.className = "news-card fade-in";

      li.innerHTML = `
        <div class="news-date">${item.title}</div>
        <div class="news-content">${item.content}</div>
      `;

      container.appendChild(li);
    });

  } catch (err) {
    container.innerHTML = "<p>読み込み失敗しました</p>";
    console.error(err);
  }
}

loadNews();



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
 
