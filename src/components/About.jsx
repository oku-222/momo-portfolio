function About() {
  return (
    <section className="section section--surface" id="about">
      <div className="container">
        <p className="eyebrow">Profile</p>
        <h2 className="section-heading">About</h2>
        <div className="about-layout">
          <div className="profile-placeholder" role="img" aria-label="プロフィール画像は後で差し替え予定">
            <span className="profile-placeholder__mark">M</span>
            <span>Profile image will be added later.</span>
          </div>
          <div className="about-copy">
            <p>
              丁寧なヒアリングと情報整理を大切にし、クライアントの想いを効果的に伝えるデザインを心がけています。表層的な美しさだけでなく、目的を達成するための構造や導線設計に注力し、ユーザーにとって心地よい体験を提供することを目指しています。
            </p>
            <p>
              事業会社でのWebデザイナー、ディレクター経験を経て独立。Webサイト制作全般から、日々の運用、SNSクリエイティブ、そして最新の生成AIを活用した表現手法まで、幅広い領域でデジタルコミュニケーションをサポートします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
