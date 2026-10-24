import { useEffect, useState } from 'react';
import d1 from '../assets/photos/domain-1.jpg';
import d2 from '../assets/photos/domain-2.jpg';
import d3 from '../assets/photos/domain-3.jpg';
import d4 from '../assets/photos/domain-4.jpg';
import d5 from '../assets/photos/domain-5.jpg';
import earth from '../assets/photos/earth.jpg';
import summit from '../assets/photos/summit.jpg';
import w1 from '../assets/photos/work-1.jpg';
import w2 from '../assets/photos/work-2.jpg';
import w3 from '../assets/photos/work-3.jpg';
import w4 from '../assets/photos/work-4.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { splitHeadline } from './Hero';
import { Icon, type IconName } from './Icon';
import { Logo } from './Logo';
import { NAV } from './NavBar';
import { Reveal } from './Reveal';

const DOMAIN_PHOTOS = [d1, d2, d3, d4, d5];
const DOMAIN_ICONS: IconName[] = ['sprout', 'drone', 'car', 'factory', 'smart'];
const WORK_PHOTOS = [w1, w2, w3, w4];
const STEP_ICONS: IconName[] = ['cpu', 'layers', 'wrench', 'bolt', 'rocket'];

function Head({ label, title, id, link }: { label: string; title: React.ReactNode; id: string; link?: { href?: string; text: string; onClick?: () => void } }) {
  return (
    <div className="head">
      <div>
        <span className="label">{label}</span>
        <h2 id={id} className="title">
          {title}
        </h2>
      </div>
      {link &&
        (link.onClick ? (
          <button className="head__link" onClick={link.onClick}>
            {link.text} <Icon name="arrowRight" size={13} />
          </button>
        ) : (
          <a className="head__link" href={link.href}>
            {link.text} <Icon name="arrowRight" size={13} />
          </a>
        ))}
    </div>
  );
}

/* ================= domains ("Solutions for real-world industries") ================= */

export function DomainsSection({ resume }: { resume: Resume }) {
  const items = [...resume.interests, ...resume.skills].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
  return (
    <section id="skills" className="card-block" aria-labelledby="domains-title">
      <Head label="Skills & domains" id="domains-title" title="Solutions for Real-World Problems" link={{ href: '#toolkit', text: 'View all skills' }} />
      <p className="block__intro" data-search>
        {resume.tagline}
      </p>
      <div className="domains">
        {items.map((d, i) => (
          <Reveal key={d} delay={i * 80} className="domains__cell">
            <GlowCard className="domain" accent={i % 2 ? 'teal' : 'blue'} phase={i * 0.2} speed={6 + i * 0.5}>
              <img src={DOMAIN_PHOTOS[i % DOMAIN_PHOTOS.length]} alt="" loading="lazy" />
              <span className="domain__label" data-search>
                <Icon name={DOMAIN_ICONS[i % DOMAIN_ICONS.length]} size={15} />
                <span>{d}</span>
                <Icon name="arrowRight" size={12} className="domain__go" />
              </span>
            </GlowCard>
          </Reveal>
        ))}
      </div>
      <ul className="toolkit" id="toolkit">
        {resume.skills.map((s, i) => (
          <li key={s} style={{ ['--i' as string]: i }} data-search>
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ================= why work with me — navy panel, earth and a sunrise ================= */

function Count({ value, suffix = '', label, run, delay }: { value: number; suffix?: string; label: string; run: boolean; delay: number }) {
  const n = useCountUp(value, run, { duration: 2200, delay });
  return (
    <li className="count">
      <b aria-label={`${value}${suffix}`}>
        <span aria-hidden>
          {Math.round(n)}
          {suffix && <i className={n >= value * 0.98 ? 'is-on' : ''}>{suffix}</i>}
        </span>
      </b>
      <small>{label}</small>
    </li>
  );
}

export function WhySection({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const { stats } = resume;
  const current = resume.experience[0];
  const edu = resume.education[0];
  const points: { icon: IconName; title: string; text: string }[] = [
    { icon: 'cpu', title: current?.role || 'Hands-on engineering', text: current ? [current.company, current.period].filter(Boolean).join(' · ') : 'From concept to production' },
    { icon: 'users', title: edu?.degree || 'Education', text: [edu?.institution, edu?.year].filter(Boolean).join(' · ') },
    { icon: 'shield', title: resume.certifications[0] || 'Reliable & tested', text: resume.certifications.length > 1 ? `+ ${resume.certifications.length - 1} more certification${resume.certifications.length > 2 ? 's' : ''}` : 'Built for the real world' },
    { icon: 'globe', title: resume.location || 'Works worldwide', text: 'On-site or remote' },
  ];

  return (
    <section id="about" ref={ref} className={`why ${inView ? 'is-up' : ''}`} aria-labelledby="why-title">
      <div className="why__sky" aria-hidden>
        <img className="why__earth" src={earth} alt="" />
        <span className="why__sun" />
        <span className="why__rays" />
        <span className="why__flare" />
      </div>
      <div className="why__copy">
        <span className="label why__label">Why work with</span>
        <h2 id="why-title" className="why__title" data-search>
          {resume.name}
        </h2>
        <p className="why__summary" data-search>
          {resume.summary}
        </p>
        <ul className="why__grid">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title + i} delay={i * 90} data-search>
              <span className="why__icon">
                <Icon name={p.icon} size={18} />
              </span>
              <span>
                <b>{p.title}</b>
                {p.text && <small>{p.text}</small>}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
      <ul className="why__stats">
        <Count value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects Completed" run={inView} delay={0} />
        <Count value={stats.skills} suffix="+" label="Core Skills" run={inView} delay={150} />
        <Count value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label="Years Experience" run={inView} delay={300} />
        <Count value={resume.certifications.length + resume.achievements.length} label="Awards & Certifications" run={inView} delay={450} />
      </ul>
    </section>
  );
}

/* ================= experience as the "development process" steps ================= */

export function ProcessSection({ resume }: { resume: Resume }) {
  const reduced = useReducedMotion();
  const steps = resume.experience.slice(0, 5).reverse(); // oldest → newest, left to right
  const [active, setActive] = useState(steps.length - 1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || steps.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [reduced, paused, steps.length]);

  const role = steps[active];
  return (
    <section id="experience" className="card-block card-block--soft" aria-labelledby="process-title">
      <Head label="How I got here" id="process-title" title="My Career Path" />
      <p className="block__intro">Each step built on the last — from first role to what I do today.</p>
      {steps.length ? (
        <>
          <ol className="steps" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            {steps.map((e, i) => (
              <Reveal as="li" key={e.role + i} delay={i * 110} className={`step ${i === active ? 'is-on' : ''} ${i < active ? 'is-done' : ''}`} onPointerEnter={() => setActive(i)} data-search>
                <span className="step__icon">
                  <Icon name={STEP_ICONS[i % STEP_ICONS.length]} size={20} />
                </span>
                <small className="step__no">{String(i + 1).padStart(2, '0')}</small>
                <b>{e.role}</b>
                <span className="step__org">{e.company}</span>
                <span className="step__when">{e.period}</span>
              </Reveal>
            ))}
          </ol>
          {role && role.bullets.length > 0 && (
            <GlowCard className="step-detail" accent="blue" speed={8} tilt={false} key={active}>
              <b>{role.role}</b>
              <span>{[role.company, role.period].filter(Boolean).join(' · ')}</span>
              <ul>
                {role.bullets.slice(0, 3).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </GlowCard>
          )}
        </>
      ) : (
        <p className="empty">No experience section was found in the CV.</p>
      )}
    </section>
  );
}

/* ================= recent work ================= */

export function WorkSection({ resume }: { resume: Resume }) {
  const [all, setAll] = useState(false);
  const projects = all ? resume.projects : resume.projects.slice(0, 4);
  return (
    <section id="projects" className="card-block" aria-labelledby="work-title">
      <Head
        label="Featured projects"
        id="work-title"
        title="Recent Work"
        link={resume.projects.length > 4 ? { text: all ? 'Show fewer' : `View all ${resume.projects.length} projects`, onClick: () => setAll((a) => !a) } : undefined}
      />
      <div className="work">
        {projects.map((p, i) => (
          <Reveal key={p.title + i} delay={(i % 4) * 90} className="work__cell">
            <GlowCard className="product" accent={i % 2 ? 'teal' : 'blue'} phase={i * 0.22} speed={6.5 + (i % 3)}>
              <div className="product__photo">
                <img src={WORK_PHOTOS[i % WORK_PHOTOS.length]} alt="" loading="lazy" />
              </div>
              <div className="product__body" data-search>
                <b>{p.title}</b>
                {p.description && <small>{p.description}</small>}
                {(p.tags.length > 0 || p.meta) && (
                  <span className="product__tags">
                    {(p.tags.length ? p.tags : [p.meta as string]).slice(0, 4).map((t) => (
                      <i key={t}>{t}</i>
                    ))}
                  </span>
                )}
              </div>
            </GlowCard>
          </Reveal>
        ))}
        {!projects.length && <p className="empty">No projects were found in the CV.</p>}
      </div>
    </section>
  );
}

/* ================= bottom band: achievements slider + call to action ================= */

export function Highlights({ resume }: { resume: Resume }) {
  const reduced = useReducedMotion();
  const items = [...resume.achievements.map((t) => ({ text: t, kind: 'Achievement' })), ...resume.certifications.map((t) => ({ text: t, kind: 'Certification' }))];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const initials = resume.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (reduced || paused || items.length < 2) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [reduced, paused, items.length]);

  const item = items[i % Math.max(items.length, 1)];
  const go = (d: number) => setI((x) => (x + d + items.length) % items.length);

  return (
    <section className="band__wins" aria-labelledby="wins-title" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <span className="label band__label">Highlights</span>
      <h2 id="wins-title" className="band__title">
        Achievements &amp; Credentials
      </h2>
      <p className="band__sub">What I’ve delivered and been recognised for.</p>
      {item ? (
        <div className="slider">
          <button className="slider__arrow" aria-label="Previous" onClick={() => go(-1)}>
            <Icon name="chevronLeft" size={15} />
          </button>
          <div className="slider__card" key={i} data-search>
            <span className="slider__avatar">{initials}</span>
            <span>
              <span className="slider__stars" aria-hidden>
                {[0, 1, 2, 3, 4].map((s) => (
                  <Icon key={s} name="star" size={12} style={{ ['--s' as string]: s }} />
                ))}
              </span>
              <q>{item.text}</q>
              <b>{resume.name}</b>
              <small>{item.kind}</small>
            </span>
          </div>
          <button className="slider__arrow" aria-label="Next" onClick={() => go(1)}>
            <Icon name="chevronRight" size={15} />
          </button>
        </div>
      ) : (
        <p className="band__sub">Add an Achievements or Certifications section to the CV to show them here.</p>
      )}
      {items.length > 1 && (
        <div className="slider__dots">
          {items.map((it, k) => (
            <button key={it.text} aria-label={`Show ${k + 1}`} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} />
          ))}
        </div>
      )}
    </section>
  );
}

export function CallToAction({ resume }: { resume: Resume }) {
  const goal = resume.goals[0];
  return (
    <section id="contact" className="cta" aria-labelledby="cta-title">
      <img className="cta__photo" src={summit} alt="" loading="lazy" />
      <div className="cta__copy">
        <span className="label band__label">Let’s build together</span>
        <h2 id="cta-title" className="cta__title" data-search>
          Have a Project in Mind?
        </h2>
        <p>{goal ? `Next up: ${goal.value.charAt(0).toLowerCase()}${goal.value.slice(1)}.` : 'Let’s discuss your idea and turn it into a real product.'}</p>
        <div className="cta__actions">
          <a className="pill pill--sm" href={resume.email ? `mailto:${resume.email}` : '#home'}>
            Get in touch <Icon name="arrowRight" size={14} />
          </a>
          {resume.phone ? (
            <a className="pill pill--sm cta__ghost" href={`tel:${resume.phone.replace(/[^\d+]/g, '')}`}>
              Call me
            </a>
          ) : (
            resume.links.linkedin && (
              <a className="pill pill--sm cta__ghost" href={resume.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ, answered from the CV ================= */

export function FaqSection({ resume }: { resume: Resume }) {
  const [open, setOpen] = useState<number | null>(0);
  const [role, focus] = splitHeadline(resume.headline);
  const faqs = [
    { q: 'What do you specialise in?', a: [role, focus].filter(Boolean).join(' — ') + (resume.skills.length ? `. Day to day: ${resume.skills.slice(0, 4).join(', ')}.` : '') },
    { q: 'Which tools and technologies do you use?', a: resume.skills.join(', ') },
    { q: 'What is your education?', a: resume.education.map((e) => [e.degree, e.institution, e.year].filter(Boolean).join(', ')).join('; ') },
    { q: 'Where are you based?', a: resume.location ? `${resume.location} — open to on-site and remote work.` : '' },
    { q: 'What are you looking for next?', a: resume.goals.map((g) => `${g.label}: ${g.value}${g.note ? ` (${g.note})` : ''}`).join(' · ') },
  ].filter((f) => f.a);

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="head head--tight">
        <div>
          <span className="label">FAQ</span>
          <h2 id="faq-title" className="faq__title">
            Frequently Asked Questions
          </h2>
        </div>
      </div>
      <ul>
        {faqs.map((f, i) => (
          <li key={f.q} className={open === i ? 'is-open' : ''} data-search>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <Icon name={open === i ? 'minus' : 'plus'} size={14} />
            </button>
            <div className="faq__a">
              <p>{f.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ================= footer ================= */

export function Footer({ resume }: { resume: Resume }) {
  const [role] = splitHeadline(resume.headline);
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="footer__brand">
          <Logo size={34} light />
          <span>
            <b className="wordmark">{resume.name}</b>
            <small>{role}</small>
          </span>
        </span>
        <p className="footer__motto">{resume.motto || resume.tagline}</p>
        <nav className="footer__nav" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <nav className="footer__social" aria-label="Profiles">
          {resume.links.linkedin && (
            <a href={resume.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={17} />
            </a>
          )}
          {resume.links.github && (
            <a href={resume.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" size={17} />
            </a>
          )}
          {resume.email && (
            <a href={`mailto:${resume.email}`} aria-label="Email">
              <Icon name="mail" size={17} />
            </a>
          )}
        </nav>
      </div>
      <p className="wrap footer__base">
        © {new Date().getFullYear()} {resume.name}. Built from a CV.
      </p>
    </footer>
  );
}
