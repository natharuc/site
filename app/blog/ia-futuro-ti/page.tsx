'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  HiArrowLeft,
  HiChartBar,
  HiCode,
  HiLightningBolt,
  HiShieldCheck,
  HiSparkles,
  HiUserGroup,
} from 'react-icons/hi';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

const impactRows = [
  ['2026', 'IA como ferramenta obrigatória', 'Dev júnior tradicional', '15% a 25%'],
  ['2026', 'IA como ferramenta obrigatória', 'QA manual', '20% a 30%'],
  ['2026', 'IA como ferramenta obrigatória', 'Suporte N1', '20% a 30%'],
  ['2026', 'IA como ferramenta obrigatória', 'Front-end simples', '15% a 25%'],
  ['2026', 'IA como ferramenta obrigatória', 'Backend CRUD', '15% a 25%'],
  ['2027', 'IA como agente executor', 'Dev júnior tradicional', '30% a 45%'],
  ['2027', 'IA como agente executor', 'QA manual', '35% a 50%'],
  ['2027', 'IA como agente executor', 'Suporte N1', '35% a 50%'],
  ['2027', 'IA como agente executor', 'Front-end simples', '30% a 45%'],
  ['2027', 'IA como agente executor', 'Backend CRUD', '25% a 40%'],
  ['2028', 'Compressão rápida dos times', 'Dev júnior tradicional', '45% a 60%'],
  ['2028', 'Compressão rápida dos times', 'QA manual', '50% a 65%'],
  ['2028', 'Compressão rápida dos times', 'Suporte N1', '50% a 65%'],
  ['2028', 'Compressão rápida dos times', 'Front-end simples', '40% a 55%'],
  ['2028', 'Compressão rápida dos times', 'Backend CRUD', '35% a 50%'],
  ['2029', 'Times menores', 'Dev júnior tradicional', '55% a 70%'],
  ['2029', 'Times menores', 'QA manual', '60% a 75%'],
  ['2029', 'Times menores', 'Suporte N1', '60% a 75%'],
  ['2029', 'Times menores', 'Front-end simples', '50% a 65%'],
  ['2029', 'Times menores', 'Backend CRUD', '45% a 60%'],
  ['2030+', 'Novo mercado de TI', 'Dev júnior tradicional', '60% a 80%'],
  ['2030+', 'Novo mercado de TI', 'QA manual', '70% a 85%'],
  ['2030+', 'Novo mercado de TI', 'Suporte N1', '70% a 85%'],
  ['2030+', 'Novo mercado de TI', 'Front-end simples', '55% a 75%'],
  ['2030+', 'Novo mercado de TI', 'Backend CRUD', '50% a 70%'],
];

const phases = [
  {
    title: 'IA como ferramenta obrigatória',
    period: '2024–2026',
    description: 'A IA vira parte natural do trabalho diário. Quem usa bem entrega mais; quem ignora começa a ficar para trás.',
    icon: HiSparkles,
  },
  {
    title: 'IA como agente executor',
    period: '2026–2027',
    description: 'A IA começa a pegar tarefas inteiras: criar features, testar, corrigir bugs simples, abrir PRs e gerar documentação.',
    icon: HiLightningBolt,
  },
  {
    title: 'Compressão rápida dos times',
    period: '2027–2029',
    description: 'Empresas passam a questionar o tamanho das squads. Tarefas repetitivas deixam de justificar tantas pessoas.',
    icon: HiUserGroup,
  },
  {
    title: 'Novo mercado de TI',
    period: '2030+',
    description: 'O valor deixa de estar só em escrever código e passa para decidir, validar, entender negócio, arquitetura e risco.',
    icon: HiShieldCheck,
  },
];

export default function IaFuturoTi() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.title = 'IA e o futuro da TI - Nathan Arruda';
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
      tableBorder: 'border-white/10',
    },
    light: {
      bg: 'from-gray-50 via-green-50 to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-800',
      textMuted: 'text-gray-700',
      card: 'bg-white shadow-lg',
      cardStrong: 'bg-white',
      cardBorder: 'border-gray-300',
      tableBorder: 'border-gray-200',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 ${currentTheme.textMuted} hover:text-green-400 transition-colors mb-10`}
        >
          <HiArrowLeft />
          Voltar para home
        </Link>

        <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center mb-16">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-sm font-semibold mb-6">
              <HiSparkles />
              Opinião • Tecnologia • Mercado
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold ${currentTheme.text} leading-tight mb-6 transition-colors duration-1000`}>
              IA e o futuro da{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                TI
              </span>
            </h1>

            <p className={`${currentTheme.textSecondary} text-xl leading-relaxed mb-8 transition-colors duration-1000`}>
              Menos executores, mais orquestradores. Uma previsão direta sobre como a inteligência
              artificial pode impactar devs, QAs, suporte e times de tecnologia nos próximos anos.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-400/20">
                Ponto de virada: 2027–2028
              </span>
              <span className={`px-4 py-2 rounded-full ${currentTheme.card} ${currentTheme.textMuted} border ${currentTheme.cardBorder}`}>
                Publicado em 24/04/2026
              </span>
            </div>
          </div>

          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder} relative overflow-hidden`}>
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <HiChartBar className="text-green-400 mb-6" size={48} />
              <p className={`${currentTheme.text} text-2xl font-bold mb-4 transition-colors duration-1000`}>
                A IA não precisa substituir 100% um profissional.
              </p>
              <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                Ela só precisa permitir que uma pessoa boa faça o trabalho de várias. Quando isso
                acontece, o mercado inteiro muda.
              </p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {phases.map((phase) => (
            <div
              key={phase.title}
              className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} transition-all duration-300 hover:scale-105`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-5">
                <phase.icon className="text-white" size={24} />
              </div>
              <p className="text-green-400 font-bold mb-2">{phase.period}</p>
              <h2 className={`${currentTheme.text} text-lg font-bold mb-3 transition-colors duration-1000`}>{phase.title}</h2>
              <p className={`${currentTheme.textMuted} text-sm leading-relaxed transition-colors duration-1000`}>{phase.description}</p>
            </div>
          ))}
        </section>

        <article className={`${currentTheme.card} backdrop-blur-lg rounded-3xl border ${currentTheme.cardBorder} overflow-hidden mb-16`}>
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>O que realmente está ameaçado?</h2>
              <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
                As posições mais ameaçadas não são todas as posições de tecnologia, mas aquelas baseadas
                em tarefas repetitivas, previsíveis e com pouca tomada de decisão.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Desenvolvedor júnior tradicional',
                'QA manual repetitivo',
                'Suporte técnico de primeiro nível',
                'Front-end simples',
                'Backend focado apenas em CRUD',
                'Analista que apenas repassa requisito',
              ].map((item) => (
                <div key={item} className={`${currentTheme.cardStrong} rounded-2xl p-5 border ${currentTheme.cardBorder}`}>
                  <div className="flex items-center gap-3">
                    <HiCode className="text-green-400 flex-shrink-0" />
                    <span className={`${currentTheme.textSecondary} transition-colors duration-1000`}>{item}</span>
                  </div>
                </div>
              ))}
            </div>

            <section>
              <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>O júnior será o mais pressionado</h2>
              <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
                Antes, tarefas pequenas eram o caminho natural de entrada no mercado: criar uma tela,
                ajustar um endpoint, corrigir um bug simples ou escrever um teste básico. Agora, essas
                tarefas são justamente as que a IA consegue executar melhor.
              </p>
            </section>

            <section>
              <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>A grande mudança: times menores</h2>
              <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
                A principal transformação não é apenas a IA escrever código. A grande mudança é a redução
                do custo de transformar ideia em software. Uma squad que antes tinha 8 ou 10 pessoas pode
                virar algo mais próximo de 1 líder técnico forte, 2 ou 3 profissionais bons e IA como apoio
                para código, testes, documentação, revisão e análise.
              </p>
            </section>
          </div>
        </article>

        <section className={`${currentTheme.card} backdrop-blur-lg rounded-3xl border ${currentTheme.cardBorder} overflow-hidden mb-16`}>
          <div className="p-8 md:p-10">
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-3 transition-colors duration-1000`}>Previsão agressiva</h2>
            <p className={`${currentTheme.textMuted} mb-8 transition-colors duration-1000`}>
              Percentual impactado significa redução, transformação forte ou substituição parcial da função como ela existe hoje.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className={`border-b ${currentTheme.tableBorder}`}>
                    <th className={`${currentTheme.text} text-left py-4 pr-4 transition-colors duration-1000`}>Ano</th>
                    <th className={`${currentTheme.text} text-left py-4 pr-4 transition-colors duration-1000`}>Fase</th>
                    <th className={`${currentTheme.text} text-left py-4 pr-4 transition-colors duration-1000`}>Posição</th>
                    <th className={`${currentTheme.text} text-right py-4 transition-colors duration-1000`}>Impacto</th>
                  </tr>
                </thead>
                <tbody>
                  {impactRows.map(([year, phase, position, impact], index) => (
                    <tr key={`${year}-${position}-${index}`} className={`border-b ${currentTheme.tableBorder}`}>
                      <td className="py-4 pr-4 text-green-400 font-bold">{year}</td>
                      <td className={`${currentTheme.textMuted} py-4 pr-4 transition-colors duration-1000`}>{phase}</td>
                      <td className={`${currentTheme.textSecondary} py-4 pr-4 transition-colors duration-1000`}>{position}</td>
                      <td className="py-4 text-right">
                        <span className="inline-flex justify-end px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 font-semibold">
                          {impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-16">
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>Quem continua forte?</h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed mb-6 transition-colors duration-1000`}>
              Os profissionais menos ameaçados são aqueles que não vivem apenas de executar tarefa.
            </p>
            <div className="space-y-3">
              {['Tech leads fortes', 'Arquitetos de solução', 'Especialistas de domínio', 'Segurança, dados, SRE e plataforma'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className={`${currentTheme.textMuted} transition-colors duration-1000`}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>A nova régua</h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
              O valor principal do profissional de TI deixa de ser apenas saber codar. A nova régua passa
              a envolver entender o problema certo, desenhar solução, validar o que a IA gerou, conhecer
              o negócio, identificar riscos, revisar arquitetura e assumir responsabilidade pela entrega.
            </p>
          </div>
        </section>

        <section className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center shadow-2xl shadow-green-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conclusão</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-6">
            A IA não deve acabar com a tecnologia. Mas deve acabar com a ideia de que basta saber
            executar tarefas técnicas previsíveis para estar seguro no mercado.
          </p>
          <p className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto">
            Menos gente digitando código linha por linha. Mais gente decidindo, validando e assumindo responsabilidade.
          </p>
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
