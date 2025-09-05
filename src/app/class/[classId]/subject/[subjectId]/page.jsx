import { Search, ArrowLeft, FileText, Hash } from "lucide-react";
import { useState, useEffect } from "react";

export default function SubjectPage({ params }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { classId, subjectId } = params;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const subjectNames = {
    mathematics: "Mathematics",
    science: "Science",
    english: "English",
    "social-science": "Social Science",
    hindi: "Hindi",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `/api/classes/${classId}/subjects/${subjectId}/chapters`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch chapters: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setChapters(
            result.data.map((chapter) => ({
              id: chapter.chapter_number,
              name: chapter.name,
              questions: chapter.questions_count || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
        // Fallback to sample data if API fails
        const sampleChapters = {
          mathematics: [
            { id: 1, name: "Real Numbers", questions: 25 },
            { id: 2, name: "Polynomials", questions: 20 },
            {
              id: 3,
              name: "Pair of Linear Equations in Two Variables",
              questions: 30,
            },
            { id: 4, name: "Quadratic Equations", questions: 28 },
            { id: 5, name: "Arithmetic Progressions", questions: 22 },
          ],
          science: [
            { id: 1, name: "Light - Reflection and Refraction", questions: 25 },
            { id: 2, name: "Human Eye and Colourful World", questions: 20 },
            { id: 3, name: "Electricity", questions: 30 },
            {
              id: 4,
              name: "Magnetic Effects of Electric Current",
              questions: 28,
            },
            { id: 5, name: "Our Environment", questions: 18 },
          ],
          english: [
            { id: 1, name: "A Letter to God", questions: 15 },
            {
              id: 2,
              name: "Nelson Mandela: Long Walk to Freedom",
              questions: 18,
            },
            { id: 3, name: "Two Stories about Flying", questions: 16 },
            { id: 4, name: "From the Diary of Anne Frank", questions: 20 },
            { id: 5, name: "Glimpses of India", questions: 14 },
          ],
        };
        const subjectChapters = sampleChapters[subjectId] || [
          { id: 1, name: "Chapter 1", questions: 15 },
          { id: 2, name: "Chapter 2", questions: 18 },
          { id: 3, name: "Chapter 3", questions: 20 },
        ];
        setChapters(subjectChapters);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [classId, subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Loading chapters...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-200/20 via-purple-100/10 to-transparent dark:from-purple-300/15 dark:via-purple-200/8 dark:to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-blue-200/20 via-blue-100/10 to-transparent dark:from-blue-300/15 dark:via-blue-200/8 dark:to-transparent rounded-full transform translate-x-32 translate-y-32"></div>
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
                  placeholder="Search by chapter or question..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative pt-8 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8 flex-wrap">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-400">/</span>
            <button
              onClick={() => handleNavigation(`/class/${classId}`)}
              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
            >
              Class {classId}
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              {subjectNames[subjectId] || subjectId}
            </span>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-7 px-4 mb-6 rounded-full text-xs font-poppins tracking-[1.3px] uppercase bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              {subjectNames[subjectId] || subjectId} • Class {classId}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[110%] font-instrument-sans font-medium mb-4 text-black dark:text-white">
              Select Chapter
            </h1>
            <p className="text-xl font-inter text-slate-600 dark:text-slate-300 leading-relaxed">
              Choose a chapter to view all questions and detailed answers
            </p>
          </div>

          {/* Chapters List */}
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() =>
                  handleNavigation(
                    `/class/${classId}/subject/${subjectId}/chapter/${chapter.id}`,
                  )
                }
                className="group block w-full p-6 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333] shadow-sm hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Chapter Number */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Hash className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-left">
                      {/* Chapter Title */}
                      <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-1 font-instrument-sans">
                        Chapter {chapter.id}: {chapter.name}
                      </h3>

                      {/* Questions Count */}
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileText className="w-4 h-4" />
                        <span>{chapter.questions} Questions Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-8 h-8 bg-slate-100 dark:bg-[#333333] rounded-full flex items-center justify-center group-hover:bg-purple-500 dark:group-hover:bg-purple-500 transition-colors duration-300">
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

          {/* Subject Summary */}
          <div className="mt-12 p-6 bg-slate-50 dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333]">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2 font-instrument-sans">
                {subjectNames[subjectId] || subjectId} Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 font-inter">
                Complete NCERT solutions with detailed explanations for Class{" "}
                {classId}
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {chapters.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Chapters
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {chapters.reduce(
                      (total, chapter) => total + chapter.questions,
                      0,
                    )}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Total Questions
                  </div>
                </div>
              </div>
            </div>
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
