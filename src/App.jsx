import { useLayoutEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import GraphicWorks from './components/GraphicWorks';
import SNSCreative from './components/SNSCreative';
import FeaturedCaseStudy from './components/FeaturedCaseStudy';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { worksData } from './data/works';

const filters = ['ALL', 'WEB', 'GRAPHIC', 'SNS'];

function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const showCategory = (category) => activeFilter === 'ALL' || activeFilter === category.toUpperCase();

  useLayoutEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll('main > section:not(.hero), main .work-card, main .ai-gallery__item'),
    );

    document.documentElement.classList.add('js-scroll-reveal');
    revealTargets.forEach((target) => target.classList.add('scroll-reveal-target'));

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [activeFilter]);

  const webWorks = worksData.filter((work) => work.category === 'Web');
  const graphicWorks = worksData.filter((work) => work.category === 'Graphic');
  const snsWorks = worksData.filter((work) => work.category === 'SNS');
  const aiWorks = worksData.filter((work) => work.category === 'AI Creative');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWorks
          works={webWorks}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        {showCategory('Graphic') && <GraphicWorks works={graphicWorks} aiWorks={aiWorks} />}
        {showCategory('SNS') && <SNSCreative works={snsWorks} />}
        {showCategory('Web') && <FeaturedCaseStudy works={worksData} />}
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
