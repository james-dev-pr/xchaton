import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { to, text } = req.body;
  const url = `https://graph.facebook.com/v19.0/${process.env.PHONE_ID}/messages`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    })
  });
  res.status(resp.ok ? 200 : 500).json(await resp.json());
}
