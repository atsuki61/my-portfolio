import { FormValues } from './validation';

export const sendEmail = async (data: FormValues): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error("送信に失敗しました");
    }
    
    return { success: true, message: "メッセージを送信しました！" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "送信中にエラーが発生しました。" };
  }
};
