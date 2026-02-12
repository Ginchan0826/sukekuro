
// ================================
// Intersection Observer
// ================================

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

document.querySelectorAll('.fade-in, .section-title, .about-content, .menu-image-wrapper, .instagram-container, .access-content')
.forEach(el => observer.observe(el));


// ================================
// スムーズスクロール
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


// ================================
// 画像拡大モーダル
// ================================

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


// ================================
// 多言語切り替え
// ================================

function switchLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang || (lang === 'ja' && btn.innerText === 'JP')){
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.lang-node').forEach(node => {
        const text = node.getAttribute(`data-${lang}`);
        if(text){
            node.innerHTML = text.includes('<br>') ? text : text;
        }
    });
}


// ================================
// 【⑤】ヘッダー透明化
// ================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ================================
// microCMS NEWS
// ================================

fetch("/api/news")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });


async function loadNews() {
    const container = document.getElementById('news-list');
    if (!container) return;

    try {
        // 直接microCMSではなく、作成したAPIルート(/api/news)を叩く
        const res = await fetch("/api/news");
        const data = await res.json();

        container.innerHTML = '';

        if (!data.contents || data.contents.length === 0) {
            container.innerHTML = '<li>現在お知らせはありません</li>';
            return;
        }

        data.contents.forEach(item => {
            const li = document.createElement('li');
            li.className = 'news-item fade-in';

            // 日付のフォーマット（例: 2026.02.13）
            const date = new Date(item.publishedAt || item.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.');

            // item.content は microCMSで設定したフィールド名に合わせてください
            li.innerHTML = `
                <span class="news-date">${date}</span>
                <span class="news-title">${item.content || item.title}</span>
            `;

            container.appendChild(li);
            // Intersection Observerを適用
            if (window.observer) {
                window.observer.observe(li);
            }
        });

    } catch (err) {
        console.error("News Load Error:", err);
        container.innerHTML = '<li>現在お知らせを取得できません</li>';
    }
}

window.addEventListener('DOMContentLoaded', loadNews);

