import SectionLabel from '../common/SectionLabel';
import SectionTitle from '../common/SectionTitle';
import ExperienceCard from './ExperienceCard';
import { experience } from '../../data/portfolioData';

export default function Experience() {
    return (
        <section id="experience" className="section-padding relative">
            <div className="max-w-7xl mx-auto">
                <SectionLabel index="02" accent="cyan">work_history</SectionLabel>
                <div className="mt-4 mb-12 max-w-3xl">
                    <SectionTitle highlight="track record.">
                        Production-grade
                    </SectionTitle>
                </div>

                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[5px] sm:left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-green/40 via-neon-cyan/30 to-transparent" />

                    <div className="space-y-6">
                        {experience.map((item, i) => (
                            <ExperienceCard
                                key={item.company + item.role}
                                item={item}
                                index={i}
                                defaultOpen={i === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}