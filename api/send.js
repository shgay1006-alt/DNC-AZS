import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).send("POST만 가능");
  }

  try {
    const { name, email, message } = req.body;

    const msg = {
      to: '관리자이메일@gmail.com',
      from: '인증된이메일@gmail.com',
      subject: '폼 제출',
      text: `이름: ${name}\n이메일: ${email}\n내용: ${message}`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "메일 전송 실패" });
  }
}