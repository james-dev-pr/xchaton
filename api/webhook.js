export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { 'hub.mode': m, 'hub.verify_token': t, 'hub.challenge': c } = req.query;
    return m === 'subscribe' && t === process.env.VERIFY_TOKEN
      ? res.status(200).send(c)
      : res.sendStatus(403);
  }

  if (req.method === 'POST') {
    const entry = req.body?.entry?.[0]?.changes?.[0]?.value;
    console.log(entry);
    return res.sendStatus(200);
  }

  res.sendStatus(405);
}
