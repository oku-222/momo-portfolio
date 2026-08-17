import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import GraphicWorks from './components/GraphicWorks';
import SNSCreative from './components/SNSCreative';
import FeaturedCaseStudy from './components/FeaturedCaseStudy';
import About from './components/About';
import Skills from './components/Skills';
import AICreative from './components/AICreative';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { worksData } from './data/works';

const filters = ['All', 'Web', 'Graphic', 'SNS', 'AI Creative'];

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const showCategory = (category) => activeFilter === 'All' || activeFilter === category;

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
        {showCategory('Graphic') && <GraphicWorks works={graphicWorks} />}
        {showCategory('SNS') && <SNSCreative works={snsWorks} />}
        {showCategory('Web') && <FeaturedCaseStudy works={worksData} />}
        <About />
        <Skills />
        {showCategory('AI Creative') && <AICreative works={aiWorks} />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
