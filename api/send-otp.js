export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { mobile } = req.body;
  const authKey = process.env.MSG91_AUTH_KEY || "562352AuOaK5zVBl6a860e4bP1";

  try {
    // MSG91 v5 OTP API
    const url = `https://control.msg91.com/api/v5/otp?mobile=91${mobile}&authkey=${authKey}&otp_length=4`;
    const response = await fetch(url);
    const data = await response.json();

    // अब यह चेक करेगा कि MSG91 ने असल में भेजा या नहीं
    if (data.type === 'success') {
      return res.status(200).json({ success: true, message: 'OTP भेज दिया गया है!' });
    } else {
      return res.status(400).json({ success: false, message: data.message || 'Template ID या DLT की कमी के कारण मैसेज रुका!' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
