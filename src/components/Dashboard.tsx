import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { Hero, splitHeadline } from './Hero';
import { NAV, NavBar } from './NavBar';
import { CallToAction, DomainsSection, FaqSection, Footer, Highlights, ProcessSection, WhySection, WorkSection } from './Sections';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

interface Props {
  profile: StoredProfile;
  isExample: boolean;
  onUploadNew: () => void;
  onEdit: () => void;
  onReset: () => void;
  onDownloadCv: () => void;
}

export function Dashboard({ profile, isExample, onUploadNew, onEdit, onReset, onDownloadCv }: Props) {
  const { resume } = profile;
  const active = useScrollSpy(IDS, 140);
  const [role, focus] = splitHeadline(resume.headline);

  return (
    <>
      <NavBar
        name={resume.name}
        tagline={focus || role || ''}
        email={resume.email}
        active={active}
        isExample={isExample}
        onUploadNew={onUploadNew}
        onEdit={onEdit}
        onDownloadCv={onDownloadCv}
        onReset={onReset}
      />
      <main>
        <Hero resume={resume} isExample={isExample} onUpload={onUploadNew} />
        <div className="wrap board">
          <div className="board__col">
            <DomainsSection resume={resume} />
            <ProcessSection resume={resume} />
          </div>
          <div className="board__col">
            <WhySection resume={resume} />
            <WorkSection resume={resume} />
          </div>
        </div>
        <div className="band">
          <div className="wrap band__grid">
            <Highlights resume={resume} />
            <CallToAction resume={resume} />
            <FaqSection resume={resume} />
          </div>
        </div>
      </main>
      <Footer resume={resume} />
    </>
  );
}
