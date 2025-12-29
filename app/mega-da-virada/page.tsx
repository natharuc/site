'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { GiClover } from 'react-icons/gi';
import { 
  NumberSelector, 
  Statistics, 
  GameGenerator, 
  AdminPanel,
  BolaoSelector 
} from './components';
import { Vote, Bolao } from './types';

export default function MegaDaVirada() {
  const [name, setName] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentBolao, setCurrentBolao] = useState<Bolao | null>(null);
  const [urlParams, setUrlParams] = useState<{name?: string, password?: string}>({});
  const [bolaoRefreshTrigger, setBolaoRefreshTrigger] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState({
    votes: false,
    bolao: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [existingVote, setExistingVote] = useState<Vote | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('bolao');
      const password = params.get('senha');
      if (name && password) {
        setUrlParams({ name, password });
      }
    }
  }, []);

  const fetchVotes = useCallback(async () => {
    try {
      const url = currentBolao 
        ? `/api/mega-sena?bolaoId=${currentBolao.id}` 
        : '/api/mega-sena';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setVotes(data.votes || []);
        setDataLoaded(prev => ({ ...prev, votes: true }));
        
        // Verificar se o usuário já votou
        const savedName = localStorage.getItem('megasena_user_name');
        if (savedName) {
          const userVote = data.votes.find((vote: Vote) => 
            vote.name.toLowerCase() === savedName.toLowerCase() &&
            (!currentBolao || vote.bolaoId === currentBolao.id)
          );
          
          if (userVote) {
            setName(savedName);
            setSelectedNumbers(userVote.numbers);
            setExistingVote(userVote);
            setIsEditing(true);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar votos:', error);
      setDataLoaded(prev => ({ ...prev, votes: true }));
    }
  }, [currentBolao]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  // Atualizar título da página
  useEffect(() => {
    if (currentBolao) {
      document.title = `${currentBolao.name} - Mega da Virada`;
    } else {
      document.title = 'Mega da Virada';
    }
  }, [currentBolao]);

  // Aguardar carregamento de bolão
  useEffect(() => {
    // Se não tem parâmetros de URL, marca bolão como carregado
    if (!urlParams.name && !urlParams.password) {
      const timer = setTimeout(() => {
        setDataLoaded(prev => ({ ...prev, bolao: true }));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [urlParams]);

  // Controlar loading inicial
  useEffect(() => {
    if (dataLoaded.votes && dataLoaded.bolao) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [dataLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Por favor, insira seu nome');
      return;
    }

    if (selectedNumbers.length !== 6) {
      toast.error('Por favor, selecione exatamente 6 números');
      return;
    }

    setLoading(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/mega-sena', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          numbers: selectedNumbers,
          ...(currentBolao && { bolaoId: currentBolao.id }),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Salvar nome no localStorage
        localStorage.setItem('megasena_user_name', name.trim());
        
        // Limpar campos apenas se não estiver editando
        if (!isEditing) {
          setName('');
          setSelectedNumbers([]);
        }
        
        await fetchVotes();
        // Refresh bolao para atualizar contador de participantes (apenas para novos votos)
        if (currentBolao && !isEditing) {
          setBolaoRefreshTrigger(prev => prev + 1);
        }
        
        toast.success(isEditing ? 'Números atualizados com sucesso!' : 'Números enviados com sucesso!');
        
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao enviar voto');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.error('Erro ao enviar voto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors expand={true} />
      
      {/* Loading Screen */}
      {initialLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-green-700 to-yellow-600 z-50 flex items-center justify-center">
          <div className="text-center">
            <GiClover className="text-yellow-400 animate-spin mx-auto mb-4" size={80} />
            <h2 className="text-3xl font-bold text-white mb-2">Mega Sena da Virada</h2>
            <p className="text-green-100 text-lg">Carregando...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-yellow-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GiClover className="text-yellow-400" size={48} />
            <h1 className="text-5xl font-bold text-white">
              Mega Sena da Virada 2025
            </h1>
            <GiClover className="text-yellow-400" size={48} />
          </div>
          <p className="text-xl text-green-100">
            Escolha seus 6 números da sorte!
          </p>
        </div>

        {/* Seletor de Bolão */}
        <BolaoSelector 
          onBolaoSelected={setCurrentBolao} 
          urlParams={urlParams}
          refreshTrigger={bolaoRefreshTrigger}
          onLoadingComplete={() => setDataLoaded(prev => ({ ...prev, bolao: true }))}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de votação */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              {isEditing ? 'Editar Meus Números' : 'Escolha seus Números'}
            </h2>
            
            {isEditing && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Você já votou! Pode alterar seus números a qualquer momento.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Digite seu nome"
                  disabled={loading || isEditing}
                  autoComplete="off"
                />
              </div>

              <NumberSelector
                selectedNumbers={selectedNumbers}
                onNumbersChange={setSelectedNumbers}
                disabled={loading}
              />

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading || selectedNumbers.length !== 6 || !name.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {loading ? 'Enviando...' : isEditing ? 'Atualizar Números' : 'Confirmar Números'}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!existingVote) return;
                      
                      // Deletar voto do banco de dados
                      try {
                        const response = await fetch(`/api/mega-sena?id=${existingVote.id}`, {
                          method: 'DELETE',
                        });
                        
                        if (response.ok) {
                          localStorage.removeItem('megasena_user_name');
                          setName('');
                          setSelectedNumbers([]);
                          setIsEditing(false);
                          setExistingVote(null);
                          await fetchVotes();
                          
                          // Atualizar contador de participantes do bolão
                          if (currentBolao) {
                            setBolaoRefreshTrigger(prev => prev + 1);
                          }
                          
                          toast.success('Voto removido! Você pode fazer um novo voto agora');
                        } else {
                          toast.error('Erro ao remover voto');
                        }
                      } catch (error) {
                        console.error('Erro ao deletar voto:', error);
                        toast.error('Erro ao remover voto');
                      }
                    }}
                    className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Fazer Novo Voto (Limpar)
                  </button>
                )}
              </div>

              {submitted && (
                <div className="bg-green-100 border-2 border-green-500 text-green-800 px-4 py-3 rounded-lg text-center font-medium">
                  ✓ Números enviados com sucesso!
                </div>
              )}
            </form>
          </div>

          {/* Estatísticas */}
          <Statistics votes={votes} />
        </div>

        {/* Gerador de Jogos */}
        <GameGenerator votes={votes} />
      </div>

        {/* Painel de Administração */}
        <AdminPanel 
          votes={votes} 
          onVoteDeleted={fetchVotes}
          adminPassword={currentBolao?.adminPassword}
        />
      </div>
    </>
  );
}
