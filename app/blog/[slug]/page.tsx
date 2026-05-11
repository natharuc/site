'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { getPostBySlug } from '../posts';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const post = getPostBySlug(params.slug);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.title = post ? `${post.title} - Nathan Arruda` : 'Post não encontrado - Nathan Arruda';
  }, [post]);

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

  if (!mounted) {
    return null;
  }

  if (!post) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
        <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className={`${currentTheme.text} text-4xl font-bold mb-4`}>Post não encontrado</h1>
          <p className={`${currentTheme.textMuted} mb-8`}>Esse post não existe ou ainda não foi cadastrado.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold">
            <HiArrowLeft />
            Voltar para o blog
          </Link>
        </main>
        <Footer isDark={isDark} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/blog" className={`inline-flex items-center gap-2 ${currentTheme.textMuted} hover:text-green-400 transition-colors mb-10`}>
          <HiArrowLeft />
          Voltar para o blog
        </Link>

        <header className="mb-12 animate-fade-in">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 text-sm font-semibold">
              {post.category}
            </span>
            <span className={`px-4 py-2 rounded-full ${currentTheme.card} ${currentTheme.textMuted} border ${currentTheme.cardBorder} text-sm`}>
              {post.publishedAt}
            </span>
          </div>

          <h1 className={`${currentTheme.text} text-5xl md:text-7xl font-bold leading-tight mb-6 transition-colors duration-1000`}>
            {post.title}
          </h1>

          <p className={`${currentTheme.textSecondary} text-xl leading-relaxed transition-colors duration-1000`}>
            {post.summary}
          </p>
        </header>

        <article className={`${currentTheme.card} blog-content backdrop-blur-lg rounded-3xl border ${currentTheme.cardBorder} p-8 md:p-12 transition-colors duration-1000`}>
          {post.body}
        </article>
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

        .blog-content :global(section) {
          margin-bottom: 2.5rem;
        }

        .blog-content :global(section:last-child) {
          margin-bottom: 0;
        }

        .blog-content :global(h2) {
          color: ${isDark ? '#ffffff' : '#111827'};
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .blog-content :global(p),
        .blog-content :global(li) {
          color: ${isDark ? 'rgba(255,255,255,0.8)' : '#1f2937'};
          line-height: 1.9;
        }

        .blog-content :global(ul) {
          display: grid;
          gap: 0.75rem;
          list-style: disc;
          padding-left: 1.5rem;
        }

        .blog-content :global(blockquote) {
          margin-top: 1rem;
          border-left: 4px solid #22c55e;
          padding: 1rem 1.25rem;
          border-radius: 1rem;
          background: rgba(34, 197, 94, 0.1);
          color: ${isDark ? 'rgba(255,255,255,0.85)' : '#1f2937'};
        }

        .blog-content :global(.featured-quote) {
          padding: 2rem;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #22c55e, #059669);
        }

        .blog-content :global(.featured-quote p) {
          color: white;
          font-size: 1.5rem;
          line-height: 1.5;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
