import { useEffect, useState } from 'react';
import car from '../assets/photos/car.jpg';
import drone from '../assets/photos/drone.jpg';
import field from '../assets/photos/field.jpg';
import hero from '../assets/photos/hero.jpg';
import robot from '../assets/photos/robot.jpg';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon, type IconName } from './Icon';
import './Hero.css';

/** "Embedded Systems Engineer | IoT & Product Development" → ["Embedded Systems Engineer", "IoT & Product Development"] */
export const splitHeadline = (h: string) => h.split(/\s*[|•·–—]\s*/).filter(Boolean);

const SIDE = [
  { img: field, icon: 'sprout' as IconName },
  { img: car, icon: 'car' as IconName },
  { img: robot, icon: 'factory' as IconName },
];

interface Props {
  resume: Resume;
  isExample: boolean;
  onUpload: () => void;
}

export function Hero({ resume, isExample, onUpload }: Props) {
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [role] = splitHeadline(resume.headline);
  const words = resume.name.split(/\s+/);
  const first = words.length > 1 ? words.slice(0, -1).join(' ') : words[0];
  const last = words.length > 1 ? words[words.length - 1] : '';
  const intro = resume.summary ? resume.summary.split(/(?<=[.!?])\s/)[0] : resume.tagline;
  const motto = (resume.motto || 'Your idea. Our engineering.').replace(/[.!]/g, '').split(/\s+/).slice(0, 5);
  const featured = resume.projects.slice(0, 4);
  const side = (resume.interests.length >= 3 ? resume.interests : [...resume.interests, ...resume.skills]).slice(0, 3);
  const edu = resume.education[0];

  // the featured card steps through the first few projects, like the slider dots in the design
  useEffect(() => {
    if (reduced || featured.length < 2) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % featured.length), 5000);
    return () => clearInterval(t);
  }, [reduced, featured.length]);

  const current = featured[slide % Math.max(featured.length, 1)];
  const facts: { icon: IconName; text: string }[] = [
    { icon: 'pin', text: resume.location || 'Location' },
    { icon: 'briefcase', text: `${resume.stats.years}${resume.stats.yearsPlus ? '+' : ''} years experience` },
    { icon: 'graduation', text: edu?.short ? `${edu.short}${edu.field ? ` · ${edu.field}` : ''}` : 'Education' },
    { icon: 'headset', text: 'Open to new roles' },
  ];

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero__photo" aria-hidden>
        <img src={hero} alt="" />
        <span className="hero__glow" />
        <p className="hero__note">
          {motto.map((w, i) => (
            <span key={i} style={{ ['--i' as string]: i }}>
              {w}
            </span>
          ))}
          <svg viewBox="0 0 100 14" preserveAspectRatio="none">
            <path d="M3 10c25-6 60-8 94-3" />
          </svg>
        </p>
      </div>

      <div className="wrap hero__grid">
        <div className="hero__copy">
          {resume.skills.length > 0 && (
            <p className="hero__tags" data-search>
              {resume.skills.slice(0, 5).map((s, i) => (
                <span key={s}>
                  {i > 0 && <i>•</i>}
                  {s}
                </span>
              ))}
            </p>
          )}
          <h1 className="display hero__title" data-search>
            {first} {last}
            <span>{role || resume.headline}</span>
          </h1>
          {intro && <p className="hero__intro">{intro}</p>}
          <div className="hero__actions">
            {isExample ? (
              <button className="pill" onClick={onUpload}>
                Upload your CV <Icon name="arrowRight" size={15} />
              </button>
            ) : (
              <a className="pill" href={resume.email ? `mailto:${resume.email}` : '#contact'}>
                Get in touch <Icon name="arrowRight" size={15} />
              </a>
            )}
            <a className="hero__watch" href="#projects">
              <span className="hero__play">
                <Icon name="play" size={13} />
              </span>
              View Projects
            </a>
          </div>
          <ul className="hero__facts">
            {facts.map((f, i) => (
              <li key={f.text} style={{ ['--i' as string]: i }}>
                <Icon name={f.icon} size={15} /> {f.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__side">
          <GlowCard className="feature" accent="blue" speed={8} tilt={false}>
            <div className="feature__photo">
              <img src={drone} alt="" />
            </div>
            <a className="feature__play" href="#projects" aria-label="See projects">
              <Icon name="play" size={18} />
            </a>
            <div className="feature__text" key={slide} data-search>
              <b>{current?.title || 'From concept to real world'}</b>
              <small>{current?.description || resume.tagline}</small>
            </div>
            {featured.length > 1 && (
              <div className="feature__dots" role="tablist" aria-label="Featured projects">
                {featured.map((p, i) => (
                  <button key={p.title} role="tab" aria-selected={i === slide} aria-label={p.title} className={i === slide ? 'is-on' : ''} onClick={() => setSlide(i)} />
                ))}
              </div>
            )}
          </GlowCard>

          <ul className="minis">
            {side.map((label, i) => (
              <li key={label}>
                <GlowCard className="mini" accent={i === 1 ? 'amber' : 'blue'} phase={i * 0.3} speed={6 + i} tilt={false}>
                  <img src={SIDE[i].img} alt="" />
                  <span className="mini__text" data-search>
                    <span className="mini__icon">
                      <Icon name={SIDE[i].icon} size={14} />
                    </span>
                    {label}
                    <Icon name="arrowRight" size={13} className="mini__go" />
                  </span>
                </GlowCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
