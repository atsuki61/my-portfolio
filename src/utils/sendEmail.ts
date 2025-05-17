import { FormValues } from './validation'; // フォームの入力値の型定義を読み込みます。

// お問い合わせフォームの内容をサーバーサイドのAPIエンドポイントに送信するための非同期関数です。
// data: フォームに入力された値 (名前、メールアドレス、メッセージ)
// 戻り値: 送信処理の成否 (success) とユーザーに表示するメッセージ (message) を含むオブジェクト
export const sendEmail = async (data: FormValues): Promise<{ success: boolean; message: string }> => {
  try {
    // `/api/contact` エンドポイントに対して、POSTメソッドでフォームデータを送信します。
    const res = await fetch('/api/contact', {
      // APIのURL
      method: 'POST', // HTTPメソッド
      headers: { 'Content-Type': 'application/json' }, // リクエストヘッダー: 送信するデータはJSON形式であることを指定
      body: JSON.stringify(data), // リクエストボディ: フォームデータをJSON文字列に変換して設定
    });

    // レスポンスのステータスが "ok" (通常は200番台) でない場合、エラーとして処理します。
    if (!res.ok) {
      throw new Error('送信に失敗しました'); // エラーを発生させます。
    }

    // 送信が成功した場合の戻り値です。
    return { success: true, message: 'メッセージを送信しました！' };
  } catch (err) {
    // 送信処理中に何らかのエラーが発生した場合の処理です。
    console.error(err); // エラー内容をコンソールに出力します。
    // 送信が失敗した場合の戻り値です。
    return { success: false, message: '送信中にエラーが発生しました。' };
  }
};
