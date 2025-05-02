export type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const formValidation = {
  name: {
    required: "名前は必須です"
  },
  email: {
    required: "メールアドレスは必須です",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "正しいメールアドレスを入力してください"
    }
  },
  message: {
    required: "メッセージは必須です"
  }
};
