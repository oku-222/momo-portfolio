import { useState } from 'react';

const navItems = [
  ['Works', '#works'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" onClick={() => setIsMenuOpen(false)}>
          MOMO PORTFOLIO
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map(([label, href]) => (
            <a className="nav-link" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="モバイルナビゲーション">
        {navItems.map(([label, href]) => (
          <a className="nav-link" href={href} key={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
