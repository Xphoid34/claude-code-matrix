export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const message = req.query.message || req.body?.message;
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook not configured' });
    }

    try {
        const response = await fetch(`${webhookUrl}?message=${encodeURIComponent(message)}`);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to reach backend' });
    }
}
