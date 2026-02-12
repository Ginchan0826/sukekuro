export default async function handler(req, res) {
  // GitHub Pagesからのアクセスを許可するためのヘッダー
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const response = await fetch(
    "https://sukekuro-newslist.microcms.io/api/v1/news",
    {
      headers: {
        "X-API-KEY": process.env.MICROCMS_KEY // 環境変数のKey名
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}