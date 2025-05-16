'use client';

import { useForm } from 'react-hook-form';
import { FormValues, formValidation } from '@/utils/validation';
import { sendEmail } from '@/utils/sendEmail';

export default function ContactSection() {
  // ① react-hook-form のセットアップ
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // ② フォーム送信時の処理
  const onSubmit = async (data: FormValues) => {
    const result = await sendEmail(data);
    if (result.success) {
      alert(result.message);
      reset(); // フォームをクリア
    } else {
      alert(result.message);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#1A1A2E] text-white">
      <div className="max-w-lg mx-auto px-4">
        {/* セクション見出し */}
        <h2 className="text-3xl font-bold text-center font-['Space_Grotesk']">Contact</h2>

        {/* ③ フォーム本体 */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* 名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', formValidation.name)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* メール */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', formValidation.email)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* メッセージ */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message', formValidation.message)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-500"
          >
            {isSubmitting ? '送信中…' : '送信'}
          </button>
        </form>
      </div>
    </section>
  );
}
