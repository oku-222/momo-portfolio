import { assetPath } from '../utils/assetPath';

function FeaturedCaseStudy({ works }) {
  const orbStation = works.find((work) => work.id === 1);
  const orbSocial = works.find((work) => work.id === 9);

  return (
    <section className="section" id="case-study">
      <div className="container">
        <p className="eyebrow">Featured Project</p>
        <h2 className="section-heading">Featured Case Study</h2>
        <div className="case-study">
          <div className="case-study__visuals">
            <figure className="case-study__visual">
              <img src={assetPath(orbStation.image)} alt="ORB STATION Web Design" loading="lazy" />
            </figure>
            <figure className="case-study__visual">
              <img src={assetPath(orbSocial.image)} alt="ORB STATION Instagram Creative" loading="lazy" />
            </figure>
          </div>
          <div className="case-study__content">
            <h3 className="case-study__title">ORB STATION Website Renewal</h3>
            <div className="case-study__meta">
              <div>
                <p className="label">Role</p>
                <p>Web / Direction</p>
              </div>
              <div>
                <p className="label">Tools</p>
                <p>Figma, WordPress</p>
              </div>
            </div>
            <div className="case-study__body">
              <div>
                <h4>Overview</h4>
                <p>
                  音声療法サロンWebサイトリニューアル。ブランドの認知拡大と新規顧客獲得を目的としたコーポレートサイトのフルリニューアルプロジェクトです。
                </p>
              </div>
              <div>
                <h4>Challenge &amp; Approach</h4>
                <p>
                  複雑だった情報設計を整理し、ユーザーが直感的に目的のコンテンツへ辿り着ける導線を構築。余白を活かしたミニマルな構成で、サービスの質の高さを表現しました。
                </p>
              </div>
            </div>
            <a className="text-link" href="#" aria-label="ORB STATIONのプロジェクト詳細（後でリンクを設定）">
              View Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCaseStudy;
