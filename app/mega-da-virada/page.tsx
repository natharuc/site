'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { GiClover } from 'react-icons/gi';
import { FiUsers, FiLock, FiCheck } from 'react-icons/fi';
import { 
  NumberSelector, 
  Statistics, 
  GameGenerator, 
  BolaoSelector,
  AdminFloatingButton,
  GameChecker
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

  // Escutar mudanças em tempo real via SSE (Server-Sent Events)
  useEffect(() => {
    const url = currentBolao 
      ? `/api/mega-sena/stream?bolaoId=${currentBolao.id}` 
      : '/api/mega-sena/stream';
    
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'connected') {
          console.log('Conectado ao stream de atualizações em tempo real');
        } else if (data.type === 'insert' || data.type === 'update' || data.type === 'delete') {
          console.log('Atualização detectada:', data.type);
          // Recarregar votos quando houver mudança
          fetchVotes();
        }
      } catch (error) {
        console.error('Erro ao processar evento SSE:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Erro no EventSource:', error);
      eventSource.close();
    };

    // Cleanup ao desmontar ou mudar de bolão
    return () => {
      eventSource.close();
    };
  }, [currentBolao, fetchVotes]);

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
    
    // Bloquear envio se o bolão estiver travado
    if (currentBolao?.locked) {
      toast.error('Este bolão está travado! Não é possível votar.');
      return;
    }
    
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
      console.log('Enviando voto:', { method, name: name.trim(), numbers: selectedNumbers, bolaoId: currentBolao?.id });
      
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

      console.log('Resposta recebida:', response.status, response.statusText);

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

        {/* Banner de Bolão Travado */}
        {currentBolao?.locked && (
          <div className="bg-red-500 border-2 border-red-700 text-white px-6 py-4 rounded-xl mb-8 shadow-xl">
            <div className="flex items-center gap-3">
              <FiLock className="text-white" size={40} />
              <div>
                <h3 className="text-xl font-bold mb-1">Bolão Travado</h3>
                <p className="text-red-100">
                  {currentBolao.betPlaced 
                    ? 'A aposta já foi efetuada! Não é possível fazer alterações.'
                    : 'Este bolão foi travado pelo administrador. Não é possível votar ou gerar novos jogos.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visualização Simplificada - Aposta Efetuada */}
        {currentBolao?.betPlaced ? (
          <div className="space-y-8">
            {/* Lista de Participantes */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <FiUsers size={32} />
                Participantes do Bolão ({votes.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {votes.map((vote, index) => (
                  <div 
                    key={vote.id} 
                    className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg">{vote.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(vote.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {votes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum participante ainda</p>
                </div>
              )}
            </div>

            {/* Jogos Selecionados */}
            <GameGenerator 
              votes={votes} 
              isLocked={true}
              showOnlySelected={true}
              currentBolao={currentBolao}
              onBolaoUpdate={() => setBolaoRefreshTrigger(prev => prev + 1)}
            />

            {/* Conferir Resultados */}
            {currentBolao?.selectedGames && currentBolao.selectedGames.length > 0 && (
              <GameChecker selectedGames={currentBolao.selectedGames} bolao={currentBolao} votes={votes} />
            )}
          </div>
        ) : (
          // Visualização Normal
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulário de votação */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-green-800 mb-6">
                  {isEditing ? 'Editar Meus Números' : 'Escolha seus Números'}
                </h2>
                
                {currentBolao?.locked && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                    <p className="text-red-800 font-bold text-center">
                      🔒 Votação bloqueada - Bolão travado pelo administrador
                    </p>
                  </div>
                )}
                
                {isEditing && !currentBolao?.locked && (
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
                      disabled={loading || isEditing || currentBolao?.locked}
                      autoComplete="off"
                    />
                  </div>

                  <NumberSelector
                    selectedNumbers={selectedNumbers}
                    onNumbersChange={setSelectedNumbers}
                    disabled={loading || currentBolao?.locked}
                  />

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={loading || selectedNumbers.length !== 6 || !name.trim() || currentBolao?.locked}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                      {loading ? 'Enviando...' : isEditing ? 'Atualizar Números' : 'Confirmar Números'}
                    </button>
                    
                    {isEditing && !currentBolao?.locked && (
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
                    <div className="bg-green-100 border-2 border-green-500 text-green-800 px-4 py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                      <FiCheck size={18} />
                      Números enviados com sucesso!
                    </div>
                  )}
                </form>
              </div>

              {/* Estatísticas */}
              <Statistics votes={votes} />
            </div>

            {/* Gerador de Jogos */}
            <GameGenerator 
              votes={votes} 
              isLocked={currentBolao?.locked || false}
              showOnlySelected={currentBolao?.locked || false}
              currentBolao={currentBolao}
              onBolaoUpdate={() => setBolaoRefreshTrigger(prev => prev + 1)}
            />

            {/* Conferir Resultados */}
            {currentBolao?.selectedGames && currentBolao.selectedGames.length > 0 && (
              <GameChecker selectedGames={currentBolao.selectedGames} bolao={currentBolao} votes={votes} />
            )}

          </>
        )}
        </div>
      </div>

      {/* Floating Admin Button */}
      <AdminFloatingButton 
        bolao={currentBolao}
        votes={votes}
        onUpdate={() => {
          setBolaoRefreshTrigger(prev => prev + 1);
          fetchVotes();
        }}
        onVoteDeleted={fetchVotes}
      />
    </>
  );
}
