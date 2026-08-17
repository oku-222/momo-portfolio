function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a className="brand" href="#top">
          MOMO PORTFOLIO
        </a>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          <a href="#works">Works</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="copyright">© 2026 MOMO PORTFOLIO. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
