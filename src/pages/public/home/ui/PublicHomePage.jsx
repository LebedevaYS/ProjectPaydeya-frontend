import { Link } from "react-router-dom";

export function PublicHomePage() {
  const ROUTES = {
    login: "/login",
    registration: "/registration",
    choiceRole: "/registration/choice-role",
    teacher: "/teacher",
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        img { max-width: 100%; height: auto; display: block; }
      `}</style>

      <div className="wrapper">
        {/* <PublicHeader /> */}
        <header className="header">
          <div className="header__wrapper">
            <div className="header__logo">
              <Link to="/" className="header__logo-link">
                <img
                  src="/img/svg/logo.svg"
                  alt="Paideia"
                  className="header__logo-pic"
                />
              </Link>
            </div>

            <nav className="header__nav"> 
              <div className="header__nav-card">
                <ul className="header__list">
                  <li className="header__item">
                    <a href="#students" className="header__link">
                      Ученикам
                    </a>
                  </li>
                  <li className="header__item">
                    <a href="#teachers" className="header__link">
                      Преподавателям
                    </a>
                  </li>
                  <li className="header__item">
                    <a href="#about" className="header__link">
                      О платформе
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="header__buttons">
              <Link
                to="/registration/choose-role"
                className="header__button header__button--register"
              >
                Регистрация
              </Link>
              <Link to="/login" className="header__button header__button--login">
                Вход
              </Link>
            </div>
          </div>
        </header>
        {/* MAIN */}
        <main className="main">
          {/* INTRO */}
          <section className="intro" id="about">
            <span className="intro__comm">Интерактивное пространство знаний</span>

            <h1 className="intro__header intro__header--main">
              <span className="intro__header-text">Учиться</span>
              <img
                src="/img/svg/h1.svg"
                alt=""
                className="intro__icon intro__icon--big"
              />
              <span className="intro__header-text">легко</span>
              <img
                src="/img/svg/lines.svg"
                alt=""
                className="intro__icon intro__icon--small"
              />
            </h1>

            <h1 className="intro__header intro__header--sub">
              <span className="intro__header-part">с </span>
              <span className="intro__header-part intro__header-part--accent">
                пайдейей
              </span>
            </h1>

            <p className="intro__description">
              Создавайте живые учебные материалы, делитесь знаниями и помогайте
              студентам учиться через взаимодействие. Платформа объединяет
              преподавателей и учащихся в едином пространстве обучения.
            </p>

            <div className="intro__features">
              <Link
                to={ROUTES.teacher}
                className="intro__feature intro__feature--teachers"
              >
                <div className="intro__feature-content">
                  <h3 className="intro__feature-title">Преподавателям</h3>
                  <p className="intro__feature-text intro__feature-text--light">
                    инструменты для создания интерактивных материалов и продвижения
                  </p>
                </div>
                <div className="intro__feature-image">
                  <img
                    src="/img/svg/arrow-up-circle-1.svg"
                    alt="Для преподавателей"
                    className="intro__feature-icon"
                  />
                </div>
              </Link>

              <a
                href="#students"
                className="intro__feature intro__feature--students"
              >
                <div className="intro__feature-content">
                  <h3 className="intro__feature-title">Ученикам</h3>
                  <p className="intro__feature-text intro__feature-text--gray">
                    наглядные и понятные материалы, интерактивные уроки
                  </p>
                </div>
                <div className="intro__feature-image">
                  <img
                    src="/img/svg/arrow-up-circle-2.svg"
                    alt="Для учеников"
                    className="intro__feature-icon"
                  />
                </div>
              </a>
            </div>
          </section>

          {/* STUDENTS */}
          <section className="students" id="students">
            <h2 className="students__title">Ученикам</h2>
            <p className="students__description">
              Lorem ipsum dolor sit amet consectetur. Erat maecenas eu potenti
              massa. Quis turpis ornare semper vel. Dictumst in euismod sit
              blandit id. Adipiscing ultrices amet sed cras sit turpis quisque
              ornare elementum. Laoreet diam odio magnis amet sem posuere aenean
              rhoncus. Tincidunt aliquam orci curabitur potenti. Posuere dignissim
              aenean cursus pellentesque imperdiet in at amet enim. In nulla
              placerat sollicitudin arcu ultrices phasellus convallis duis morbi.
            </p>

            <div className="students__two-cards">
              <div className="students__card students__card--white">
                <h3 className="students__card-title">
                  <span className="students__card-part students__card-part--primary">
                    Изучайте учебные темы </span>
                  <span className="students__card-part students__card-part--accent">
                    с интересом
                  </span>
                </h3>
                <p className="students__card-text students__card-text--muted">
                  На платформе широкий выбор материала в простой и интересной форме
                </p>
              </div>

              <div className="students__card students__card--blue">
                <h3 className="students__card-title">
                  <span className="students__card-part students__card-part--primary">
                    Отслеживайте свой </span>
                  <span className="students__card-part students__card-part--accent">
                    прогресс
                  </span>
                </h3>
                <p className="students__card-text students__card-text--dark">
                  Статистика поможет вам отслеживать свои успехи и выстроить
                  тайм-менеджмент
                </p>
              </div>
            </div>

            <div className="students__three-cards">
              <div className="students__card students__card--dark">
                <h3 className="students__card-title students__card-title--light">
                  <span className="students__card-part students__card-part--light">
                    Подберите </span>
                  <span className="students__card-part students__card-part--accent-light"> 
                    репетитора
                  </span>
                </h3>
                <p className="students__card-text students__card-text--light">
                  Найдите своего преподавателя, который поможет подтянуть знания
                </p>
              </div>

              <div className="students__card students__card--purple">
                <h3 className="students__card-title">
                  <span className="students__card-part students__card-part--primary">
                    Взаимодействуйте
                  </span>
                  <span className="students__card-part students__card-part--accent-dark">
                    с материалами
                  </span>
                </h3>
                <p className="students__card-text students__card-text--dark">
                  Интерактивные материалы помогут нагляднее понять тему
                </p>
              </div>

              <div className="students__card students__card--gradient">
                <h3 className="students__card-title students__card-title--light">
                  <span className="students__card-part students__card-part--light">
                    Зарегистрируйтесь, чтобы иметь доступ ко всем материалам
                  </span>
                </h3>
                <p className="students__card-text students__card-text--light">
                  Чтобы иметь доступ, необходимо зарегистрироваться
                </p>

                <Link to="/registration?role=student" className="students__card-button">
                  <span className="students__button-text">
                    Зарегистрироваться как ученик
                  </span>
                  <img
                    src="/img/svg/arrow-up-right.svg"
                    alt="Стрелка"
                    className="students__button-icon"
                  />
                </Link>
              </div>
            </div>
          </section>

          {/* CHOICE */}
          <section className="choice">
            <h2 className="choice__title">Выбор редакции</h2>
            <p className="choice__description">
              Lorem ipsum dolor sit amet consectetur. Erat maecenas eu potenti
              massa. Quis turpis ornare semper vel. Dictumst in euismod sit
              blandit id. Adipiscing ultrices amet sed cras sit turpis quisque
              ornare elementum. Laoreet diam odio magnis amet sem posuere aenean
              rhoncus. Tincidunt aliquam orci curabitur potenti. Posuere dignissim
              aenean cursus pellentesque imperdiet in at amet enim. In nulla
              placerat sollicitudin arcu ultrices phasellus convallis duis morbi.
            </p>

            <div className="choice__line">
              <span className="choice__student">Ученикам</span>
              <a href="" className="choice__all">
                <span className="choice__all-text">Смотреть все</span>
                <img
                  src="/img/svg/all.svg"
                  alt="Стрелка"
                  className="choice__all-icon"
                />
              </a>
            </div>

            <div className="choice__cards">
              <a href="/math" className="choice__card choice__card--math">
                <span className="choice__card-text">Математика</span>
              </a>
              <a href="/biology" className="choice__card choice__card--biology">
                <span className="choice__card-text">Биология</span>
              </a>
              <a href="/history" className="choice__card choice__card--history">
                <span className="choice__card-text">История</span>
              </a>
              <a href="/social" className="choice__card choice__card--social">
                <span className="choice__card-text">Общество&shy;знание</span>
              </a>
              <a href="/chemistry" className="choice__card choice__card--chemistry">
                <span className="choice__card-text">Химия</span>
              </a>
              <a href="/informatics" className="choice__card choice__card--informatics">
                <span className="choice__card-text">Информатика</span>
              </a>
              <a href="/astronomy" className="choice__card choice__card--astronomy">
                <span className="choice__card-text">Астрономия</span>
              </a>
              <a href="/literature" className="choice__card choice__card--literature">
                <span className="choice__card-text">Литература</span>
              </a>
              <a href="/english" className="choice__card choice__card--english">
                <span className="choice__card-text">Английский язык</span>
              </a>
              <a href="/russian" className="choice__card choice__card--russian">
                <span className="choice__card-text">
                  Русский<br />
                  язык
                </span>
              </a>
              <a href="/geography" className="choice__card choice__card--geography">
                <span className="choice__card-text">География</span>
              </a>
              <a href="/physics" className="choice__card choice__card--physics">
                <span className="choice__card-text">Физика</span>
              </a>
            </div>
          </section>

          {/* TEACHERS */}
          <section className="teachers" id="teachers">
            <h2 className="teachers__title">Преподавателям</h2>
            <p className="teachers__description">
              Lorem ipsum dolor sit amet consectetur. Erat maecenas eu potenti
              massa. Quis turpis ornare semper vel. Dictumst in euismod sit
              blandit id. Adipiscing ultrices amet sed cras sit turpis quisque
              ornare elementum. Laoreet diam odio magnis amet sem posuere aenean
              rhoncus. Tincidunt aliquam orci curabitur potenti. Posuere dignissim
              aenean cursus pellentesque imperdiet in at amet enim. In nulla
              placerat sollicitudin arcu ultrices phasellus convallis duis morbi.
            </p>

            <div className="teachers__grid">
              <div className="teachers__card teachers__card--wide teachers__card--bg-1">
                <h3 className="teachers__card-title">
                  <span className="teachers__card-part teachers__card-part--primary">
                    Привлекайте новых
                  </span>
                  <span className="teachers__card-part teachers__card-part--accent-blue">
                    учеников
                  </span>
                </h3>
                <p className="teachers__card-text teachers__card-text--muted">
                  Опубликованные материалы помогут Вам найти новых учеников для
                  репетиторства
                </p>
              </div>

              <div className="teachers__card teachers__card--narrow teachers__card--bg-2">
                <h3 className="teachers__card-title">
                  <span className="teachers__card-part teachers__card-part--primary">
                    Создавайте </span>
                  <span className="teachers__card-part teachers__card-part--accent-blue">
                    интерактивные </span>
                  <span className="teachers__card-part teachers__card-part--primary"> уроки
                  </span>
                </h3>
                <p className="teachers__card-text teachers__card-text--dark">
                  Найдите своего преподавателя, который поможет подтянуть знания
                </p>
              </div>

              <div className="teachers__card teachers__card--narrow teachers__card--bg-3">
                <h3 className="teachers__card-title">
                  <span className="teachers__card-part teachers__card-part--primary">
                    Сделайте уроки
                  </span>
                  <span className="teachers__card-part teachers__card-part--accent-dark">
                    увлекательными
                  </span>
                </h3>
                <p className="teachers__card-text teachers__card-text--gray">
                  Интерактивные материалы помогут нагляднее понять тему
                </p>
              </div>

              <div className="teachers__card teachers__card--wide teachers__card--bg-4">
                <h3 className="teachers__card-title teachers__card-title--light">
                  Зарегистрируйтесь, чтобы иметь доступ
                </h3>
                <p className="teachers__card-text teachers__card-text--light">
                  Начните работу на платформе после регистрации
                </p>

                <Link to="/registration?role=teacher" className="teachers__card-button">
                  <span className="teachers__button-text">
                    Зарегистрироваться как преподаватель
                  </span>
                  <img
                    src="/img/svg/arrow-up-right.svg"
                    alt="Стрелка"
                    className="teachers__button-icon"
                  />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__left">
              <nav className="footer__nav">
                <img
                  src="/img/svg/footer_logo.svg"
                  alt="Логотип"
                  className="footer__brand"
                />
                <a href="#!" className="footer__nav-title">Главная</a>
                <a href="#!" className="footer__nav-link">Ученикам</a>
                <a href="#!" className="footer__nav-link">Выбор редакции</a>
                <a href="#!" className="footer__nav-link">Преподавателям</a>
              </nav>

              <div className="footer__column">
                <h3 className="footer__column-title">Ученикам</h3>
                <ul className="footer__list">
                  <li><a href="#!" className="footer__link">Английский язык</a></li>
                  <li><a href="#!" className="footer__link">Астрономия</a></li>
                  <li><a href="#!" className="footer__link">Биология</a></li>
                  <li><a href="#!" className="footer__link">География</a></li>
                  <li><a href="#!" className="footer__link">Информатика</a></li>
                  <li><a href="#!" className="footer__link">История</a></li>
                  <li><a href="#!" className="footer__link">Литература</a></li>
                  <li><a href="#!" className="footer__link">Математика</a></li>
                  <li><a href="#!" className="footer__link">Обществознание</a></li>
                  <li><a href="#!" className="footer__link">Русский язык</a></li>
                  <li><a href="#!" className="footer__link">Физика</a></li>
                  <li><a href="#!" className="footer__link">Химия</a></li>
                </ul>
              </div>

              <div className="footer__column">
                <h3 className="footer__column-title">Преподавателям</h3>
                <ul className="footer__list">
                  <li><a href="#!" className="footer__link">Обучение</a></li>
                  <li><a href="#!" className="footer__link">???</a></li>
                </ul>
              </div>
            </div>

            <div className="footer__right">
              <div className="footer__column">
                <h3 className="footer__column-title">Правовая информация</h3>
                <ul className="footer__list">
                  <li><a href="#!" className="footer__link">Политика конфиденциальности</a></li>
                  <li><a href="#!" className="footer__link">Правила пользования платформой</a></li>
                </ul>
              </div>

              <div className="footer__cookies">
                <p className="footer__cookies-text">
                  Мы используем файлы cookie, для персонализации сервисов и повышения удобства пользования сайтом.
                  Если вы не согласны на их использование, поменяйте настройки браузера.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
