'use client';

import { useForm } from 'react-hook-form';
import { FormValues, formValidation } from '@/utils/validation';
import { sendEmail } from '@/utils/sendEmail';

// このコンポーネントが受け取る情報（props）の形を定義しています。
// particleColor: パーティクルの色を文字列で指定します。
interface ContactSectionProps {
  particleColor: string;
}

// 「Contact」セクションを表示するための主要なコンポーネントです。
export default function ContactSection({ particleColor }: ContactSectionProps) {
  // react-hook-form を使ってフォームの値を管理したり、入力チェック（バリデーション）を簡単に行うための準備をします。
  const {
    register, // input や textarea 要素を react-hook-form に登録する関数
    handleSubmit, // フォーム送信時に実行される関数をラップする関数
    reset, // フォームの内容をリセットする関数
    formState: { errors, isSubmitting }, // フォームの状態（エラー情報や送信中かどうか）
  } = useForm<FormValues>(); // FormValues はフォームの入力項目とその型を定義したもの

  // フォームが送信されたときに実行される処理です。
  // data にはフォームに入力された値が入っています。
  const onSubmit = async (data: FormValues) => {
    // sendEmail関数を使って、入力されたデータをメールで送信します。
    const result = await sendEmail(data);
    if (result.success) {
      // 送信成功時
      alert(result.message); // 成功メッセージを表示
      reset(); // フォームの内容を空にする
    } else {
      // 送信失敗時
      alert(result.message); // 失敗メッセージを表示
    }
  };

  return (
    // セクション全体を囲む部分です。背景色や余白、最小の高さを設定しています。
    <section
      id="contact" // ページ内リンクのためのID
      className="py-20 text-white transition-colors duration-1000 min-h-screen" // スタイルを指定
      style={{ backgroundColor: particleColor }} // 背景色を動的に変更
    >
      {/* セクション内のコンテンツを中央に配置し、横幅を制限します。 */}
      <div className="max-w-lg mx-auto px-4">
        {/* セクションのタイトル「Contact」を表示します。 */}
        <h2 className="text-3xl font-bold text-center font-['Space_Grotesk']">Contact</h2>

        {/* お問い合わせフォーム本体です。送信時に onSubmit 関数が呼ばれます。 */}
        <form
          onSubmit={handleSubmit(onSubmit)} // フォーム送信時の処理を指定
          className="mt-6 space-y-4" // フォームのスタイル
        >
          {/* 「Name」入力フィールドの部分です。 */}
          <div>
            <label
              htmlFor="name" // input要素とラベルを関連付ける
              className="block text-sm font-medium text-gray-300" // ラベルのスタイル
            >
              Name
            </label>
            <input
              id="name" // label の htmlFor と対応
              type="text" // 入力の種類はテキスト
              {...register('name', formValidation.name)} // react-hook-form に 'name' として登録し、入力ルールも指定
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500" // 入力フィールドのスタイル
            />
            {/* 'name' フィールドに入力エラーがある場合にメッセージを表示します。 */}
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* 「Email」入力フィールドの部分です。 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', formValidation.email)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {/* 'email' フィールドに入力エラーがある場合にメッセージを表示します。 */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 「Message」入力フィールド（複数行テキストエリア）の部分です。 */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4} // 表示する行数
              {...register('message', formValidation.message)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {/* 'message' フィールドに入力エラーがある場合にメッセージを表示します。 */}
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* 送信ボタンです。 */}
          <button
            type="submit" // ボタンの種類を送信ボタンに指定
            disabled={isSubmitting} // 送信中はボタンを押せないようにする
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-500" // ボタンのスタイル
          >
            {/* 送信中かどうかでボタンのテキストを切り替えます。 */}
            {isSubmitting ? '送信中…' : '送信'}
          </button>
        </form>
      </div>
    </section>
  );
}
