export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { mobile } = req.body;
  const authKey = process.env.MSG91_AUTH_KEY;

  try {
    // यहाँ हमने API का तरीका थोड़ा बदल दिया है
    const url = `https://control.msg91.com/api/v5/otp?mobile=91${mobile}&authkey=${authKey}&otp_length=4&template_id=`; // खाली template_id भेजा है
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();

    // अब अगर कोई भी एरर होगा तो ये हमें साफ़-साफ़ बता देगा
    if (data.type === 'success') {
      return res.status(200).json({ success: true, message: 'OTP भेज दिया गया है!' });
    } else {
      return res.status(200).json({ success: false, message: JSON.stringify(data) });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
