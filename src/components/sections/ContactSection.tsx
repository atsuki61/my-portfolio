"use client";

import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  // ① react-hook-form のセットアップ
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // ② フォーム送信時の処理
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      alert("メッセージを送信しました！");
      reset(); // フォームをクリア
    } catch (err) {
      console.error(err);
      alert("送信中にエラーが発生しました。");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white text-black">
      <div className="max-w-lg mx-auto px-4">
        {/* セクション見出し */}
        <h2 className="text-3xl font-bold text-center">Contact</h2>

        {/* ③ フォーム本体 */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* 名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "名前は必須です" })}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* メール */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "正しいメールアドレスを入力してください",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* メッセージ */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message", { required: "メッセージは必須です" })}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {isSubmitting ? "送信中…" : "送信"}
          </button>
        </form>
      </div>
    </section>
  );
}
