export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { mobile } = req.body;
  const authKey = process.env.MSG91_AUTH_KEY;

  try {
    // MSG91 WhatsApp OTP API Endpoint
    // ध्यान दें: यहाँ हमने चैनल 'whatsapp' सेट किया है
    const url = `https://control.msg91.com/api/v5/otp?mobile=91${mobile}&authkey=${authKey}&otp_length=4&channel=4`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (data.type === 'success' || data.status === 'success') {
      return res.status(200).json({ success: true, message: 'WhatsApp पर OTP भेज दिया गया है!' });
    } else {
      return res.status(400).json({ success: false, message: data.message || 'WhatsApp OTP भेजने में विफल!' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
