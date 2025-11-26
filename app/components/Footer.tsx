'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = true }: FooterProps) {
  const theme = {
    dark: {
      bg: 'bg-black/50',
      text: 'text-white',
      textMuted: 'text-white/60',
      border: 'border-white/10',
    },
    light: {
      bg: 'bg-white/50',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      border: 'border-gray-300',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <footer className={`${currentTheme.bg} backdrop-blur-lg border-t ${currentTheme.border} transition-all duration-1000 mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NA</span>
              </div>
              <span className={`${currentTheme.text} font-bold text-xl transition-colors duration-1000`}>Nathan Arruda</span>
            </div>
            <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>
              Tech Lead transformando ideias em código de alta performance há mais de 10 anos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className={`${currentTheme.text} font-bold mb-4 transition-colors duration-1000`}>Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`${currentTheme.textMuted} hover:text-green-400 transition-colors text-sm`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className={`${currentTheme.textMuted} hover:text-green-400 transition-colors text-sm`}>
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/skills" className={`${currentTheme.textMuted} hover:text-green-400 transition-colors text-sm`}>
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/experiencia" className={`${currentTheme.textMuted} hover:text-green-400 transition-colors text-sm`}>
                  Experiência
                </Link>
              </li>
              <li>
                <Link href="/contato" className={`${currentTheme.textMuted} hover:text-green-400 transition-colors text-sm`}>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`${currentTheme.text} font-bold mb-4 transition-colors duration-1000`}>Conecte-se</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 hover:scale-110 transition-transform`}
                aria-label="GitHub"
              >
                <FaGithub className="text-white" size={20} />
              </a>
              <a
                href="https://linkedin.com/in/nathanarruda"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 hover:scale-110 transition-transform`}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white" size={20} />
              </a>
              <a
                href="https://twitter.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 hover:scale-110 transition-transform`}
                aria-label="Twitter"
              >
                <FaTwitter className="text-white" size={20} />
              </a>
              <a
                href="https://instagram.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 hover:scale-110 transition-transform`}
                aria-label="Instagram"
              >
                <FaInstagram className="text-white" size={20} />
              </a>
            </div>
            <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>
              Rio de Janeiro, Brasil · Remoto
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className={`pt-8 border-t ${currentTheme.border} flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-all duration-1000`}>
          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>
            © {new Date().getFullYear()} Nathan Arruda. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center space-x-2 group">
            <HiSparkles className="text-green-400 animate-pulse" size={16} />
            <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000 group-hover:text-green-400`}>
              Criado com <FaHeart className="inline text-red-500 mx-1 animate-pulse" size={12} /> por{' '}
              <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                GitHub Copilot
              </span>{' '}
              usando{' '}
              <span className="font-semibold text-green-400">Claude Sonnet 4.5</span>
              {' '}— A IA mais poderosa da Anthropic, capaz de criar experiências incríveis em tempo real!
            </p>
            <HiSparkles className="text-emerald-400 animate-pulse" size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
}
