export const translateError = (error) => {
  if (!error || typeof error !== "string") {
    return "Неизвестная ошибка";
  }

  const translations = {
    "invalid email or password": "Неверный email или пароль",
    "user with this email already exists": "Пользователь с таким email уже существует",
    "account is blocked": "Аккаунт заблокирован",
    "error hashing password": "Ошибка при создании пароля",
    "error creating user": "Ошибка при создании пользователя",
    "error finding user": "Ошибка при поиске пользователя",
    "invalid refresh token": "Недействительный токен обновления",
    "user not found": "Пользователь не найден",

    "email already exists": "Email уже зарегистрирован",
    "invalid email": "Некорректный email",
    "password too short": "Пароль слишком короткий",
    "invalid role": "Некорректная роль",
    "user already exists": "Пользователь уже существует",

    "network error": "Ошибка сети",
    "failed to fetch": "Ошибка соединения с сервером",

    "bad request": "Неверный запрос",
    "internal server error": "Внутренняя ошибка сервера",
    unauthorized: "Не авторизован",
    "not found": "Не найдено",
  };

  const lowerError = error.toLowerCase().trim();

  if (translations[lowerError]) {
    return translations[lowerError];
  }

  for (const [key, value] of Object.entries(translations)) {
    if (lowerError.includes(key)) {
      return value;
    }
  }

  if (lowerError.startsWith("account is blocked")) {
    const reasonMatch = error.match(/Reason:\s*(.+)/i);
    const reason = reasonMatch ? reasonMatch[1] : "не указана";
    return `Аккаунт заблокирован. Причина: ${reason}`;
  }

  return error;
};

export const validationMessages = {
  emailRequired: "Введите email",
  emailInvalid: "Введите корректный email",
  passwordRequired: "Введите пароль",
  passwordTooShort: "Пароль должен быть не менее 6 символов",
  passwordsNotMatch: "Пароли не совпадают",
  nameRequired: "Введите имя",
  lastNameRequired: "Введите фамилию",
  agreeToTermsRequired: "Необходимо согласие на обработку персональных данных",
};
