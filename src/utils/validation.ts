// Пароль
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
const passwordMessage = 'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
// Имена
const nameRegex = /^[А-ЯA-Z]+[А-Яа-яЁёA-Za-z\-]+$/;
const nameMessage = 'Разрешена латиница, кириллица и спецсимволы: дефис. Первая буква должна быть заглавной.';
/**
 * Справочник регулярных выражений
 * */
const validationRegex: Record<string, RegExp> = {
  login: /^(?=.*[A-Za-z\-\_])(?=.*[\d]*)[A-Za-z\d\-\_]{3,20}$/,
  password: passwordRegex,
  repeatPassword: passwordRegex,
  oldPassword: passwordRegex,
  first_name: nameRegex,
  second_name: nameRegex,
  email: /^[a-zA-Z0-9\-]+\@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)$/, // "спецсимволы вроде дефиса"?
  phone: /^[\+]{0,1}[\d]{10,15}$/,
};

/**
 * Справочник ошибок
 * */
const validationMessage: Record<string, string> = {
  login: 'Логин должен содержать от 3 до 20 символов. Разрешена латиница, цифры, спецсимволы: дефис и нижнее подчёркивание.',
  password: passwordMessage,
  repeatPassword: passwordMessage,
  oldPassword: passwordMessage,
  first_name: nameMessage,
  second_name: nameMessage,
  email: 'Разрешена латиница, цифры и спецсимволы: дефис. Формат ввода: test@test.com',
  phone: 'Телефон должен содержать от 10 до 15 символов. Разрешены  цифры, может начинается с плюса',
};

/**
 * Функция валидации
 * */
export default function validateValue(rule: string, value: string) {
  const regex = validationRegex[rule];
  if (value.length && !regex.test(value)) {
    return validationMessage[rule];
  }
  return '';
}

