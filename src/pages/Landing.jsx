import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import { curriculum, bonus, stats } from '../data/curriculum';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-olive-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-olive-900 tracking-tight text-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-olive-600 inline-block" />
          plot3d<span className="text-olive-500">.course</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-olive-800">
          <a href="#curriculum" className="hover:text-olive-600 transition-colors">Curriculum</a>
          <a href="#capstone" className="hover:text-olive-600 transition-colors">Capstone</a>
          <a href="#stats" className="hover:text-olive-600 transition-colors">By the numbers</a>
          <Link
            to="/viewer"
            className="px-4 py-2 rounded-full bg-olive-700 text-paper hover:bg-olive-800 transition-colors"
          >
            Open Notebook →
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden bg-paper">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-paper via-paper/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-6 right-6 md:right-10 z-[2] max-w-[15rem] hidden xl:block text-right">
        <motion.p
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-mono text-[11px] text-olive-600/80 leading-relaxed"
        >
          Z = 9·sin(0.28r)·e<sup>−0.028r</sup> + 3.5·cos(0.12x)·sin(0.12y)
          <br />— the hero surface, rendered live in WebGL
        </motion.p>
      </div>

      <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-mono text-xs uppercase tracking-[0.25em] text-olive-600 mb-5"
        >
          A complete self-paced Jupyter course
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-olive-950 leading-[0.98] tracking-tight max-w-4xl"
        >
          3D Plotting with
          <br />
          <span className="text-olive-600">Matplotlib</span> in Python
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-lg text-olive-900/80 max-w-xl leading-relaxed"
        >
          271 executed notebook cells. Zero errors. Scatter to surfaces, wireframes to
          gradient-descent capstones — every plot type, every mistake, every interview question.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/viewer"
            className="px-6 py-3.5 rounded-full bg-olive-700 text-paper font-medium hover:bg-olive-800 transition-colors shadow-lg shadow-olive-900/10"
          >
            Read the Notebook
          </Link>
          <a
            href="/data/notebook.ipynb"
            download
            className="px-6 py-3.5 rounded-full border border-olive-400 text-olive-800 font-medium hover:bg-olive-100 transition-colors"
          >
            Download .ipynb
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-olive-600 mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-olive-950 tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-4 text-olive-900/70 leading-relaxed">{sub}</p>}
    </div>
  );
}

const tagColors = {
  Foundations: 'bg-olive-100 text-olive-800',
  'Core Plots': 'bg-olive-600 text-paper',
  Styling: 'bg-clay/15 text-clay',
  Layout: 'bg-olive-200 text-olive-800',
  Gallery: 'bg-olive-800 text-paper',
  Applied: 'bg-olive-700 text-paper',
  Output: 'bg-olive-100 text-olive-800',
  Debugging: 'bg-red-900/10 text-red-900',
  Practice: 'bg-olive-200 text-olive-800',
  Reference: 'bg-olive-100 text-olive-800',
  Capstone: 'bg-olive-950 text-olive-200',
};

function Curriculum() {
  return (
    <section id="curriculum" className="relative py-28 contour-bg">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="33 Sections + Bonus"
          title="Every technique, in order."
          sub="From your first empty 3D Axes to a capstone that combines surfaces, wireframes, contours, and a simulated gradient-descent path into one publication-ready figure."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-olive-200/60 border border-olive-200/60 rounded-2xl overflow-hidden">
          {curriculum.map((c, i) => (
            <motion.div
              key={c.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              custom={i % 6}
              className="bg-paper p-6 hover:bg-olive-100/60 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-2xl text-olive-300 group-hover:text-olive-500 transition-colors">
                  {c.n}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full ${tagColors[c.tag]}`}>
                  {c.tag}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-olive-950 mb-1.5">{c.title}</h3>
              <p className="text-sm text-olive-900/65 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-olive-950 p-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-display text-2xl text-olive-500">{bonus.n}</span>
              <h3 className="font-display text-base font-semibold text-paper mt-4 mb-1.5">{bonus.title}</h3>
              <p className="text-sm text-olive-300/80 leading-relaxed">{bonus.desc}</p>
            </div>
            <Link to="/viewer" className="mt-6 text-sm font-medium text-olive-300 hover:text-paper transition-colors">
              Jump to reference →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Capstone() {
  return (
    <section id="capstone" className="py-28 bg-olive-950 text-paper relative overflow-hidden grain">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-olive-400 mb-4">Section 33 · Capstone</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Optimization Landscape Explorer
          </h2>
          <p className="text-olive-300 leading-relaxed mb-6">
            One figure, thirteen techniques: a non-convex loss surface, a translucent wireframe
            overlay, a filled contour floor, a simulated gradient-descent path with start/end
            annotations, a custom camera angle, a colorbar, a legend — exported to PNG and PDF.
          </p>
          <ul className="space-y-2 font-mono text-sm text-olive-400">
            <li>→ plot_surface + plot_wireframe overlay</li>
            <li>→ contourf floor projection</li>
            <li>→ 150-step simulated optimizer path</li>
            <li>→ view_init(elev=35, azim=-55)</li>
          </ul>
          <Link
            to="/viewer?section=33"
            className="inline-block mt-8 px-6 py-3 rounded-full bg-olive-300 text-olive-950 font-medium hover:bg-paper transition-colors"
          >
            Open the capstone cell
          </Link>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="aspect-square rounded-2xl border border-olive-700 bg-olive-900/60 p-8 flex items-center justify-center"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="g1" cx="35%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ADC48A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#556B2F" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx={10 + i * 7}
                ry={6 + i * 4.2}
                fill="none"
                stroke="#8CA85E"
                strokeOpacity={0.25 + (14 - i) * 0.025}
                strokeWidth="1"
              />
            ))}
            <circle cx="100" cy="100" r="90" fill="url(#g1)" />
            <path
              d="M 30 170 C 60 120, 70 90, 100 100 S 150 60, 175 35"
              stroke="#E9EFDD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
            <circle cx="30" cy="170" r="5" fill="#E9EFDD" />
            <circle cx="175" cy="35" r="5" fill="#ADC48A" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="stats" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-olive-200 pt-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="font-display text-4xl md:text-5xl font-semibold text-olive-700">{s.value}</div>
              <div className="mt-2 text-sm text-olive-900/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28 bg-olive-100/60 contour-bg">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-olive-950 tracking-tight">
          Open the notebook. Run every cell yourself.
        </h2>
        <p className="mt-4 text-olive-900/70">
          Read it inline in the viewer, or download the real .ipynb and run it in Jupyter, VS Code, or Colab.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/viewer"
            className="px-6 py-3.5 rounded-full bg-olive-700 text-paper font-medium hover:bg-olive-800 transition-colors"
          >
            Open Viewer
          </Link>
          <a
            href="/data/notebook.ipynb"
            download
            className="px-6 py-3.5 rounded-full border border-olive-400 text-olive-800 font-medium hover:bg-white transition-colors"
          >
            Download .ipynb
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-olive-950 text-olive-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm text-paper">
          Made with <span className="text-olive-400">♥</span> by Muhammad Mawiya
        </p>
        <p className="font-mono text-xs">Python · Data Visualization · AI · Machine Learning</p>
        <p className="text-xs">© 2026 Muhammad Mawiya. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="bg-paper">
      <Nav />
      <Hero />
      <Curriculum />
      <Capstone />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
