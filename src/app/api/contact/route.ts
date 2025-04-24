// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// .env.local で設定した環境変数を使います
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465, // 465ならSSL/TLSで接続
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    // 送信されたJSONを取得
    const { name, email, message } = await request.json();

    // 簡易バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "名前・メール・メッセージは必須です。" },
        { status: 400 }
      );
    }

    // メールオプションを設定
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `お問い合わせ: ${name}さんから`,
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

    // メール送信
    await transporter.sendMail(mailOptions);

    // 送信成功レスポンス
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("メール送信エラー:", err);
    return NextResponse.json(
      { error: "送信中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
