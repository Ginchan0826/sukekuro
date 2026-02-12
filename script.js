// スクロールアニメーション (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 対象要素の監視開始
document.querySelectorAll('.fade-in, .section-title, .about-content, .menu-image-wrapper, .instagram-container, .access-content').forEach(el => {
    observer.observe(el);
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* --- 追加機能の制御 --- */

// 1. 画像拡大機能 (モーダル制御)
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

document.querySelectorAll('.clickable').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

function closeModal() {
    modal.style.display = 'none';
}

// 2. 多言語切り替え機能
function switchLang(lang) {
    // ボタンのスタイル更新
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang || (lang === 'ja' && btn.innerText === 'JP')) {
            btn.classList.add('active');
        }
    });

    // テキスト置換
    document.querySelectorAll('.lang-node').forEach(node => {
        const text = node.getAttribute(`data-${lang}`);
        if(text) {
            if (text.includes('<br>')) {
                node.innerHTML = text;
            } else {
                node.innerText = text;
            }
        }
    });
}
/* =====================================================
⭐ microCMS お知らせ機能（ここから追加コード）
===================================================== */


// ======= ★ここを書き換えてください =======
const MICROCMS_SERVICE_ID = "sukekuro-newslist"; // 例: abcd1234
const MICROCMS_API_KEY = "fUCeOvLVNLhJTt8YuJcYJmlYG8lOyYii1VvE"; // 読み取り専用キー
const MICROCMS_ENDPOINT = "news"; // エンドポイント名
// ======================================


async function loadNews() {
const container = document.getElementById('news-list');
if (!container) return;


const url = `https://${MICROCMS_SERVICE_ID}.microcms.io/api/v1/${MICROCMS_ENDPOINT}?limit=5&orders=-publishedAt`;


try {
const res = await fetch(url, {
headers: {
'X-API-KEY': MICROCMS_API_KEY
}
});


const data = await res.json();


container.innerHTML = '';


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



} catch (err) {
console.error('microCMS取得失敗:', err);
container.innerHTML = '<li>現在お知らせを取得できません</li>';
}
}


window.addEventListener('DOMContentLoaded', loadNews);