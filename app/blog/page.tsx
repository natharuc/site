'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight, HiChartBar, HiCode, HiDocumentText, HiSparkles } from 'react-icons/hi';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const posts = [
  {
    title: 'IA e o futuro da TI',
    subtitle: 'Menos executores, mais orquestradores',
    description:
      'Uma previsão direta sobre como a inteligência artificial deve impactar devs, QAs, suporte, times de tecnologia e o perfil do profissional que continuará relevante.',
    href: '/blog/ia-futuro-ti',
    date: '24/04/2026',
    category: 'Mercado',
    readingTime: '7 min de leitura',
    icon: HiChartBar,
  },
];

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
      cardStrong: 'bg-black/30',
      cardBorder: 'border-white/10',
    },
    light: {
      bg: 'from-gray-50 via-green-50 to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-800',
      textMuted: 'text-gray-700',
      card: 'bg-white shadow-lg',
      cardStrong: 'bg-white',
      cardBorder: 'border-gray-300',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

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
            Reflexões diretas sobre carreira, arquitetura, IA, desenvolvimento de software e os movimentos que estão mudando a TI.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 mb-16">
          <Link
            href={posts[0].href}
            className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 md:p-10 border ${currentTheme.cardBorder} relative overflow-hidden hover:scale-[1.02] transition-all duration-300 group`}
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-8">
                <HiSparkles className="text-white" size={32} />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 text-sm font-semibold">
                  Destaque
                </span>
                <span className={`px-3 py-1 rounded-full ${currentTheme.cardStrong} ${currentTheme.textMuted} border ${currentTheme.cardBorder} text-sm`}>
                  {posts[0].date}
                </span>
                <span className={`px-3 py-1 rounded-full ${currentTheme.cardStrong} ${currentTheme.textMuted} border ${currentTheme.cardBorder} text-sm`}>
                  {posts[0].readingTime}
                </span>
              </div>

              <h2 className={`${currentTheme.text} text-3xl md:text-5xl font-bold mb-5 group-hover:text-green-400 transition-colors duration-300`}>
                {posts[0].title}
              </h2>

              <p className="text-green-400 text-xl font-semibold mb-4">{posts[0].subtitle}</p>

              <p className={`${currentTheme.textSecondary} leading-relaxed text-lg mb-8 transition-colors duration-1000`}>
                {posts[0].description}
              </p>

              <span className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Ler postagem
                <HiArrowRight />
              </span>
            </div>
          </Link>

          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
            <HiCode className="text-green-400 mb-6" size={42} />
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>
              Sobre o blog
            </h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed mb-6 transition-colors duration-1000`}>
              Um espaço para registrar opiniões, previsões e aprendizados sobre desenvolvimento de software, liderança técnica, arquitetura e o impacto da IA no mercado.
            </p>
            <div className="space-y-3">
              {['IA aplicada ao trabalho real', 'Carreira em tecnologia', 'Arquitetura e liderança técnica', 'Mercado e produtividade'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className={`${currentTheme.textMuted} transition-colors duration-1000`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className={`${currentTheme.text} text-3xl font-bold mb-2 transition-colors duration-1000`}>Todas as postagens</h2>
              <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                Lista com os textos publicados até agora.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
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
                        {post.date}
                      </span>
                    </div>

                    <h3 className={`${currentTheme.text} text-xl font-bold mb-2 group-hover:text-green-400 transition-colors duration-300`}>
                      {post.title}
                    </h3>
                    <p className="text-green-400 font-semibold mb-3">{post.subtitle}</p>
                    <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                      {post.description}
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
