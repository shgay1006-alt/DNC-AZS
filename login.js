export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("POST만 가능");
  }

  const { id, password } = req.body;

  // 👉 여기서 계정 관리
  const users = [
    { id: "admin", password: "1234", role: "admin" },
    { id: "user", password: "1111", role: "user" }
  ];

  const user = users.find(
    u => u.id === id && u.password === password
  );

  if (user) {
    return res.status(200).json({
      success: true,
      role: user.role
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "로그인 실패"
    });
  }
}