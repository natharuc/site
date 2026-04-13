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
  const [isProcessing, setIsProcessing] = useState(false);
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

  const tryDecode = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    // Strategy 1: Original image at full size
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) return code.data;

    // Strategy 2: Grayscale + binarization with multiple thresholds
    for (const threshold of [128, 100, 160, 80, 180]) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        const val = gray < threshold ? 0 : 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imageData, 0, 0);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) return code.data;
    }

    // Strategy 3: Inverted colors
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const invData = imageData.data;
    for (let i = 0; i < invData.length; i += 4) {
      invData[i] = 255 - invData[i];
      invData[i + 1] = 255 - invData[i + 1];
      invData[i + 2] = 255 - invData[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) return code.data;

    // Strategy 4: Scaled down versions (large images can cause issues)
    for (const scale of [0.5, 0.75, 0.25]) {
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      imageData = ctx.getImageData(0, 0, w, h);
      code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) return code.data;

      // Also try binarized at this scale
      const sData = imageData.data;
      for (let i = 0; i < sData.length; i += 4) {
        const gray = sData[i] * 0.299 + sData[i + 1] * 0.587 + sData[i + 2] * 0.114;
        const val = gray < 128 ? 0 : 255;
        sData[i] = val;
        sData[i + 1] = val;
        sData[i + 2] = val;
      }
      ctx.putImageData(imageData, 0, 0);
      imageData = ctx.getImageData(0, 0, w, h);
      code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) return code.data;
    }

    // Strategy 5: Crop to square regions (QR code may be in a portion of the image)
    const cropRegions = [
      { x: 0, y: 0, w: img.width, h: img.width },                                          // top square
      { x: 0, y: 0, w: Math.round(img.width * 0.9), h: Math.round(img.width * 0.9) },      // top-left 90%
      { x: 0, y: 0, w: img.width, h: Math.round(img.height * 0.6) },                        // top 60%
      { x: 0, y: 0, w: img.width, h: Math.round(img.height * 0.75) },                       // top 75%
      { x: Math.round(img.width * 0.05), y: Math.round(img.height * 0.05), w: Math.round(img.width * 0.9), h: Math.round(img.height * 0.5) }, // center crop
    ];

    for (const region of cropRegions) {
      const cw = Math.min(region.w, img.width - region.x);
      const ch = Math.min(region.h, img.height - region.y);
      if (cw <= 0 || ch <= 0) continue;

      canvas.width = cw;
      canvas.height = ch;
      ctx.drawImage(img, region.x, region.y, cw, ch, 0, 0, cw, ch);
      imageData = ctx.getImageData(0, 0, cw, ch);
      code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) return code.data;

      // Also try binarized crop
      const cData = imageData.data;
      for (let i = 0; i < cData.length; i += 4) {
        const gray = cData[i] * 0.299 + cData[i + 1] * 0.587 + cData[i + 2] * 0.114;
        const val = gray < 128 ? 0 : 255;
        cData[i] = val;
        cData[i + 1] = val;
        cData[i + 2] = val;
      }
      ctx.putImageData(imageData, 0, 0);
      imageData = ctx.getImageData(0, 0, cw, ch);
      code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) return code.data;
    }

    // Strategy 6: High contrast enhancement
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = 'contrast(2) grayscale(1)';
    ctx.drawImage(img, 0, 0);
    ctx.filter = 'none';
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) return code.data;

    return null;
  }, []);

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
    setIsProcessing(true);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Use setTimeout to let the UI update with the loading state before heavy processing
      setTimeout(() => {
        const result = tryDecode(canvas, ctx, img);

        if (result) {
          setQrContent(result);
          setError(null);
        } else {
          setQrContent(null);
          setError('Nenhum QR Code encontrado na imagem. Tente outra imagem.');
        }

        setIsProcessing(false);
        URL.revokeObjectURL(url);
      }, 50);
    };

    img.onerror = () => {
      setError('Erro ao carregar a imagem. Tente novamente.');
      setPreviewUrl(null);
      setIsProcessing(false);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [tryDecode]);

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

        {/* Processing Indicator */}
        {isProcessing && (
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} transition-all duration-300 mb-8 text-center`}>
            <div className="flex items-center justify-center space-x-3">
              <svg className="animate-spin h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className={`${currentTheme.text} font-semibold transition-colors duration-1000`}>Analisando imagem...</p>
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
