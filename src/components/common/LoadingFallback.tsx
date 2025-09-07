import React, { useState, useEffect } from 'react';

interface LoadingFallbackProps {
  message?: string;
  submessage?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = "Loading",
  submessage = "Please wait while we prepare everything for you"
}) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 1);
    }, 100);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,theme(colors.blue.500)_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,theme(colors.indigo.500)_0%,transparent_50%)] opacity-20"></div>
      </div>

      {/* Main loading container */}
      <div className="relative mx-4 w-full max-w-md animate-fade-in-up">
        <div className="rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl p-8 text-center">

          {/* Spinning loader with nested circles */}
          <div className="relative mx-auto mb-8 h-20 w-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 animate-spin"></div>
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border-3 border-transparent border-t-indigo-400 dark:border-t-indigo-300 animate-spin-reverse"></div>
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
            </div>
          </div>

          {/* Loading text with gradient */}
          <div className="mb-4">
            <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
              {message}{dots}
            </h1>
          </div>

          {/* Submessage */}
          <p className="mb-6 text-slate-600 dark:text-slate-300 font-medium">
            {submessage}
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              ></div>
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full animate-float opacity-60"
                style={{
                  left: `${20 + (i * 12)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i * 0.2)}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Custom border width */
        .border-3 {
          border-width: 3px;
        }

        /* Smooth transitions for dark mode */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
      `}</style>
    </div>
  );
};