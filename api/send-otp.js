export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { mobile } = req.body;
  const authKey = process.env.MSG91_AUTH_KEY;

  try {
    const response = await fetch(`https://api.msg91.com/api/v5/otp?authkey=${authKey}&mobile=${mobile}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return res.status(200).json({ success: true, message: 'OTP Sent!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

