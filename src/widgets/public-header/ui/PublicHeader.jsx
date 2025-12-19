import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function PublicHeader() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [location]);

  // Функция для очистки localStorage при клике на кнопки авторизации
  const clearAuthAndNavigate = (path) => {
    // Полностью очищаем всё связанное с авторизацией
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken'); // если есть

    // Переходим на нужную страницу
    window.location.href = path;
  };

  // Страницы где нужно скрыть кнопки "Регистрация" и "Вход"
  const hideAuthButtonsPages = [
    '/login',
    '/registration',
    '/choice-role',
    '/teacher/dashboard',
    '/student/dashboard',
    '/materials',
    '/profile'
  ];

  // Определяем нужно ли скрывать кнопки
  const shouldHideAuthButtons = hideAuthButtonsPages.some(path =>
    location.pathname.startsWith(path)
  );

  // Если загружается - показываем пустой хедер
  if (isLoading) {
    return (
      <div className="header">
        <div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div>
        <div className="header-buttons"></div>
      </div>
    );
  }

  // Определяем какие кнопки показывать для текущей страницы
  const getVisibleButtons = () => {
    const path = location.pathname;

    if (user && (path.startsWith('/teacher/') || path.startsWith('/student/'))) {
      return 'user-info'; // Показываем информацию пользователя
    }

    switch(path) {
      case '/login':
        return 'register-only'; // Только "Регистрация"
      case '/choice-role':
      case '/registration':
        return 'login-only';    // Только "Вход"
      default:
        return 'both';          // Обе кнопки
    }
  };

  const visibleButtons = getVisibleButtons();

  // Рендерим хедер в зависимости от visibleButtons
  if (visibleButtons === 'user-info') {
    return (
      <div className="header">
        <div className="logo"><img src="/img/svg/logo.svg" alt="Logo" /></div>
        {/* Информация пользователя */}
      </div>
    );
  }

  return (
    <div className="header">
      <a href="/"><div className="logo">
        <img src="/img/svg/logo.svg" alt="Logo" />
      </div></a>

      <div className="header-buttons">
        {visibleButtons === 'both' && (
          <>
            <a href="/choice-role" className="btn-register" onClick={(e) => { e.preventDefault(); clearAuthAndNavigate('/choice-role'); }}>
              Регистрация
            </a>
            <a href="/login" className="btn-login" onClick={(e) => { e.preventDefault(); clearAuthAndNavigate('/login'); }}>
              Вход
            </a>
          </>
        )}

        {visibleButtons === 'register-only' && (
          <a href="/choice-role" className="btn-register" onClick={(e) => { e.preventDefault(); clearAuthAndNavigate('/choice-role'); }}>
            Регистрация
          </a>
        )}

        {visibleButtons === 'login-only' && (
          <a href="/login" className="btn-login" onClick={(e) => { e.preventDefault(); clearAuthAndNavigate('/login'); }}>
            Вход
          </a>
        )}
      </div>
    </div>
  );
}