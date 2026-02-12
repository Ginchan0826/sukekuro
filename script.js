const serviceId = "YOUR_SERVICE_ID";      // microCMS サービスID
const apiKey = "YOUR_API_KEY";            // 読み取り専用 API キー
const endpoint = "news";                  // お知らせ API のエンドポイント

const url = `https://${serviceId}.microcms.io/api/v1/${endpoint}`;

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

