'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  HiArrowLeft,
  HiCheckCircle,
  HiCode,
  HiDocumentText,
  HiLightningBolt,
  HiOutlineClipboardCheck,
  HiSparkles,
} from 'react-icons/hi';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

const concepts = [
  {
    title: 'Intent-Driven',
    subtitle: 'Primeiro, eu digo onde quero chegar.',
    text: 'A intenção mostra o resultado esperado no negócio. Não começa pelo código; começa pelo comportamento que o sistema precisa ter.',
    example: 'Quando o pedido ficar pronto, o cliente deve ser avisado no WhatsApp.',
    icon: HiSparkles,
  },
  {
    title: 'SDD',
    subtitle: 'Depois, eu transformo intenção em regras claras.',
    text: 'Specification-Driven Development é escrever as regras antes da execução, como critérios, exceções, limites e validações.',
    example: 'Só enviar se houver telefone. Se falhar, tentar 3 vezes. Não alterar o fluxo da cozinha.',
    icon: HiDocumentText,
  },
  {
    title: 'AI-DLC',
    subtitle: 'A IA entra no ciclo inteiro, não só no código.',
    text: 'A IA ajuda a ler documentação, entender contexto, desenhar solução, executar, testar, revisar e documentar a entrega.',
    example: 'Ideia → especificação → plano → código → teste → revisão humana → deploy.',
    icon: HiLightningBolt,
  },
  {
    title: 'Agent-Driven',
    subtitle: 'O Agent executa, mas dentro de limites.',
    text: 'O Agent consegue mexer em arquivos, rodar comandos e testar, mas precisa de objetivo, regras, limites e validações bem definidos.',
    example: 'Execute a feature sem mudar tabelas existentes e me mostre os arquivos alterados.',
    icon: HiOutlineClipboardCheck,
  },
];

const taskStructure = [
  'Contexto: onde o Agent está mexendo e por que aquilo existe.',
  'Intenção: qual resultado final precisa ser alcançado.',
  'Regras de negócio: o que precisa acontecer e o que não pode acontecer.',
  'Limites técnicos: onde ele pode mexer e onde não deve mexer.',
  'Critérios de aceite: como saber que a entrega ficou correta.',
  'Validação: quais testes ou provas precisam existir.',
  'Entrega esperada: o que o Agent deve devolver no final.',
];

export default function DesenvolvimentoComIa() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.title = 'Desenvolver com IA - Nathan Arruda';
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 ${currentTheme.textMuted} hover:text-green-400 transition-colors mb-10`}
        >
          <HiArrowLeft />
          Voltar para home
        </Link>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center mb-16">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-sm font-semibold mb-6">
              <HiSparkles />
              IA • Agentes • Desenvolvimento
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold ${currentTheme.text} leading-tight mb-6 transition-colors duration-1000`}>
              Desenvolver com IA é{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                amolar o machado
              </span>
            </h1>

            <p className={`${currentTheme.textSecondary} text-xl leading-relaxed mb-8 transition-colors duration-1000`}>
              Antes de pedir para um Agent sair executando, o humano precisa saber onde quer chegar,
              transformar isso em regras claras e definir como validar a entrega.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-400/20">
                Intent-Driven • SDD • AI-DLC • Agent-Driven
              </span>
              <span className={`px-4 py-2 rounded-full ${currentTheme.card} ${currentTheme.textMuted} border ${currentTheme.cardBorder}`}>
                Publicado em 11/05/2026
              </span>
            </div>
          </div>

          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder} relative overflow-hidden`}>
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <HiCode className="text-green-400 mb-6" size={52} />
              <p className={`${currentTheme.text} text-2xl font-bold mb-4 transition-colors duration-1000`}>
                A IA não substitui a clareza do humano.
              </p>
              <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                Quanto melhor você escreve a intenção, as regras e os limites, menos o Agent precisa inventar.
              </p>
            </div>
          </div>
        </section>

        <article className={`${currentTheme.card} backdrop-blur-lg rounded-3xl border ${currentTheme.cardBorder} overflow-hidden mb-16`}>
          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>A mudança principal</h2>
              <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
                No desenvolvimento tradicional, o dev pensa no sistema, escreve o código, testa e entrega.
                Com IA, o fluxo muda: primeiro vem a intenção, depois a especificação, depois o plano do Agent,
                depois a execução, os testes, a revisão humana e a entrega.
              </p>
            </section>

            <section className={`${currentTheme.cardStrong} rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
              <p className="text-green-400 font-semibold mb-3">A frase que resume tudo</p>
              <p className={`${currentTheme.text} text-2xl md:text-3xl font-bold leading-relaxed transition-colors duration-1000`}>
                Desenvolver com IA é primeiro saber onde eu quero chegar, depois transformar essa intenção em regras claras,
                e só então pedir para o Agent executar com limites, validações e revisão humana.
              </p>
            </section>
          </div>
        </article>

        <section className="grid md:grid-cols-2 gap-6 mb-16">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <concept.icon className="text-white" size={28} />
              </div>
              <h2 className={`${currentTheme.text} text-2xl font-bold mb-2 transition-colors duration-1000`}>{concept.title}</h2>
              <p className="text-green-400 font-semibold mb-4">{concept.subtitle}</p>
              <p className={`${currentTheme.textMuted} leading-relaxed mb-5 transition-colors duration-1000`}>{concept.text}</p>
              <div className={`${currentTheme.cardStrong} rounded-2xl p-5 border ${currentTheme.cardBorder}`}>
                <p className={`${currentTheme.textSecondary} text-sm leading-relaxed transition-colors duration-1000`}>
                  {concept.example}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className={`${currentTheme.card} backdrop-blur-lg rounded-3xl border ${currentTheme.cardBorder} overflow-hidden mb-16`}>
          <div className="p-8 md:p-12">
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>Por que o Agent precisa de uma boa tarefa?</h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed mb-8 transition-colors duration-1000`}>
              Uma tarefa vaga obriga o Agent a criar contexto que não foi passado. Se você diz apenas
              “envie mensagem no WhatsApp via API”, ele precisa adivinhar qual API, qual telefone, qual fluxo,
              qual mensagem, quais validações, se tem retry, se tem log e como testar.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className={`${currentTheme.cardStrong} rounded-3xl p-6 border ${currentTheme.cardBorder}`}>
                <p className="text-red-400 font-bold mb-3">Pedido fraco</p>
                <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                  Preciso que você envie uma mensagem no WhatsApp via API.
                </p>
              </div>

              <div className={`${currentTheme.cardStrong} rounded-3xl p-6 border ${currentTheme.cardBorder}`}>
                <p className="text-green-400 font-bold mb-3">Pedido forte</p>
                <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                  Crie um formulário simples para envio de mensagens no WhatsApp usando a API oficial da Meta,
                  com todos os campos necessários e validações obrigatórias para o funcionamento correto do sistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mb-16">
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
            <h2 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>Template mental</h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed transition-colors duration-1000`}>
              Uma tarefa bem escrita para um Agent não precisa ser enorme. Mas precisa deixar claro o suficiente
              para ele não resolver o problema certo do jeito errado.
            </p>
          </div>

          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder}`}>
            <div className="space-y-4">
              {taskStructure.map((item) => (
                <div key={item} className="flex gap-3">
                  <HiCheckCircle className="text-green-400 flex-shrink-0 mt-1" size={22} />
                  <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center shadow-2xl shadow-green-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conclusão</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-6">
            O futuro do desenvolvimento com IA não é pedir código solto. É transformar intenção em especificação,
            especificação em plano, plano em execução, execução em teste e teste em entrega validada.
          </p>
          <p className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto">
            Primeiro eu defino a intenção. Depois eu escrevo as regras. Só então eu deixo o Agent executar.
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
