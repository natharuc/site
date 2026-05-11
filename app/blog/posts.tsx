import { HiCode, HiDocumentText, HiLightningBolt, HiShieldCheck, HiSparkles } from 'react-icons/hi';

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category: string;
  tags: string[];
  icon: typeof HiCode;
  body: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'desenvolvimento-com-ia',
    title: 'Desenvolver com IA é amolar o machado',
    summary:
      'Antes de pedir para um Agent executar, o humano precisa saber onde quer chegar, transformar isso em regras claras e definir como validar a entrega.',
    publishedAt: '11/05/2026',
    category: 'IA e Desenvolvimento',
    tags: ['Intent-Driven', 'SDD', 'AI-DLC', 'Agent-Driven'],
    icon: HiSparkles,
    body: (
      <>
        <section>
          <h2>A mudança principal</h2>
          <p>
            No desenvolvimento tradicional, o dev pensa no sistema, escreve o código, testa e entrega.
            Com IA, o fluxo muda: primeiro vem a intenção, depois a especificação, depois o plano do Agent,
            depois a execução, os testes, a revisão humana e a entrega.
          </p>
        </section>

        <section className="featured-quote">
          <p>
            Desenvolver com IA é primeiro saber onde eu quero chegar, depois transformar essa intenção em regras claras,
            e só então pedir para o Agent executar com limites, validações e revisão humana.
          </p>
        </section>

        <section>
          <h2>Intent-Driven</h2>
          <p>
            É começar pelo resultado esperado no negócio. Não é pedir código solto. É dizer qual comportamento
            o sistema precisa ter no final.
          </p>
          <blockquote>Quando o pedido ficar pronto, o cliente deve ser avisado no WhatsApp.</blockquote>
        </section>

        <section>
          <h2>SDD</h2>
          <p>
            Specification-Driven Development é transformar a intenção em regras claras, com critérios,
            exceções, limites e validações antes da execução.
          </p>
          <blockquote>Só enviar se houver telefone. Se falhar, tentar 3 vezes. Não alterar o fluxo da cozinha.</blockquote>
        </section>

        <section>
          <h2>AI-DLC</h2>
          <p>
            É usar IA no ciclo inteiro de desenvolvimento: ler documentação, entender contexto, desenhar solução,
            executar, testar, revisar e documentar.
          </p>
          <blockquote>Ideia → especificação → plano → código → teste → revisão humana → deploy.</blockquote>
        </section>

        <section>
          <h2>Agent-Driven</h2>
          <p>
            O Agent executa tarefas, mexe em arquivos e pode rodar testes. Mas ele precisa trabalhar dentro de uma cerca:
            objetivo claro, regras de negócio, limites técnicos e critérios de validação.
          </p>
        </section>

        <section>
          <h2>Pedido fraco vs pedido forte</h2>
          <p>
            Um pedido fraco obriga o Agent a inventar contexto. Um pedido forte reduz suposição e aumenta a chance de
            uma entrega assertiva.
          </p>
          <blockquote>Fraco: Preciso que você envie uma mensagem no WhatsApp via API.</blockquote>
          <blockquote>
            Forte: Crie um formulário simples para envio de mensagens no WhatsApp usando a API oficial da Meta,
            com todos os campos necessários e validações obrigatórias para o funcionamento correto do sistema.
          </blockquote>
        </section>

        <section>
          <h2>Template mental para tarefas com Agent</h2>
          <ul>
            <li>Contexto: onde ele está mexendo e por que aquilo existe.</li>
            <li>Intenção: qual resultado final precisa ser alcançado.</li>
            <li>Regras de negócio: o que precisa acontecer e o que não pode acontecer.</li>
            <li>Limites técnicos: onde ele pode mexer e onde não deve mexer.</li>
            <li>Critérios de aceite: como saber que a entrega ficou correta.</li>
            <li>Validação: quais testes ou provas precisam existir.</li>
            <li>Entrega esperada: o que ele deve devolver no final.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    slug: 'ia-futuro-ti',
    title: 'IA e o futuro da TI',
    summary:
      'Menos executores, mais orquestradores. Uma previsão direta sobre como a inteligência artificial pode impactar devs, QAs, suporte e times de tecnologia.',
    publishedAt: '24/04/2026',
    category: 'Mercado',
    tags: ['IA', 'Mercado', 'Carreira', 'Tecnologia'],
    icon: HiCode,
    body: (
      <>
        <section>
          <h2>O que realmente está ameaçado?</h2>
          <p>
            As posições mais ameaçadas não são todas as posições de tecnologia, mas aquelas baseadas em tarefas repetitivas,
            previsíveis e com pouca tomada de decisão.
          </p>
        </section>

        <section>
          <h2>O júnior será o mais pressionado</h2>
          <p>
            Antes, tarefas pequenas eram o caminho natural de entrada no mercado: criar uma tela, ajustar um endpoint,
            corrigir um bug simples ou escrever um teste básico. Agora, essas tarefas são justamente as que a IA consegue
            executar melhor.
          </p>
        </section>

        <section>
          <h2>A grande mudança: times menores</h2>
          <p>
            A principal transformação não é apenas a IA escrever código. A grande mudança é a redução do custo de transformar
            ideia em software. Uma squad que antes tinha 8 ou 10 pessoas pode virar algo mais próximo de 1 líder técnico forte,
            2 ou 3 profissionais bons e IA como apoio para código, testes, documentação, revisão e análise.
          </p>
        </section>

        <section>
          <h2>Quem continua forte?</h2>
          <p>
            Os profissionais menos ameaçados são aqueles que não vivem apenas de executar tarefa: tech leads fortes,
            arquitetos de solução, especialistas de domínio, segurança, dados, SRE e plataforma.
          </p>
        </section>

        <section className="featured-quote">
          <p>
            Menos gente digitando código linha por linha. Mais gente decidindo, validando e assumindo responsabilidade.
          </p>
        </section>
      </>
    ),
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getLatestPosts(limit?: number) {
  return typeof limit === 'number' ? blogPosts.slice(0, limit) : blogPosts;
}
