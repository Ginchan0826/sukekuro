// ===== スクロール進捗バー =====
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 監視対象の要素を取得
const elementsToObserve = document.querySelectorAll(
    '.section-title, .about-content, .menu-wrapper, .instagram-container, .access-content, .fade-in'
);

elementsToObserve.forEach(el => observer.observe(el));

// ===== スムーズスクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = 90;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ヘッダーのスクロール時の挙動 =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール位置が50px以上の時にシャドウを強くする
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
    }
    
    lastScroll = currentScroll;
});

// ===== 画像の遅延読み込み（パフォーマンス向上） =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ===== ページ読み込み時のアニメーション =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== ホバーエフェクトの強化（デスクトップのみ） =====
if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.access-info, .instagram-note, .image-frame');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== Instagram埋め込みの読み込み完了確認 =====
window.addEventListener('load', () => {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
});
// ===== microCMS お知らせ取得 =====

const SERVICE_ID = "sukekuro-newslist";
const API_KEY = "6XoNchmbKM1yojG4bAyTRG9GXBGCPkzSkhCH";
const API_ENDPOINT = "news";


const newsList = document.getElementById("news-list");

async function fetchNews() {
    try {
        const res = await fetch(
            `https://${SERVICE_ID}.microcms.io/api/v1/${API_ENDPOINT}`,
            {
                headers: {
                    "X-MICROCMS-API-KEY": API_KEY
                }
            }
        );

        const data = await res.json();

        // 中身クリア
        newsList.innerHTML = "";

        data.contents.forEach(item => {
    const article = document.createElement("div");
    article.className = "news-item";

    // contentのHTMLタグを削除してテキストだけにする
    const textContent = item.content.replace(/<[^>]*>?/gm, "");

    article.innerHTML = `
        <span class="news-date">${item.title}</span>
        <span class="news-content">${textContent}</span>
    `;

    newsList.appendChild(article);
});


    } catch (err) {
        newsList.innerHTML = "<p>お知らせの取得に失敗しました</p>";
        console.error(err);
    }
}

fetchNews();
// 画像拡大
const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('img');

document.querySelectorAll('.image-frame img, .menu-image, .map-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('show');
    });
});

// モーダル閉じる
modal.addEventListener('click', () => {
    modal.classList.remove('show');
});
