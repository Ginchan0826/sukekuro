export default async function handler(req, res) {

  const response = await fetch(
    "https://sukekuro-newslist.microcms.io/api/v1/news",
    {
      headers: {
        "X-API-KEY": process.env.MICROCMS_KEY
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
