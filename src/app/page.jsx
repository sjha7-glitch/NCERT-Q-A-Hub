import { Search, BookOpen, Users, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes");
        if (!response.ok) {
          throw new Error(`Failed to fetch classes: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setClasses(
            result.data.map((classData) => ({
              number: classData.class_number,
              subjects: parseInt(classData.subjects_count) || 0,
              questions: parseInt(classData.total_questions) || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        // Fallback to sample data if API fails
        setClasses([
          { number: 6, subjects: 6, questions: 450 },
          { number: 7, subjects: 6, questions: 520 },
          { number: 8, subjects: 7, questions: 680 },
          { number: 9, subjects: 8, questions: 750 },
          { number: 10, subjects: 8, questions: 850 },
          { number: 11, subjects: 9, questions: 920 },
          { number: 12, subjects: 9, questions: 980 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Loading classes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-200/20 via-blue-100/10 to-transparent dark:from-blue-300/15 dark:via-blue-200/8 dark:to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-orange-200/20 via-orange-100/10 to-transparent dark:from-orange-300/15 dark:via-orange-200/8 dark:to-transparent rounded-full transform translate-x-32 translate-y-32"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm border-b border-slate-200 dark:border-[#333333]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavigation("/")}
              className="font-space-grotesk font-bold text-2xl text-black dark:text-white"
            >
              NCERT Q&A Hub
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by class, subject, chapter, or question..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#about"
                className="font-inter text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="font-inter text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center justify-center h-7 px-4 mb-8 rounded-full text-xs font-poppins tracking-[1.3px] uppercase bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            NCERT Solutions
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[110%] font-instrument-sans font-medium mb-6">
            <span className="text-black dark:text-white">
              Complete NCERT
              <br />
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Question & Answers
            </span>
          </h1>

          {/* Body Text */}
          <p className="max-w-2xl mx-auto text-xl font-inter text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
            Access comprehensive solutions for Classes 6-12 with detailed
            explanations, step-by-step answers, and chapter-wise organization
            for all NCERT subjects.
          </p>
        </div>
      </section>

      {/* Class Cards Section */}
      <section className="relative pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-instrument-sans font-medium text-center mb-4 text-black dark:text-white">
            Choose Your Class
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12 font-inter">
            Select your class to access all subjects and chapters
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classes.map((classData) => (
              <button
                key={classData.number}
                onClick={() => handleNavigation(`/class/${classData.number}`)}
                className="group block w-full p-8 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333] shadow-sm hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  {/* Class Number */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">
                      {classData.number}
                    </span>
                  </div>

                  {/* Class Title */}
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-3 font-instrument-sans">
                    Class {classData.number}
                  </h3>

                  {/* Stats */}
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{classData.subjects} Subjects</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{classData.questions}+ Questions</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-4 w-8 h-8 mx-auto bg-slate-100 dark:bg-[#333333] rounded-full flex items-center justify-center group-hover:bg-blue-500 dark:group-hover:bg-blue-500 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-slate-50 dark:bg-[#1E1E1E]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5000+
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-inter">
                Questions Solved
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                50+
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-inter">
                Subjects Covered
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                7
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-inter">
                Classes Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-white dark:bg-[#121212] border-t border-slate-200 dark:border-[#333333] py-12"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="font-space-grotesk font-bold text-xl text-black dark:text-white mb-4">
                NCERT Q&A Hub
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter mb-4">
                Your comprehensive resource for NCERT solutions across all
                classes and subjects. Making learning accessible and effective
                for students nationwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>sjha73251@gmail.com</li>
                <li>+91 9667946447</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-[#333333] mt-8 pt-8 text-center text-slate-600 dark:text-slate-300">
            <p>&copy; 2025 NCERT Q&A Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600&family=Space+Grotesk:wght@700&family=Poppins:wght@400&family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .font-instrument-sans {
          font-family: 'Instrument Sans', sans-serif;
        }
        
        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
