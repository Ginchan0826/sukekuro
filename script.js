/* ========================================
   microCMS 設定
======================================== */

const SERVICE_ID = "sukekuro-newslist";
const API_KEY = "6XoNchmbKM1yojG4bAyTRG9GXBGCPkzSkhCH";
const ENDPOINT = "news";

const NEWS_URL =
  `https://${SERVICE_ID}.microcms.io/api/v1/${ENDPOINT}?limit=3`;


/* ========================================
   お知らせ取得（← ★ これが不足してた）
======================================== */

async function loadNews() {

  const container = document.getElementById("newsList");

  try {
    const res = await fetch(NEWS_URL, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY
      }
    });

    const data = await res.json();

    container.innerHTML = "";

    // ★ あなたが貼ってくれたコードをここに移動
    data.contents.forEach(item => {

      const li = document.createElement("li");
      li.className = "news-item fade-in";

      // title = 日付 / content = 本文HTML
      li.innerHTML = `
        <span class="news-date">${item.title}</span>
        <span class="news-title">${item.content}</span>
      `;

      container.appendChild(li);

      observer.observe(li);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<li>読み込み失敗しました</li>";
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
    window.location.href =
      `https://www.instagram.com/${instaUsername}/`;
  }, 800);
}

document.querySelectorAll("[data-instagram]").forEach(el => {
  el.addEventListener("click", openInstagramApp);
});

const mainBtn = document.getElementById("instaLink");
if (mainBtn) {
  mainBtn.addEventListener("click", openInstagramApp);
}
