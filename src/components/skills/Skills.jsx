import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import SkillCard from './SkillCard';
import { skillGroups } from '../../data/portfolioData';
 
export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="03" accent="purple">tech_stack</SectionLabel>
        <div className="mt-4 mb-12 max-w-3xl">
          <SectionTitle highlight="toolchain.">
            Battle-tested
          </SectionTitle>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.title} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}