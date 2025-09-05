import { Search, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function ChapterPage({ params }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const { classId, subjectId, chapterId } = params;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const toggleAnswer = (questionId) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
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

  const chapterNames = {
    1: "Real Numbers",
    2: "Polynomials",
    3: "Pair of Linear Equations in Two Variables",
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `/api/classes/${classId}/subjects/${subjectId}/chapters/${chapterId}/questions`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setQuestions(
            result.data.map((question) => ({
              id: question.question_number,
              question: question.question_text,
              answer: question.answer_text,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Fallback to sample data if API fails
        const sampleQuestions = [
          {
            id: 1,
            question: "Define real numbers and give examples.",
            answer:
              "Real numbers are the set of all rational and irrational numbers. They include all numbers that can be represented on the number line.\n\nExamples:\n• Rational numbers: 1/2, 3, -5, 0.75\n• Irrational numbers: √2, π, e\n• Integers: -3, -2, -1, 0, 1, 2, 3\n• Natural numbers: 1, 2, 3, 4, 5...\n\nReal numbers can be positive, negative, or zero, and they follow the properties of closure, associativity, commutativity, and distributivity under addition and multiplication.",
          },
          {
            id: 2,
            question: "Prove that √2 is an irrational number.",
            answer:
              "To prove that √2 is irrational, we will use the method of contradiction.\n\nProof by contradiction:\nAssume √2 is rational. Then √2 = p/q where p and q are integers with no common factors (gcd(p,q) = 1).\n\nSquaring both sides: 2 = p²/q²\nRearranging: 2q² = p²\n\nThis means p² is even, which implies p is even.\nLet p = 2k for some integer k.\n\nSubstituting: 2q² = (2k)² = 4k²\nSimplifying: q² = 2k²\n\nThis means q² is even, which implies q is even.\n\nBut if both p and q are even, they have a common factor of 2, contradicting our assumption that gcd(p,q) = 1.\n\nTherefore, our assumption is false, and √2 is irrational.",
          },
          {
            id: 3,
            question: "Find the HCF of 96 and 404 using Euclid's algorithm.",
            answer:
              "Using Euclid's Algorithm to find HCF(96, 404):\n\nStep 1: 404 = 96 × 4 + 20\nStep 2: 96 = 20 × 4 + 16\nStep 3: 20 = 16 × 1 + 4\nStep 4: 16 = 4 × 4 + 0\n\nSince the remainder is 0, the HCF is 4.\n\nVerification:\n96 = 4 × 24\n404 = 4 × 101\n\nSince gcd(24, 101) = 1, we confirm that HCF(96, 404) = 4.",
          },
          {
            id: 4,
            question: "Express 0.375 as a fraction in its simplest form.",
            answer:
              "To convert 0.375 to a fraction:\n\nStep 1: Write as a fraction with denominator as power of 10\n0.375 = 375/1000\n\nStep 2: Find the HCF of 375 and 1000\n375 = 3 × 125 = 3 × 5³\n1000 = 10³ = (2 × 5)³ = 2³ × 5³\nHCF(375, 1000) = 5³ = 125\n\nStep 3: Simplify by dividing both numerator and denominator by HCF\n375/1000 = (375 ÷ 125)/(1000 ÷ 125) = 3/8\n\nTherefore, 0.375 = 3/8 in its simplest form.",
          },
          {
            id: 5,
            question: "State and prove the fundamental theorem of arithmetic.",
            answer:
              "Fundamental Theorem of Arithmetic:\nEvery composite number can be expressed as a product of primes, and this factorization is unique, apart from the order of the prime factors.\n\nStatement: Every integer greater than 1 either is prime itself or is the product of prime numbers, and this product is unique up to the order of factors.\n\nProof outline:\nExistence: By strong induction, every integer n > 1 can be written as a product of primes.\n\nUniqueness: Suppose n = p₁p₂...pₖ = q₁q₂...qₘ where all pᵢ and qⱼ are primes.\nUsing properties of prime numbers and mathematical induction, we can show that k = m and after rearranging, pᵢ = qᵢ for all i.\n\nExample:\n60 = 2² × 3 × 5 = 4 × 15 = 12 × 5\nAll factorizations ultimately reduce to the same prime factorization: 2² × 3 × 5.",
          },
        ];
        setQuestions(sampleQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [classId, subjectId, chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-green-200/20 via-green-100/10 to-transparent dark:from-green-300/15 dark:via-green-200/8 dark:to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-200/20 via-purple-100/10 to-transparent dark:from-purple-300/15 dark:via-purple-200/8 dark:to-transparent rounded-full transform translate-x-32 translate-y-32"></div>
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
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#333333] rounded-full text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
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
              className="flex items-center space-x-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-400">/</span>
            <button
              onClick={() => handleNavigation(`/class/${classId}`)}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              Class {classId}
            </button>
            <span className="text-slate-400">/</span>
            <button
              onClick={() =>
                handleNavigation(`/class/${classId}/subject/${subjectId}`)
              }
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            >
              {subjectNames[subjectId] || subjectId}
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              Chapter {chapterId}
            </span>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-7 px-4 mb-6 rounded-full text-xs font-poppins tracking-[1.3px] uppercase bg-gradient-to-r from-green-500 to-purple-600 text-white">
              Chapter {chapterId} • {subjectNames[subjectId] || subjectId} •
              Class {classId}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[110%] font-instrument-sans font-medium mb-4 text-black dark:text-white">
              {chapterNames[chapterId] || `Chapter ${chapterId}`}
            </h1>
            <p className="text-xl font-inter text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete solutions with detailed explanations for all questions
            </p>
          </div>

          {/* Questions and Answers */}
          <div className="space-y-6">
            {questions.map((qa) => (
              <div
                key={qa.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333] shadow-sm overflow-hidden"
              >
                {/* Question */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-900/10 dark:to-purple-900/10 border-b border-slate-200 dark:border-[#333333]">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        Q{qa.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white font-instrument-sans leading-relaxed">
                        {qa.question}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleAnswer(qa.id)}
                      className="p-2 hover:bg-white/50 dark:hover:bg-black/20 rounded-lg transition-colors"
                    >
                      {expandedAnswers[qa.id] ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Answer */}
                {expandedAnswers[qa.id] && (
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <div className="flex-1">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <div className="text-slate-800 dark:text-slate-200 font-inter leading-relaxed whitespace-pre-line">
                            {qa.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show Answer Button (when collapsed) */}
                {!expandedAnswers[qa.id] && (
                  <div className="p-4 border-t border-slate-200 dark:border-[#333333]">
                    <button
                      onClick={() => toggleAnswer(qa.id)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
                    >
                      Show Answer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chapter Summary */}
          <div className="mt-12 p-6 bg-slate-50 dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#333333]">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2 font-instrument-sans">
                Chapter Summary
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 font-inter">
                {chapterNames[chapterId] || `Chapter ${chapterId}`} - Complete
                NCERT solutions for Class {classId}{" "}
                {subjectNames[subjectId] || subjectId}
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {questions.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Questions Solved
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    100%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Coverage
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
