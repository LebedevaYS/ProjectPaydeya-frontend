import { Link } from "react-router-dom";

export function PublicHeader() {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <img
          src="/img/svg/logo.svg"
          alt="Paideia"
          className="header__logo-pic"
        />
      </Link>

      <div className="header-buttons">
        <Link to="/choice-role" className="btn-register">Регистрация</Link>
        <Link to="/login" className="btn-login">Вход</Link>
      </div>
    </div>
  );
}