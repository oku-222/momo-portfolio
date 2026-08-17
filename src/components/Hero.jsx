function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <p className="eyebrow hero__eyebrow">MOMO PORTFOLIO</p>
        <h1 className="hero__title">
          想いを整理し、
          <br />
          伝わるかたちへ。
        </h1>
        <p className="hero__lead">Web Designer / Digital Creator</p>
        <ul className="hero__services" aria-label="提供サービス">
          <li>Web Design</li>
          <li>Web Direction</li>
          <li>Web Operation</li>
          <li>SNS Creative</li>
          <li>AI Creative</li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
