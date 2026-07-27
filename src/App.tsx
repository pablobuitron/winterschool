import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface Member {
  name: string;
  affiliation: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    // Detectar hash al cargar la página
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  /* ---------- DATA ---------- 
  const organizingCommittee: Member[] = [
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University, Italy' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },
  ];*/

  const organizingCommittee: Member[] = [
    {name: 'Dario Assante', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
    {name: 'Pablo Buitron', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
    {name: 'Clemente Cesarano', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
    {name: 'Ileana Di Pomponio', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
    {name: 'Linda Meleo', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
    {name: 'Alessandro Pollini', affiliation: 'Università Telematica Internazionale UNINETTUNO, Italy' },
];

  const scientificCommittee: Member[] = [/*
    { name: 'Roberto Cavoretto', affiliation: 'University of Turin, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'Uninettuno University' },
    { name: 'Alessandra De Rossi', affiliation: 'University of Turin, Italy' },
    { name: 'Luisa Fermo', affiliation: 'University of Cagliari, Italy' },
    { name: 'Francisco Marcellan', affiliation: 'University Carlos III Madrid, Spain' },
    { name: 'Nicola Mastronardi', affiliation: 'IAC - CNR, Italy' },
    { name: 'Amir Noorizadegan', affiliation: 'Hong Kong Baptist University' },
    { name: 'Incoronata Notarangelo', affiliation: 'University of Turin, Italy' },
    { name: 'Giuseppe Rodriguez', affiliation: 'University of Cagliari, Italy' },
    { name: 'Alvise Sommariva', affiliation: 'University of Padua, Italy' },*/
  ];

  const navItems = [
    'Home',
    'About',
    'Committees',
    'Lecturers',
    'Seminars',
    'Working Groups',
    'Posters',
    //'Program',
    'Registration',
    //'Important Dates',
    'Sponsors',
    'Venue',
  ];

  const handleNavClick = (section: string) => {
    const sectionId = section.toLowerCase().replace(/ /g, '-');
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    // Actualizar hash en la URL
    window.location.hash = sectionId;
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutSection />;
      case 'committees':
        return (
          <CommitteesSection
            organizingCommittee={organizingCommittee}
            scientificCommittee={scientificCommittee}
          />
        );
      case 'lecturers':
        return <LecturersSection />;
        case 'seminars':
        return <SeminarsSection />;
      case 'working-groups':
        return <WorkingGroupsSection />;
      case 'posters':
        return <PostersSection />;
      /*case 'program':
        return <ProgramSection />;*/
      case 'registration':
        return <RegistrationSection />;
      /*case 'important-dates':
        return <ImportantDatesSection />;*/
      case 'sponsors':
        return <SponsorsSection />;
      case 'venue':
        return <VenueSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-slate-900 whitespace-nowrap">Winter School 2027</h1>
            <div className="hidden md:block">
              <div className="ml-8 flex items-baseline space-x-5">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.toLowerCase().replace(/ /g, '-')
                        ? 'bg-slate-200 text-slate-950'
                        : 'text-gray-700 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-slate-950"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.toLowerCase().replace(/ /g, '-')
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{renderContent()}</main>
    </div>
  );
}

/* ---------- SECTION WRAPPER ---------- */
const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800 text-white py-20 text-center">
      <h2 className="text-4xl font-bold">{title}</h2>
    </section>

    <section className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 text-base leading-relaxed">
      {children}
    </section>
  </div>
);

/* ---------- HOME ---------- */
const HomeSection: React.FC = () => (
  <>
    <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800 text-white min-h-screen py-28 flex items-center">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">

        <div className="flex-1 text-left space-y-8">
          <p className="text-lg md:text-xl uppercase tracking-[0.25em] text-blue-200 font-medium">
            Winter School
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Computational Learning
            <br />
            and Design
          </h1>

          <div className="text-xl md:text-2xl text-blue-100 space-y-2">
            <p>February 1–5, 2027</p>
            <p>Domus Academy</p>
            <p>Via Carlo Darwin, 20 — Milan, Italy</p>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="./design-mathematics.jpg"
            alt="Computational design and mathematical structures"
            className="w-full max-w-2xl rounded-2xl shadow-2xl border border-blue-300/40 object-cover aspect-[4/3]"
          />
        </div>

      </div>
    </section>

    <section className="relative z-10 bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-5xl mx-auto space-y-16">

          <div>
            <p className="text-left mb-6">
              <strong>Organized by:</strong>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-12">
              <img
                src="./uninettuno-logo.png"
                alt="Università Telematica Internazionale UNINETTUNO"
                className="h-32 object-contain bg-white p-4 rounded-lg shadow"
              />
            </div>
          </div>

          <div>
            <p className="text-left mb-6">
              <strong>Hosted at:</strong>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-12">
              <img
                src="./domus-academy-logo.png"
                alt="Domus Academy"
                className="h-32 object-contain bg-white p-4 rounded-lg shadow"
              />
            </div>
          </div>

          <div>
            <p className="text-left mb-6">
              <strong>Sponsored by:</strong>
            </p>

            <p className="text-gray-600">
              Sponsors will be announced soon.
            </p>
          </div>

        </div>
      </div>
    </section>
  </>
);

/* ---------- ABOUT ---------- */
const AboutSection: React.FC = () => (
  <SectionWrapper title="About the Winter School">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
        <div className="text-gray-700 text-lg leading-relaxed space-y-6">
          <p>
            The{' '}
            <strong className="text-blue-900">
              Winter School on Computational Learning and Design
            </strong>{' '}
            will take place at <strong>Domus Academy</strong> in Milan, Italy,
            from <strong>February 1 to 5, 2027</strong>.
          </p>

          <p>
            The Winter School aims to bring together students, researchers,
            educators and professionals interested in the intersection of
            computational methods, machine learning, mathematics and design.
          </p>

          <p>
            Through lectures, seminars and collaborative activities,
            participants will explore emerging approaches that combine
            computational thinking, data-driven methods and creative design
            processes.
          </p>

          <p>
            The event will provide an interdisciplinary environment for
            discussing current challenges, exchanging ideas and fostering
            collaborations between academia, industry and the design community.
          </p>

          <p className="font-medium text-blue-900">
            Further information about lecturers, activities, registration and
            the scientific programme will be announced soon.
          </p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- COMMITTEES ---------- */
const CommitteesSection: React.FC<{
  organizingCommittee: Member[];
  scientificCommittee: Member[];
}> = ({ organizingCommittee, scientificCommittee }) => (
  <SectionWrapper title="Committees">
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          Organizing Committee
        </h3>

        <ul className="space-y-1">
          {organizingCommittee.map((member, index) => (
            <li key={index}>
              {member.name} ({member.affiliation})
            </li>
          ))}
        </ul>
      </div>

      {scientificCommittee.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Scientific Committee
          </h3>

          <ul className="space-y-1">
            {scientificCommittee.map((member, index) => (
              <li key={index}>
                {member.name} ({member.affiliation})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </SectionWrapper>
);


/* ---------- WORKING GROUPS ---------- */
const WorkingGroupsSection: React.FC = () => (
  <SectionWrapper title="Working Groups">
    <div className="max-w-3xl mx-auto space-y-6 text-base leading-relaxed">
      <p>
        Working Groups will provide participants with the opportunity to
        collaborate on interdisciplinary topics related to computational
        learning, mathematics and design.
      </p>

      <p>
        Further information about the topics, coordinators and activities will
        be announced soon.
      </p>
    </div>
  </SectionWrapper>
);



/* ---------- POSTERS ---------- */
const PostersSection: React.FC = () => (
  <SectionWrapper title="Posters">
    <div className="max-w-4xl mx-auto text-gray-800 space-y-6">
      <p className="text-base leading-relaxed">
        Participants will have the opportunity to present their research and
        projects during the poster session.
      </p>

      <p className="text-base leading-relaxed">
        Information about poster submission, format and deadlines will be
        announced soon.
      </p>
    </div>
  </SectionWrapper>
);


/* ---------- LECTURERS ---------- */
const LecturersSection: React.FC = () => (
  <SectionWrapper title="Lecturers">
    <div className="max-w-4xl mx-auto text-gray-800 space-y-8">
      <p className="text-base leading-relaxed">
        The lecturers and courses of the Winter School will be announced soon.
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- SEMINARS ---------- */
const SeminarsSection: React.FC = () => (
  <SectionWrapper title="Seminars">
    <div className="max-w-4xl mx-auto text-gray-800 space-y-6">
      <p className="text-base leading-relaxed">
        Information about the seminars and invited speakers will be announced
        soon.
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- PROGRAM ---------- */
const ProgramSection: React.FC = () => {
  // Paleta (aprox. Excel + leyenda solicitada)
  const c = {
    head: "bg-amber-100",           // cabecera superior
    time: "bg-amber-50",            // columna de horas
    gray: "bg-gray-200",            // bloques grises
    coffee: "bg-white",             // coffee (borde visible)
    mc1: "bg-[#cfe5ff]",            // azul claro MC-1
    mc2: "bg-[#c8f27a]",            // verde MC-Perez
    poster: "bg-orange-300",        // NUEVO: Posters naranja
    wg: "bg-yellow-300",            // NUEVO: WG amarillo (leyenda)
    s1: "bg-[#d8f3dc]",             // NUEVO: Seminar-1 verde pálido (leyenda)
    s2: "bg-[#e6d4ff]",             // NUEVO: Seminar-2 violeta leve (leyenda)
    dinner: "bg-white",
  };

  return (
    <SectionWrapper title="Program">
      <div className="max-w-7xl mx-auto">
        {/* Tabla con scroll horizontal en pantallas pequeñas */}
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-[960px] w-full text-sm">
            <thead>
              <tr className="text-center text-gray-800">
                <th className={`p-2 font-semibold ${c.head}`}>AASM 2026</th>
                <th className={`p-2 font-semibold ${c.head}`}>Mon 1/6</th>
                <th className={`p-2 font-semibold ${c.head}`}>Tue 2/6</th>
                <th className={`p-2 font-semibold ${c.head}`}>Wed 3/6</th>
                <th className={`p-2 font-semibold ${c.head}`}>Thu 4/6</th>
                <th className={`p-2 font-semibold ${c.head}`}>Fri 5/6</th>
              </tr>
            </thead>

            <tbody className="[&>tr>td]:border [&>tr>td]:border-gray-300 text-center align-middle">
              {/* ANTES DE LAS 9 NADA */}
              <tr>
                <td className={`w-32 p-1 font-medium ${c.time}`}>07:30-09:00</td>
                <td className={c.gray}></td>
                <td className="bg-white">Breakfast</td>
                <td className="bg-white">Breakfast</td>
                <td className="bg-white">Breakfast</td>
                <td className="bg-white">Breakfast</td>
              </tr>

              {/* 09:00–10:30 */}
              <tr>
                <td className={`w-32 p-1 font-medium ${c.time}`}>09:00–10:30</td>
                <td className={c.gray}></td>
                <td className={c.mc1}>MC-Olver (2h)</td>
                <td className={c.mc2}>MC-Perez (2h)</td>
                <td className={c.mc1}>MC-Olver (2h)</td>
                <td className={c.mc2}>MC-Perez (2h)</td>
              </tr>

              {/* 10:30–11:00 */}
              <tr>
                <td className={`p-1 ${c.time}`}>10:30–11:00</td>
                <td className={c.gray}></td>
                <td className={c.coffee}>Coffee Break</td>
                <td className={c.coffee}>Coffee Break</td>
                <td className={c.coffee}>Coffee Break</td>
                <td className={c.coffee}>Coffee Break</td>
              </tr>

              {/* 11:00–12:30 */}
              <tr>
                <td className={`p-1 ${c.time}`}>11:00–12:30</td>
                <td className={c.gray}></td>
                <td className={c.mc2}>MC-Perez (2h)</td>
                <td className={c.mc1}>MC-Olver (2h)</td>
                <td className={c.mc2}>MC-Perez (2h)</td>
                <td className={c.wg}>WG</td>
              </tr>

              {/* 12:30–12:45 */}
              <tr>
                <td className={`p-1 ${c.time}`}>12:30–12:45</td>
                <td className={c.gray}></td>
                <td className="bg-white">Photo</td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* 12:45–14:00 */}
              <tr>
                <td className={`p-1 ${c.time}`}>12:45</td>
                <td className={c.gray}></td>
                <td className="bg-white">Lunch</td>
                <td className="bg-white">Lunch</td>
                <td className="bg-white">Lunch</td>
                <td className="bg-white">Lunch</td>
              </tr>

              {/* 14:00–14:15  — INICIO del rowSpan para MIÉRCOLES */}
              <tr>
                <td className={`p-1 ${c.time}`}>13:15–14:15</td>
                <td className="bg-white">Registration</td>
                <td className={c.gray}></td>
                {/* Wed: celda combinada para 7 filas (14:00 → 19:00) */}
                <td rowSpan={7} className="bg-white align-middle font-medium">
                  Excursion / Free time
                </td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* 14:15–15:45 */}
              <tr>
                <td className={`p-1 ${c.time}`}>14:15–15:45</td>
                <td className={c.mc1}>MC-Olver (2h)</td>
                <td className={c.wg}>WG</td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.wg}>WG</td>
                <td className={c.gray}></td>
              </tr>

              {/* 15:45–16:15 */}
              <tr>
                <td className={`p-1 ${c.time}`}>15:45–16:15</td>
                <td className={c.coffee}>Coffee Break</td>
                <td className={c.coffee}>Coffee Break</td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.coffee}>Coffee Break</td>
                <td className={c.gray}></td>
              </tr>

              {/* 16:15–17:15 */}
              <tr>
                <td className={`p-1 ${c.time}`}>16:15–17:15</td>
                <td className={c.s1}>Seminar-Dmytryshyn</td>
                <td className={c.poster}>Poster Session</td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.s2}>Seminar-Themistoclakis</td>
                <td className={c.gray}></td>
              </tr>

              {/* 17:15–17:30 */}
              <tr>
                <td className={`p-1 ${c.time}`}>17:15–17:30</td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* 17:30–18:45 */}
              <tr>
                <td className={`p-1 ${c.time}`}>17:30–18:45</td>
                <td className="bg-white">Welcome Drink</td>
                <td className={c.gray}></td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* 18:45–19:00 */}
              <tr>
                <td className={`p-1 ${c.time}`}>18:45–19:30</td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                {/* (omitimos Wed por rowSpan) */}
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* 19:30 */}
              <tr>
                <td className={`p-1 ${c.time}`}>19:30</td>
                <td className={c.dinner}>Dinner</td>
                <td className={c.dinner}>Dinner</td>
                <td className={c.dinner}>Social Dinner</td>
                <td className={c.dinner}>Dinner</td>
                <td className={c.gray}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          MC = Mini Course
        </p>
        <p>
          WG = Working Groups
        </p>

        {/* Leyenda de colores */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-20 rounded ${c.mc1}`} />
            <span>MC-Olver</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-24 rounded ${c.mc2}`} />
            <span>MC-Perez</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-28 rounded ${c.poster}`} />
            <span>Posters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-20 rounded ${c.wg}`} />
            <span>WG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-28 rounded ${c.s1}`} />
            <span>Seminar-Dmytryshyn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-28 rounded ${c.s2}`} />
            <span>Seminar-Themistoclakis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block h-5 w-20 rounded ${c.gray}`} />
            <span>Free time</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};




/* ---------- REGISTRATION ---------- */
const RegistrationSection: React.FC = () => (
  <SectionWrapper title="Registration">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <p>
        All activities of the{' '}
        <strong>Winter School on Computational Learning and Design</strong>{' '}
        will be held at <strong>Domus Academy</strong> in Milan, Italy.
      </p>

      <ul className="list-none space-y-2">
        <li>
          <strong>Dates:</strong> February 1–5, 2027
        </li>

        <li>
          <strong>Mode of study:</strong> on campus
        </li>

        <li>
          <strong>Venue:</strong> Domus Academy, Milan
        </li>
      </ul>

      <p>
        Registration details, participation fees and application deadlines
        will be announced soon.
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- IMPORTANT DATES ---------- */
const ImportantDatesSection: React.FC = () => (
  <SectionWrapper title="Important Dates">
    <ul className="list-none space-y-2">
        <li>
          <strong>March 20, 2026:</strong> Deadline to contact the Working Group organizers to be included in a Working Group
        </li>
        <li>
          <strong>March 20, 2026:</strong> Poster abstract submission deadline
        </li>
        <li>
          <strong>March 31, 2026:</strong> Notification of poster acceptance
        </li>
        <li>
          <strong>March 31, 2026:</strong> Deadline for submission of the Working Group participant list (to be provided by WG organizers)
        </li>
        <li>
          <strong>April 15, 2026:</strong> Registration deadline
        </li>
        <li>
          <strong>May 10, 2026:</strong> Payment deadline
        </li>
      </ul>
  </SectionWrapper>
);


/* ---------- SPONSORS ---------- */
const SponsorsSection: React.FC = () => (
  <SectionWrapper title="Sponsors">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <p>
        Sponsors and institutional partners of the Winter School will be
        announced soon.
      </p>
    </div>
  </SectionWrapper>
);

/*----- VENUE -------- */
/* ---------- VENUE ---------- */
const VenueSection: React.FC = () => (
  <SectionWrapper title="Venue">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <div className="text-center">
        <p className="font-semibold">DOMUS ACADEMY</p>

        <p>Via Carlo Darwin, 20</p>

        <p>20143 Milano MI, Italy</p>

        <p>
          <a
            href="https://www.domusacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            www.domusacademy.com
          </a>
        </p>
      </div>

      <p>
        The Winter School will take place at <strong>Domus Academy</strong>,
        an international institution located in Milan.
      </p>

      <p>
        The campus can be reached using Milan’s public transport network.
        Further information about transportation and accommodation will be
        provided soon.
      </p>

      <div className="text-center">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Domus+Academy+Via+Carlo+Darwin+20+Milano"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-blue-900"
        >
          View Domus Academy on Google Maps
        </a>
      </div>
    </div>
  </SectionWrapper>
);


export default App;
