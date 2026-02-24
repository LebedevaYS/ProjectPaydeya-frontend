export function WelcomeBlock() {
  return (
    <div className="welcome-section">
      <div className="welcome-title">
        Создавайте живые учебные материалы <span className="highlight">быстро</span>
      </div>

      <div className="welcome-image">
        <img src="/img/svg/image.svg" className="welcome-img" alt="Welcome" />
      </div>

      <div className="welcome-text">
        <a>
          Учитесь с интересом и <br />
          достигайте целей
        </a>
        <div className="log_image">
          <img src="/img/svg/log_image.svg" className="img_with_logo" alt="Logo text" />
        </div>
      </div>
    </div>
  );
}
