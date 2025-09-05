import { Search, ArrowLeft, BookOpen, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function ClassPage({ params }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const classId = params.classId;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`/api/classes/${classId}/subjects`);
        if (!response.ok) {
          throw new Error(`Failed to fetch subjects: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setSubjects(
            result.data.map((subject) => ({
              id: subject.slug,
              name: subject.name,
              chapters: subject.chapters_count || 0,
              questions: subject.questions_count || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        // Fallback to sample data if API fails
        const sampleSubjects = [
          {
            id: "mathematics",
            name: "Mathematics",
            chapters: 15,
            questions: 120,
          },
          { id: "science", name: "Science", chapters: 18, questions: 150 },
          { id: "english", name: "English", chapters: 10, questions: 80 },
          {
            id: "social-science",
            name: "Social Science",
            chapters: 20,
            questions: 140,
          },
          { id: "hindi", name: "Hindi", chapters: 12, questions: 90 },
          ...(parseInt(classId) >= 9
            ? [
                {
                  id: "physics",
                  name: "Physics",
                  chapters: 15,
                  questions: 110,
                },
                {
                  id: "chemistry",
                  name: "Chemistry",
                  chapters: 14,
                  questions: 105,
                },
                {
                  id: "biology",
                  name: "Biology",
                  chapters: 16,
                  questions: 130,
                },
              ]
            : []),
        ];
        setSubjects(sampleSubjects);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [classId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Loading subjects...
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
                  placeholder="Search by subject, chapter, or question..."
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

      {/* Content */}
      <main className="relative pt-8 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              Class {classId}
            </span>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-7 px-4 mb-6 rounded-full text-xs font-poppins tracking-[1.3px] uppercase bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              Class {classId}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[110%] font-instrument-sans font-medium mb-4 text-black dark:text-white">
              Choose Your Subject
            </h1>
            <p className="text-xl font-inter text-slate-600 dark:text-slate-300 leading-relaxed">
              Select a subject to explore chapters and access detailed solutions
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() =>
                  handleNavigation(`/class/${classId}/subject/${subject.id}`)
                }
                className="group block w-full p-6 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333] shadow-sm hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  {/* Subject Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 font-instrument-sans">
                    {subject.name}
                  </h3>

                  {/* Stats */}
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>{subject.chapters} Chapters</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{subject.questions} Questions</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-4 w-8 h-8 mx-auto bg-slate-100 dark:bg-[#333333] rounded-full flex items-center justify-center group-hover:bg-purple-500 dark:group-hover:bg-purple-500 transition-colors duration-300">
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
      </main>

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
