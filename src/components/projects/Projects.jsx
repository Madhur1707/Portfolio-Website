import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolioData';
 
export default function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="04" accent="orange">featured_work</SectionLabel>
        <div className="mt-4 mb-12 max-w-3xl">
          <SectionTitle highlight="shipping.">
            Selected projects.
          </SectionTitle>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
 