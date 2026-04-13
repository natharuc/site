'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import { HiUpload, HiClipboardCopy, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function QRCodeReader() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.title = 'QR Code Reader - Nathan Arruda';
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

  const processImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido.');
      setQrContent(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setQrContent(null);
    setCopied(false);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrContent(code.data);
        setError(null);
      } else {
        setQrContent(null);
        setError('Nenhum QR Code encontrado na imagem. Tente outra imagem.');
      }

      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      setError('Erro ao carregar a imagem. Tente novamente.');
      setPreviewUrl(null);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCopy = async () => {
    if (!qrContent) return;
    try {
      await navigator.clipboard.writeText(qrContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = qrContent;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
            QR Code <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Reader</span>
          </h1>
          <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>
            Faça upload de uma imagem com QR Code e descubra o conteúdo
          </p>
        </div>

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-12 border-2 border-dashed ${
            isDragging
              ? 'border-green-400 bg-green-500/10'
              : currentTheme.cardBorder
          } transition-all duration-300 cursor-pointer hover:border-green-400 hover:bg-green-500/5 text-center mb-8`}
        >
          <HiUpload className={`mx-auto mb-4 ${isDragging ? 'text-green-400' : currentTheme.textMuted} transition-colors duration-300`} size={48} />
          <p className={`${currentTheme.text} text-lg font-semibold mb-2 transition-colors duration-1000`}>
            Clique ou arraste uma imagem aqui
          </p>
          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>
            Suporta PNG, JPG, GIF, WebP e outros formatos de imagem
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} transition-all duration-300 mb-8`}>
            <h3 className={`${currentTheme.text} font-semibold mb-4 transition-colors duration-1000`}>Imagem carregada:</h3>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Imagem com QR Code"
                className="max-w-full max-h-80 rounded-lg object-contain"
              />
            </div>
          </div>
        )}

        {/* QR Code Result */}
        {qrContent && (
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} transition-all duration-300 mb-8`}>
            <div className="flex items-center space-x-3 mb-4">
              <HiCheckCircle className="text-green-400" size={28} />
              <h3 className={`${currentTheme.text} text-xl font-bold transition-colors duration-1000`}>QR Code encontrado!</h3>
            </div>
            <div className={`${isDark ? 'bg-black/30' : 'bg-gray-100'} rounded-xl p-4 mb-4 transition-colors duration-1000`}>
              <p className={`${currentTheme.text} break-all font-mono text-sm transition-colors duration-1000`}>
                {qrContent}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-green-500/50'
              }`}
            >
              {copied ? (
                <>
                  <HiCheckCircle size={20} />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <HiClipboardCopy size={20} />
                  <span>Copiar conteúdo</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={`${isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'} backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 mb-8`}>
            <div className="flex items-center space-x-3">
              <HiXCircle className="text-red-400 flex-shrink-0" size={28} />
              <p className={`${isDark ? 'text-red-300' : 'text-red-600'} transition-colors duration-1000`}>{error}</p>
            </div>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

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
