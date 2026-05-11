'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight, HiDocumentText } from 'react-icons/hi';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { getLatestPosts } from './posts';

export default function Blog() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.title = 'Blog - Nathan Arruda';
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    if (newTheme) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  };

  const theme = {
    dark: {
      bg: 'from-black via-green-900 to-black',
      text: 'text-white',
      textSecondary: 'text-white/80',
      textMuted: 'text-white/60',
      card: 'bg-white/5',
      cardBorder: 'border-white/10',
    },
    light: {
      bg: 'from-gray-50 via-green-50 to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-800',
      textMuted: 'text-gray-700',
      card: 'bg-white shadow-lg',
      cardBorder: 'border-gray-300',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;
  const posts = getLatestPosts();
  const featuredPost = posts[0];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-sm font-semibold mb-6">
            <HiDocumentText />
            Blog
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold ${currentTheme.text} mb-6 transition-colors duration-1000`}>
            Ideias sobre{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              tecnologia
            </span>
          </h1>

          <p className={`${currentTheme.textMuted} text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-1000`}>
            Posts sobre IA, arquitetura, carreira, desenvolvimento de software e tecnologia.
          </p>
        </section>

        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 md:p-10 border ${currentTheme.cardBorder} relative overflow-hidden hover:scale-[1.02] transition-all duration-300 group block mb-10`}
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-8">
                <featuredPost.icon className="text-white" size={32} />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 text-sm font-semibold">
                  Destaque
                </span>
                <span className={`px-3 py-1 rounded-full ${currentTheme.card} ${currentTheme.textMuted} border ${currentTheme.cardBorder} text-sm`}>
                  {featuredPost.publishedAt}
                </span>
              </div>

              <h2 className={`${currentTheme.text} text-3xl md:text-5xl font-bold mb-5 group-hover:text-green-400 transition-colors duration-300`}>
                {featuredPost.title}
              </h2>

              <p className={`${currentTheme.textSecondary} leading-relaxed text-lg mb-8 transition-colors duration-1000`}>
                {featuredPost.summary}
              </p>

              <span className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Ler postagem
                <HiArrowRight />
              </span>
            </div>
          </Link>
        )}

        <section>
          <h2 className={`${currentTheme.text} text-3xl font-bold mb-8 transition-colors duration-1000`}>
            Todas as postagens
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <post.icon className="text-white" size={26} />
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className={`${currentTheme.textMuted} text-xs py-1 transition-colors duration-1000`}>
                        {post.publishedAt}
                      </span>
                    </div>

                    <h3 className={`${currentTheme.text} text-xl font-bold mb-3 group-hover:text-green-400 transition-colors duration-300`}>
                      {post.title}
                    </h3>
                    <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                      {post.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer isDark={isDark} />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
