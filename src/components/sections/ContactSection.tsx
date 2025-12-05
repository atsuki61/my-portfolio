'use client';

import { useForm } from 'react-hook-form';
import { FormValues, formValidation } from '@/utils/validation';
import { sendEmail } from '@/utils/sendEmail';
import { Label, Input, Textarea } from '../ui/form-components';
import { FaGithub, FaSquareXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const result = await sendEmail(data);
    if (result.success) {
      alert(result.message);
      reset();
    } else {
      alert(result.message);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 text-white min-h-screen flex items-center justify-center relative overflow-hidden bg-(--theme-bg) transition-colors duration-1000 ease-in-out"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-(--theme-accent) opacity-20 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-(--theme-accent) opacity-20 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000" />

      <div className="max-w-6xl w-full mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
              制作の依頼やご質問、雑談など、お気軽にご連絡ください。
              <br />
              SNSのDMでも受け付けています！
            </p>
          </div>

          <div className="flex justify-center lg:justify-start gap-6">
            <a
              href="https://github.com/atsuki61"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:scale-110 group"
            >
              <FaGithub className="text-3xl text-gray-300 group-hover:text-(--theme-accent) transition-colors duration-300" />
            </a>
            <a
              href="https://x.com/atsuki_prog_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:scale-110 group"
            >
              <FaSquareXTwitter className="text-3xl text-gray-300 group-hover:text-(--theme-accent) transition-colors duration-300" />
            </a>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-default">
              <BiLogoGmail className="text-3xl text-gray-300 group-hover:text-red-400 transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-(--theme-card) backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative transition-colors duration-1000 ease-in-out">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                {...register('name', formValidation.name)}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                type="email"
                {...register('email', formValidation.email)}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="ここにメッセージを入力してください..."
                rows={5}
                {...register('message', formValidation.message)}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-(--theme-accent) text-(--theme-bg) font-bold py-3 rounded-xl 
                         hover:brightness-110 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
