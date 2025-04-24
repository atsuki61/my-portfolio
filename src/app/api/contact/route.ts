import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ● 環境変数を使う（.env.local に設定）
// SMTP_HOST=smtp.example.com
// SMTP_PORT=587
// SMTP_USER=your_user
// SMTP_PASS=your_pass
// MAIL_TO=your_dest@example.com

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true にすると port 465（SSL/TLS）を使う
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** POST /api/contact */
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // シンプルなバリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "全てのフィールドは必須です。" },
        { status: 400 }
      );
    }

    // メール本文の組み立て
    const mailOptions = {
      from: `"Portfolio Site" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `お問い合わせ通知: ${name} さんから`,
      text: `
名前: ${name}
メール: ${email}

メッセージ:
${message}
      `,
      html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <hr />
        <p><strong>メッセージ:</strong></p>
        <p>${message}</p>
      `,
    };

    // 送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("メール送信エラー:", err);
    return NextResponse.json(
      { error: "送信中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
