// LoginPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PublicHeader } from "../../../../widgets/public-header";
import { WelcomeBlock } from "../../../../widgets/welcome-block";
import { FloatingInput } from "../../../../shared/ui/FloatingInput/FloatingInput";
import { PasswordInput } from "../../../../shared/ui/PasswordInput/PasswordInput";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Используйте прокси /api вместо полного URL
  const API_BASE = '/api'; // Vite проксирует на https://paydeya-backend.onrender.com/api/v1

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      setError("Введите email");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Введите корректный email");
      return false;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return false;
    }

    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Успешный вход
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        navigate("/");
      } else {
        // Переводим английские сообщения на русский
        let errorMessage = data.error || "Ошибка входа";

        const errorTranslations = {
          "invalid email or password": "Неверный email или пароль",
          "user not found": "Пользователь не найден",
          "incorrect password": "Неверный пароль",
          "email already exists": "Email уже зарегистрирован",
          "invalid token": "Недействительный токен",
          "unauthorized": "Не авторизован",
          "access denied": "Доступ запрещен"
        };

        // Ищем перевод
        const translatedError = errorTranslations[errorMessage.toLowerCase()];
        if (translatedError) {
          errorMessage = translatedError;
        }

        setError(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Введите ваш email для восстановления пароля:");

    if (!email) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Инструкции отправлены на email");
      } else {
        alert(data.error || "Ошибка отправки запроса");
      }
    } catch (err) {
      alert("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <div className="main-container">
        <div className="auth-section">
          <div className="auth-title">Авторизация</div>

          {error && (
            <div className="error-message" style={{
              color: "red",
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#ffe6e6",
              borderRadius: "5px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
           <FloatingInput
               id="email"
               type="email"
               label="e-mail"
               required
               value={formData.email}
               onChange={handleInputChange}
               disabled={isLoading}
             />

             <PasswordInput
               id="password"
               label="Пароль"
               required
               value={formData.password}
               onChange={handleInputChange}
               disabled={isLoading}
             />

            <div className="password-link">
              Забыли пароль?{" "}
              <button
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4A6FFF",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "inherit"
                }}
                disabled={isLoading}
              >
                Восстановить
              </button>
            </div>

            <label className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              Запомнить меня
            </label>

            <div className="auth-actions">
              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Вход..." : "Войти"}
              </button>

              <div className="register-link">
                Ещё нет аккаунта? <Link to="/choice-role">Зарегистрироваться</Link>
              </div>
            </div>
          </form>
        </div>

        <WelcomeBlock />
      </div>
    </>
  );
}