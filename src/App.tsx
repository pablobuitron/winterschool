import React, { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';

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
    { name: 'Dario Assante', affiliation: 'University UNINETTUNO, Italy' },
    { name: 'Pablo Buitron', affiliation: 'University UNINETTUNO, Italy' },
    { name: 'Clemente Cesarano', affiliation: 'University UNINETTUNO, Italy' },
    { name: 'Alessandro Pollini', affiliation: 'University UNINETTUNO, Italy' },
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
    //'',
    'Home',
    'About',
    'Committees',
    'Lecturers',
    'Seminars',
    'Working Groups',
    'Posters',
    'Program',
    'Registration',
    'Important Dates',
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
      case 'program':
        return <ProgramSection />;
      case 'registration':
        return <RegistrationSection />;
      case 'important-dates':
        return <ImportantDatesSection />;
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
        <div className="max-w-none mx-auto px-4 sm:px-5 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-[#17172F] whitespace-nowrap">
              <button onClick={() => handleNavClick('home')}>
                {' '}
                Winter School 2027
              </button>
            </h1>

            <div className="hidden md:block">
              <div className="ml-4 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${activeSection ===
                        item.toLowerCase().replace(/ /g, '-')
                        ? 'bg-[#666666] text-[#17172F] font-bold'
                        : 'text-[#17172F] hover:bg-gray-100 hover:text-[#F53A4B] font-normal'
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
                className="text-gray-700 hover:text-[#17172F]"
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
                  className={`block w-full text-left px-3 py-2 text-base rounded-md transition-colors ${activeSection ===
                      item.toLowerCase().replace(/ /g, '-')
                      ? 'bg-[#F53A4B] text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#F53A4B] font-normal'
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
const SectionWrapper: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <section className="bg-[#666666] text-[#17172F] py-20 text-center">
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
    <section className="relative bg-[#666666] text-[#17172F] min-h-screen py-28 flex items-center">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">

        <div className="flex-1 text-left space-y-8">
          <p className="text-lg md:text-xl uppercase tracking-[0.25em] text-[#17172F] font-medium">
            International and Interdisciplinary Winter School on
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Computational Learning
            <br />
            and Design
          </h1>

          <div className="text-xl md:text-3xl text-[#17172F] space-y-2">
            <p>
              <strong>Practical Experiments and Industrial Cases</strong>
            </p>
          </div>

          <div className="text-xl md:text-2xl text-[#17172F] space-y-2">
            <br />
            <p>February 1–5, 2027</p>
            <p>Domus Academy</p>
            <p>Via Carlo Darwin, 20 — Milano, Italy</p>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-2xl">
            <img
              src="./arteprogramata.png"
              alt="Arte programmata. 25 riquadri in bianco e nero"
              className="w-full rounded-2xl shadow-2xl border border-white/30 object-cover aspect-[1/1]"
            />

            <div className="absolute bottom-3 right-3 max-w-[85%] rounded-lg bg-black/65 px-4 py-3 text-right text-xs md:text-sm leading-relaxed text-white backdrop-blur-sm">
              <span className="font-semibold italic">
                Arte programmata. 25 riquadri in bianco e nero.
              </span>
              <br />
              <span className="text-white/85">
                (E. Mari, for the catalogue of the exhibition{' '}
                <em>Arte Programmata</em> in Düsseldorf, 1963, image from MoMA)
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section className="relative z-10 bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-5xl mx-auto space-y-16">

          <div>
            <p className="text-left mb-6">
              <strong>Organized by:</strong>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-12">

              {/* UNINETTUNO */}
              <a
                href="https://www.uninettunouniversity.net/it/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./uninettuno-logo.png"
                  alt="Università Telematica Internazionale UNINETTUNO"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>

              {/* Computational Learning and Design */}
              <a
                href="https://sites.google.com/uninettunouniversity.net/cld"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./CLDLOGO.png"
                  alt="Computational Learning and Design"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>

              {/* UNINETTUNO maths */}
              <a
                href="https://www.uninettunouniversity.net/en/sezione-di-matematica.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./uninetlogo.png"
                  alt="Università Telematica Internazionale UNINETTUNO Section of mathematics"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>

            </div>
          </div>

          <div>
            <p className="text-left mb-6">
              <strong>Within:</strong>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-12">

              {/* EIT HEI */}
              <a
                href="https://eit-hei.eu/funded-projects/explorer/impact-campus/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./eitlogo.png"
                  alt="EIT HEI"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>

              {/* IMPACT Campus */}
              <a
                href="https://www.impact-campus.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./impactcampuslogo.png"
                  alt="IMPACT Campus"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>

            </div>
          </div>

          <div>
            <p className="text-left mb-6">
              <strong>Hosted at:</strong>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-12">
              <a
                href="https://www.domusacademy.com/it/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="./domus-academy-logo.png"
                  alt="Domus Academy"
                  className="h-32 object-contain bg-white p-4 rounded-lg shadow"
                />
              </a>
            </div>
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
            <strong className="text-[#17172F]">
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

          <p className="font-medium text-[#17172F]">
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
        <h3 className="text-2xl font-semibold text-[#17172F] mb-4">
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
          <h3 className="text-2xl font-semibold text-[#17172F] mb-4">
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
    <div className="max-w-6xl mx-auto text-gray-800">
      <p className="text-base leading-relaxed mb-8">
        The three minicourses of 160 minutes each are:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border-r-0 md:border-r border-gray-200 md:pr-8">
          <p className="text-lg font-semibold">Claus-Christian Carbon</p>
          <p className="text-base text-gray-600 mt-1">
            Faculty of Human Sciences and Education University of Bamberg,
            Germany
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Title
            </p>
            <h3 className="text-lg font-semibold leading-snug mt-1">
              Cognitive science and AI
            </h3>
          </div>
        </div>

        <div className="border-r-0 md:border-r border-gray-200 md:pr-8">
          <p className="text-lg font-semibold">Luigi Laura</p>
          <p className="text-base text-gray-600 mt-1">
            Faculty of Engineering <br /> University Uninettuno, Italy
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Title
            </p>
            <h3 className="text-lg font-semibold leading-snug mt-1">
              Algorithms and AI
            </h3>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold">Maria Antonietta Grasso</p>
          <p className="text-base text-gray-600 mt-1">
            Naver Labs <br /> Meylan, France
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Title
            </p>
            <h3 className="text-lg font-semibold leading-snug mt-1">
              Socio-technical systems and AI
            </h3>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- SEMINARS ---------- */
const SeminarsSection: React.FC = () => (
  <SectionWrapper title="Seminars">
    <div className="max-w-5xl mx-auto text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-r-0 md:border-r border-gray-200 md:pr-8">
          <p className="text-lg font-semibold">Simone Pozzi</p>
          <p className="text-base text-gray-600 mt-1">
            DeepBlue s.r.l. <br /> Roma, Italy
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Title
            </p>
            <h3 className="text-lg font-semibold leading-snug mt-1">
              AI and transport
            </h3>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold">Carlo Consoli</p>
          <p className="text-base text-gray-600 mt-1">
            DOS Design <br /> Roma, Italy
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Title
            </p>
            <h3 className="text-lg font-semibold leading-snug mt-1">
              AI and functional decomposition
            </h3>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

/* ---------- PROGRAM ---------- */
const ProgramSection: React.FC = () => {
  const c = {
    head: 'bg-amber-100',
    time: 'bg-amber-50',
    gray: 'bg-gray-100',
    opening: 'bg-amber-100',
    invited: 'bg-[#cfe0f8]',
    industrial: 'bg-[#f4cccc]',
    workingGroup: 'bg-[#d9ead3]',
    lab: 'bg-[#d9ead3]',
    studentLecture: 'bg-[#c9daf8]',
    seminar: 'bg-[#fff2cc]',
    conclusion: 'bg-[#d0e0e3]',
    coffee: 'bg-white',
    lunch: 'bg-white',
    dinner: 'bg-white',
  };

  return (
    <SectionWrapper title="Program">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900">
            International and Interdisciplinary Winter School on Computational
            Learning and Design
          </h3>

          <p className="text-lg italic text-gray-600 mt-2">
            Practical Experiments and Industrial Cases
          </p>
        </div>

        {/* Tabla con scroll horizontal en pantallas pequeñas */}
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-[1100px] w-full text-sm">

            {/* ---------- HEADER ---------- */}
            <thead>
              <tr className="text-center text-gray-800">
                <th className={`p-3 font-semibold ${c.head}`}>
                  Time
                </th>

                <th className={`p-3 font-semibold ${c.head}`}>
                  Monday
                  <div className="font-normal text-xs mt-1">
                    01/02/2027
                  </div>
                </th>

                <th className={`p-3 font-semibold ${c.head}`}>
                  Tuesday
                  <div className="font-normal text-xs mt-1">
                    02/02/2027
                  </div>
                </th>

                <th className={`p-3 font-semibold ${c.head}`}>
                  Wednesday
                  <div className="font-normal text-xs mt-1">
                    03/02/2027
                  </div>
                </th>

                <th className={`p-3 font-semibold ${c.head}`}>
                  Thursday
                  <div className="font-normal text-xs mt-1">
                    04/02/2027
                  </div>
                </th>

                <th className={`p-3 font-semibold ${c.head}`}>
                  Friday
                  <div className="font-normal text-xs mt-1">
                    05/02/2027
                  </div>
                </th>
              </tr>

              <tr className="text-center text-gray-600">
                <th className={`p-2 ${c.time}`}></th>
                <th className="p-2 bg-white font-normal">Team</th>
                <th className="p-2 bg-white font-normal">Team</th>
                <th className="p-2 bg-white font-normal">Team</th>
                <th className="p-2 bg-white font-normal">Team</th>
                <th className="p-2 bg-white font-normal">Team</th>
              </tr>
            </thead>

            <tbody className="[&>tr>td]:border [&>tr>td]:border-gray-300 align-middle">

              {/* ---------- 08:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  08:30
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.opening}`}>
                  Welcome and Launch
                  <br />
                  Introduction and presentation of the Winter School
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 09:00–09:40 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  09:00–09:40
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 01
                  <br />
                  Computational Learning and Design
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 03
                  <br />
                  Strategies for machine adaptation
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 02
                  <br />
                  Dynamic systems: from equal differentials to logics
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 01
                  <br />
                  Computational Learning and Design
                </td>
              </tr>

              {/* ---------- 09:40–10:20 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  09:40–10:20
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 02
                  <br />
                  Dynamic systems: from equal differentials to logics
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 01
                  <br />
                  Computational Learning and Design
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 01
                  <br />
                  Computational Learning and Design
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 02
                  <br />
                  Dynamic systems: from equal differentials to logics
                </td>
              </tr>

              {/* ---------- 10:20–10:40 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  10:20–10:40
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>
              </tr>

              {/* ---------- 10:30–11:20 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  10:40–11:20
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 03
                  <br />
                  Strategies for machine adaptation
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 02
                  <br />
                  Dynamic systems: from equal differentials to logics
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 03
                  <br />
                  Strategies for machine adaptation
                </td>

                <td className={`p-3 font-medium ${c.invited}`}>
                  MC 03
                  <br />
                  Strategies for machine adaptation
                </td>
              </tr>

              {/* ---------- 11:20–12:10 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  11:20–12:10
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 1
                </td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 3
                </td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 5
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.workingGroup}`}
                >
                  Working Groups
                </td>
              </tr>

              {/* ---------- 12:10–12:40 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  12:10–12:40
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 2
                </td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 4
                </td>

                <td className={`p-3 font-medium ${c.industrial}`}>
                  Seminar 6
                </td>
              </tr>

              {/* ---------- Closing ---------- */}
              <tr>
                <td className={`p-2 text-center ${c.time}`}></td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>

                <td className={`p-3 ${c.workingGroup}`}>
                  Closing and next steps
                </td>
              </tr>

              {/* ---------- 13:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  13:00
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 text-center ${c.lunch}`}>
                  Lunch
                </td>

                <td className={`p-3 text-center ${c.lunch}`}>
                  Lunch
                </td>

                <td className={`p-3 text-center ${c.lunch}`}>
                  Lunch
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 13:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  13:30
                </td>

                <td className={`p-3 font-medium ${c.seminar}`}>
                  Welcome to the Students&apos; Seminar – Pre-Winter School
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 14:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  14:00
                </td>

                <td className={`p-3 ${c.seminar}`}>
                  Introduction and presentation of the seminar
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 14:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  14:30
                </td>

                <td className={`p-3 font-medium ${c.studentLecture}`}>
                  Lecture – PhD student 1
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 1 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 3 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 5 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 15:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  15:00
                </td>

                <td className={`p-3 font-medium ${c.studentLecture}`}>
                  Lecture – PhD student 2
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 15:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  15:30
                </td>

                <td className={c.gray}></td>

                <td
                  rowSpan={3}
                  className={`p-3 font-medium align-middle ${c.workingGroup}`}
                >
                  Working Groups
                </td>

                <td
                  rowSpan={3}
                  className={`p-3 font-medium align-middle ${c.workingGroup}`}
                >
                  Working Groups
                </td>

                <td
                  rowSpan={3}
                  className={`p-3 font-medium align-middle ${c.workingGroup}`}
                >
                  Working Groups
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 16:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  16:00
                </td>

                <td className={`p-3 font-medium ${c.studentLecture}`}>
                  Lecture – PhD student 3
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 16:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  16:30
                </td>

                <td className={`p-3 font-medium ${c.studentLecture}`}>
                  Lecture – PhD student 4
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 17:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  17:00
                </td>

                <td className={c.gray}></td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={`p-3 text-center ${c.coffee}`}>
                  Coffee
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 17:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  17:30
                </td>

                <td className={`p-3 ${c.conclusion}`}>
                  Conclusion
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 2 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 4 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td
                  rowSpan={2}
                  className={`p-3 font-medium align-middle ${c.lab}`}
                >
                  Lab 6 – Hands-on experiments:
                  <br />
                  Group discussion on industrial cases
                </td>

                <td className={c.gray}></td>
              </tr>

              {/* ---------- 18:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  18:00
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 18:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  18:30
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 19:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  19:00
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 19:30 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  19:30
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>
              </tr>

              {/* ---------- 20:00 ---------- */}
              <tr>
                <td className={`p-2 text-center font-medium ${c.time}`}>
                  20:00
                </td>

                <td className={c.gray}></td>
                <td className={c.gray}></td>
                <td className={c.gray}></td>

                <td className={`p-3 text-center font-medium ${c.dinner}`}>
                  Social Dinner
                </td>

                <td className={c.gray}></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          MC = Mini Course
        </p>

        {/*<p>
          WG = Working Groups
        </p>*/}

        {/* ---------- LEGEND ---------- */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Legend
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.opening}`}
              />
              <span>Opening / Introduction</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.invited}`}
              />
              <span>MC</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.industrial}`}
              />
              <span>Industrial Cases</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.workingGroup}`}
              />
              <span>Working Groups / Labs</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.studentLecture}`}
              />
              <span>PhD Student Lectures</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-5 w-12 rounded ${c.conclusion}`}
              />
              <span>Conclusion</span>
            </div>

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
        You can register{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe9T4RHCgxVi65PdoA0hvUKMNMn4FINWV8rgmPWgfNWFt1OLw/viewform?usp=publish-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-blue-900"
        >
          here
        </a>
        .
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- IMPORTANT DATES ---------- */
const ImportantDatesSection: React.FC = () => (
  <SectionWrapper title="Important Dates">
    <div className="max-w-4xl mx-auto text-gray-800 space-y-8">
      <p className="text-base leading-relaxed">
        TBA
      </p>
    </div>
  </SectionWrapper>
);

/* ---------- SPONSORS ---------- */
const SponsorsSection: React.FC = () => (
  <SectionWrapper title="Sponsors">
    <div className="max-w-3xl mx-auto text-gray-800 text-base leading-relaxed space-y-6">
      <div className="flex flex-wrap justify-start items-center gap-12">

        {/* EIT HEI */}
        <a
          href="https://eit-hei.eu/funded-projects/explorer/impact-campus/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img
            src="./eitlogo.png"
            alt="EIT HEI"
            className="h-32 object-contain bg-white p-4 rounded-lg shadow"
          />
        </a>

        {/* IMPACT Campus */}
        <a
          href="https://www.impact-campus.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img
            src="./impactcampuslogo.png"
            alt="IMPACT Campus"
            className="h-32 object-contain bg-white p-4 rounded-lg shadow"
          />
        </a>

      </div>
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
            className="text-blue-700 underline hover:text-[#17172F]"
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
          className="text-blue-700 underline hover:text-[#17172F]"
        >
          View Domus Academy on Google Maps
        </a>
      </div>
    </div>
  </SectionWrapper>
);

export default App;