
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SystemUnificationDiagram, DataPipelineDiagram, LatencyOptimizationChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Mail, Linkedin, MapPin, Phone } from 'lucide-react';

const InfoCard = ({ title, subtitle, date, details, delay }: { title: string, subtitle: string, date: string, details?: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full hover:border-nobel-gold/50 h-full relative overflow-hidden" style={{ animationDelay: delay }}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nobel-gold to-transparent opacity-30"></div>
      <h3 className="font-serif text-xl text-stone-900 text-center mb-2">{title}</h3>
      <p className="text-xs text-nobel-gold font-bold uppercase tracking-widest text-center mb-4">{subtitle}</p>
      <div className="w-8 h-0.5 bg-stone-200 mb-4"></div>
      <p className="text-sm text-stone-500 font-medium italic mb-2">{date}</p>
      {details && <p className="text-sm text-stone-600 text-center leading-relaxed mt-2">{details}</p>}
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-nobel-gold font-serif font-bold text-xl shadow-sm pb-1">Y</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              YUJING CHEN
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#experience" onClick={scrollToSection('experience')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Experience</a>
            <a href="#optimization" onClick={scrollToSection('optimization')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
            <a href="#education" onClick={scrollToSection('education')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Education</a>
            <a 
              href="mailto:vcjobapps@gmail.com" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Contact Me
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#experience" onClick={scrollToSection('experience')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Experience</a>
            <a href="#optimization" onClick={scrollToSection('optimization')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
            <a href="#education" onClick={scrollToSection('education')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Education</a>
             <a href="mailto:vcjobapps@gmail.com" onClick={() => setMenuOpen(false)} className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer">
              Contact
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Portfolio
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Yujing Chen <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Software Engineer</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-8">
            Specializing in architectural unification, high-performance systems, and full-stack development.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-500 font-medium mb-12">
             <span className="flex items-center gap-1"><MapPin size={14}/> New York, NY</span>
             <span className="flex items-center gap-1"><Phone size={14}/> (929) 813-2756</span>
             <a href="mailto:vcjobapps@gmail.com" className="flex items-center gap-1 hover:text-nobel-gold transition-colors"><Mail size={14}/> vcjobapps@gmail.com</a>
             <a href="https://linkedin.com/in/vclk" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-nobel-gold transition-colors"><Linkedin size={14}/> linkedin.com/in/vclk</a>
          </div>
          
          <div className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>EXPLORE WORK</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / About */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Profile</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Architecting Clarity</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              <div className="flex flex-wrap gap-2">
                 {['Python', 'C++', 'React', 'TypeScript', 'SQL', 'GraphQL', 'Docker', 'System Design'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">{skill}</span>
                 ))}
              </div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">A</span>t <strong>Bloomberg LLP</strong>, I co-led the architectural unification of fragmented user registration systems. By reconciling messy endpoints with modular RESTful APIs, I helped consolidate protocols across five teams.
              </p>
              <p>
                My background includes internships at <strong className="text-stone-900 font-medium">Meta (Facebook)</strong> and <strong className="text-stone-900 font-medium">MathWorks</strong>, where I built artifact delivery systems and reporting applications. I hold an M.S. in Computer Science from NYU and combine technical rigor with a user-centric approach.
              </p>
            </div>
          </div>
        </section>

        {/* Experience: Bloomberg */}
        <section id="experience" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            JAN 2023 - PRESENT
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-2 text-stone-900">Bloomberg LLP</h2>
                        <h3 className="font-serif text-2xl text-stone-500 italic mb-6">Software Engineer</h3>
                        
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           <strong>The Challenge:</strong> Four fragmented User Registration systems created technical debt and maintenance nightmares.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            <strong>The Solution:</strong> Designed a cross-platform pipeline using modern RESTful APIs and React. Collaborated across five teams to ensure cross-system compatibility, mapping 15+ legacy endpoints to a new Linux-compatible architecture.
                        </p>
                    </div>
                    <div>
                        <SystemUnificationDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Experience: Meta */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <DataPipelineDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            MAY 2022 - AUG 2022
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-2 text-white">Meta (Facebook)</h2>
                        <h3 className="font-serif text-2xl text-stone-400 italic mb-6">Software Engineer Intern</h3>
                        
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Worked with the <strong>Spark AR Delivery Team</strong> to create a self-serve model delivery system for Android devices.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            Developed an artifact downloader using GraphQL to retrieve ML model metadata and built a caching mechanism that increased cache hit rates and reduced effect ready time for Instagram and Facebook users.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Optimization Metrics */}
        <section id="optimization" className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Performance Optimization</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        At Bloomberg, I didn't just unify systems; I optimized them. By optimizing SQL algorithms and introducing caching layers for high-traffic endpoints, we achieved massive latency reductions.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <LatencyOptimizationChart />
                </div>
            </div>
        </section>

        {/* Impact/Overview */}
        <section className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <QuantumComputerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Infrastructure & Complexity Management</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">OTHER EXPERIENCE</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">MathWorks & Volunteering</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif text-2xl text-stone-800">MathWorks (Remote)</h3>
                            <p className="text-stone-500 text-sm mb-2 font-bold">SEP 2022 - DEC 2022</p>
                            <p className="text-stone-600 leading-relaxed">
                                Enhanced a reporting application with front-end looking and back-end logic. Researched functionality extensions using JavaScript and NodeJS.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-stone-800">Ada Developers Academy</h3>
                            <p className="text-stone-500 text-sm mb-2 font-bold">AUG 2021 - DEC 2021</p>
                            <p className="text-stone-600 leading-relaxed">
                                Tutored a beginner programming student from underrepresented groups in clean, readable Python code. The student successfully secured an Oracle internship.
                            </p>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Education */}
        <section id="education" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">ACADEMIC BACKGROUND</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Education</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <InfoCard 
                        title="New York University" 
                        subtitle="M.S. Computer Science" 
                        date="Jan 2021 - Dec 2022"
                        details="GPA: 3.82/4.0. Relevant coursework: Database Systems, Algorithms, OO Design, Operating Systems, Security."
                        delay="0s" 
                    />
                    <InfoCard 
                        title="NYU Tandon Bridge" 
                        subtitle="CS Preparatory Course" 
                        date="Mar 2020 - Sep 2020"
                        details="Graduated with Distinction. A highly rigorous program where more than half the class dropped off, but I achieved distinction."
                        delay="0.1s" 
                    />
                    <InfoCard 
                        title="UIUC" 
                        subtitle="B.S. Psychology" 
                        date="Aug 2014 - May 2018"
                        details="Minor in Business. Provided a strong foundation in user psychology and business logic."
                        delay="0.2s" 
                    />
                </div>
           </div>
        </section>

        {/* Awards */}
        <section id="awards" className="py-24 bg-white border-t border-stone-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">ACHIEVEMENTS</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Hackathons & Awards</h2>
                </div>
                
                <div className="flex justify-center max-w-4xl mx-auto">
                    <div className="w-full md:w-2/3">
                        <InfoCard 
                            title="Terminal Live" 
                            subtitle="11th Place - East Coast" 
                            date="Mar 2021"
                            details="Designed and implemented algorithms to beat other players in a tower defense game. Won $500 prize."
                            delay="0.2s" 
                        />
                    </div>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">Yujing Chen</div>
                <p className="text-sm">Software Engineer | New York, NY</p>
            </div>
            <div className="flex gap-6">
                <a href="mailto:vcjobapps@gmail.com" className="hover:text-white transition-colors">Email</a>
                <a href="https://linkedin.com/in/vclk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            &copy; 2025 Yujing Chen. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
