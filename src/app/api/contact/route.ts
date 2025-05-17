// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'; // Next.js のサーバーレスポンスオブジェクトを読み込みます。
import nodemailer from 'nodemailer'; // メール送信ライブラリ nodemailer を読み込みます。

// 環境変数 (.env.local ファイルなど) からメールサーバーの設定を読み込み、
// nodemailer のトランスポーター（メール送信機能を提供するオブジェクト）を作成します。
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTPサーバーのホスト名
  port: Number(process.env.SMTP_PORT || 587), // SMTPサーバーのポート番号 (デフォルトは587)
  secure: Number(process.env.SMTP_PORT) === 465, // ポートが465の場合はSSL/TLSで接続します。
  auth: {
    // SMTPサーバーの認証情報
    user: process.env.SMTP_USER, // SMTPユーザー名
    pass: process.env.SMTP_PASS, // SMTPパスワード
  },
});

// HTTP POSTリクエストを処理する非同期関数です。
// お問い合わせフォームからのデータを受け取り、メールを送信します。
export async function POST(request: Request) {
  try {
    // リクエストボディからJSON形式で送信されたデータを取得します。
    const { name, email, message } = await request.json();

    // 簡単な入力チェック（バリデーション）を行います。
    // 名前、メールアドレス、メッセージが空の場合はエラーレスポンスを返します。
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '名前・メール・メッセージは必須です。' }, // エラーメッセージ
        { status: 400 }, // HTTPステータスコード 400 (Bad Request)
      );
    }

    // 送信するメールの内容を設定します。
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`, // 送信元メールアドレス (表示名と実際のメールアドレス)
      to: process.env.MAIL_TO, // 送信先メールアドレス (環境変数で設定)
      subject: `お問い合わせ: ${name}さんから`, // メールの件名
      // プレーンテキスト形式のメール本文
      text: `
名前: ${name}
メール: ${email}

メッセージ:
${message}
      `,
      // HTML形式のメール本文 (よりリッチな表示が可能)
      html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <hr />
        <p><strong>メッセージ:</strong></p>
        <p>${message}</p>
      `,
    };

    // メール送信処理をバックグラウンドで実行します (await で待たない)。
    // これにより、メール送信の完了を待たずにクライアントに素早くレスポンスを返すことができます。
    transporter
      .sendMail(mailOptions)
      .then(() => console.log('メール送信OK')) // 送信成功時のログ出力
      .catch((err) => console.error('送信NG', err)); // 送信失敗時のエラーログ出力

    // メール送信処理を受け付けたことを示すレスポンスをクライアントに返します。
    return NextResponse.json(
      { queued: true }, // メールが処理キューに入ったことを示す
      { status: 202 }, // HTTPステータスコード 202 (Accepted)
    );
  } catch (err) {
    // 予期せぬエラーが発生した場合の処理です。
    console.error('レスポンス作成エラー:', err);
    return NextResponse.json(
      { error: '送信中にエラーが発生しました。' }, // エラーメッセージ
      { status: 500 }, // HTTPステータスコード 500 (Internal Server Error)
    );
  }
}
