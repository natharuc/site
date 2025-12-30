'use client';

import { useState } from 'react';
import { FiShield, FiX, FiLock, FiUnlock, FiCheckCircle, FiTrash2, FiDownload } from 'react-icons/fi';
import { toast } from 'sonner';
import { Bolao, Vote } from '../types';

interface AdminFloatingButtonProps {
  bolao: Bolao | null;
  votes: Vote[];
  onUpdate: () => void;
  onVoteDeleted: () => void;
}

export default function AdminFloatingButton({ bolao, votes, onUpdate, onVoteDeleted }: AdminFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'bolao' | 'votos' | 'participantes'>('bolao');
  const [loading, setLoading] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');

  if (!bolao?.adminPassword) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === bolao.adminPassword) {
      setAuthenticated(true);
      toast.success('Autenticado como administrador!');
    } else {
      toast.error('Senha de administração incorreta!');
    }
  };

  const updateBolaoStatus = async (updates: { locked?: boolean; betPlaced?: boolean }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/bolao/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bolaoId: bolao.id,
          adminPassword: bolao.adminPassword,
          ...updates
        }),
      });

      if (response.ok) {
        onUpdate();
        
        if (updates.locked !== undefined) {
          toast.success(updates.locked ? 'Bolão travado com sucesso!' : 'Bolão destravado!');
        }
        if (updates.betPlaced !== undefined) {
          toast.success(updates.betPlaced ? 'Aposta marcada como efetuada!' : 'Aposta desmarcada');
        }
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao atualizar bolão');
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      toast.error('Erro ao atualizar bolão');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVote = async (voteId: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este voto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/mega-sena?id=${voteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Voto deletado com sucesso!');
        onVoteDeleted();
      } else {
        toast.error('Erro ao deletar voto');
      }
    } catch (error) {
      console.error('Erro ao deletar voto:', error);
      toast.error('Erro ao deletar voto');
    }
  };

  const handleClearAllVotes = async () => {
    if (!window.confirm(`Tem certeza que deseja deletar TODOS os ${votes.length} votos? Esta ação não pode ser desfeita!`)) {
      return;
    }

    try {
      for (const vote of votes) {
        await fetch(`/api/mega-sena?id=${vote.id}`, {
          method: 'DELETE',
        });
      }
      toast.success('Todos os votos foram deletados!');
      onVoteDeleted();
    } catch (error) {
      console.error('Erro ao deletar votos:', error);
      toast.error('Erro ao deletar votos');
    }
  };

  const handleExportData = () => {
    const data = {
      bolao: bolao,
      votes: votes,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mega-sena-${bolao.name}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Dados exportados com sucesso!');
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newParticipantName.trim()) {
      toast.error('Digite o nome do participante');
      return;
    }

    // Verificar se já existe
    const exists = votes.some(vote => 
      vote.name.toLowerCase() === newParticipantName.trim().toLowerCase()
    );

    if (exists) {
      toast.error('Este participante já está cadastrado!');
      return;
    }

    try {
      const response = await fetch('/api/mega-sena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newParticipantName.trim(),
          numbers: [1, 2, 3, 4, 5, 6], // Números padrão temporários
          bolaoId: bolao.id,
        }),
      });

      if (response.ok) {
        toast.success(`${newParticipantName} adicionado com sucesso!`);
        setNewParticipantName('');
        onVoteDeleted(); // Recarregar lista
        onUpdate(); // Atualizar contador
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao adicionar participante');
      }
    } catch (error) {
      console.error('Erro ao adicionar participante:', error);
      toast.error('Erro ao adicionar participante');
    }
  };

  const handleRemoveParticipant = async (voteId: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja remover ${name} do bolão?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/mega-sena?id=${voteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`${name} removido do bolão!`);
        onVoteDeleted();
        onUpdate();
      } else {
        toast.error('Erro ao remover participante');
      }
    } catch (error) {
      console.error('Erro ao remover participante:', error);
      toast.error('Erro ao remover participante');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center group"
        title="Painel Administrativo"
      >
        <FiShield size={28} />
        <span className="absolute left-full ml-3 bg-purple-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Admin
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiShield size={28} />
                  Painel Administrativo
                </h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setAuthenticated(false);
                    setAdminPassword('');
                  }}
                  className="text-white hover:bg-purple-800 p-2 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!authenticated ? (
                <div className="p-6">
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Senha de Administração
                      </label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        placeholder="Digite a senha de admin"
                        autoFocus
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiShield size={18} />
                      Autenticar
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('bolao')}
                      className={`flex-1 px-6 py-4 font-bold transition-colors ${
                        activeTab === 'bolao'
                          ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Controle do Bolão
                    </button>
                    <button
                      onClick={() => setActiveTab('participantes')}
                      className={`flex-1 px-6 py-4 font-bold transition-colors ${
                        activeTab === 'participantes'
                          ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Participantes
                    </button>
                    <button
                      onClick={() => setActiveTab('votos')}
                      className={`flex-1 px-6 py-4 font-bold transition-colors ${
                        activeTab === 'votos'
                          ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Gerenciar Votos
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'bolao' && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-sm text-purple-800 font-medium">
                            Bolão: <span className="font-bold">{bolao.name}</span>
                          </p>
                          <p className="text-sm text-purple-800 mt-1">
                            Participantes: <span className="font-bold">{bolao.participants || 0}</span>
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                              <p className="font-bold text-gray-800">Status do Bolão</p>
                              <p className="text-sm text-gray-600">
                                {bolao.locked ? 'Travado - Ninguém pode votar' : 'Aberto - Aceitando votos'}
                              </p>
                            </div>
                            <button
                              onClick={() => updateBolaoStatus({ locked: !bolao.locked })}
                              disabled={loading}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
                                bolao.locked
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-red-600 hover:bg-red-700 text-white'
                              } disabled:opacity-50`}
                            >
                              {bolao.locked ? <FiUnlock size={16} /> : <FiLock size={16} />}
                              {bolao.locked ? 'Destravar' : 'Travar'}
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                              <p className="font-bold text-gray-800">Aposta Efetuada</p>
                              <p className="text-sm text-gray-600">
                                {bolao.betPlaced ? 'Jogos já foram apostados' : 'Ainda não foi apostado'}
                              </p>
                            </div>
                            <button
                              onClick={() => updateBolaoStatus({ betPlaced: !bolao.betPlaced })}
                              disabled={loading}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
                                bolao.betPlaced
                                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              } disabled:opacity-50`}
                            >
                              <FiCheckCircle size={16} />
                              {bolao.betPlaced ? 'Desmarcar' : 'Marcar como Efetuado'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'participantes' && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <strong>Total de participantes:</strong> {votes.length}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Adicione participantes ao bolão ou remova os existentes
                          </p>
                        </div>

                        {/* Formulário Adicionar Participante */}
                        <form onSubmit={handleAddParticipant} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h4 className="font-bold text-gray-800 mb-3">Adicionar Participante</h4>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newParticipantName}
                              onChange={(e) => setNewParticipantName(e.target.value)}
                              placeholder="Nome do participante"
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                              autoComplete="off"
                            />
                            <button
                              type="submit"
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Adicionar
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            O participante será adicionado com números padrão (pode editar depois)
                          </p>
                        </form>

                        {/* Lista de Participantes */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Lista de Participantes</h4>
                          <div className="max-h-80 overflow-y-auto space-y-2">
                            {votes.length === 0 ? (
                              <div className="text-center py-8 text-gray-500">
                                <p>Nenhum participante ainda</p>
                              </div>
                            ) : (
                              votes.map((vote, index) => (
                                <div
                                  key={vote.id}
                                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-800">{vote.name}</p>
                                      <p className="text-xs text-gray-500">
                                        Números: {vote.numbers.join(', ')}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => vote.id && handleRemoveParticipant(vote.id, vote.name)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remover participante"
                                  >
                                    <FiTrash2 size={18} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'votos' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-800">
                            Total de votos: {votes.length}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={handleExportData}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <FiDownload size={16} />
                              Exportar
                            </button>
                            {votes.length > 0 && (
                              <button
                                onClick={handleClearAllVotes}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                              >
                                <FiTrash2 size={16} />
                                Limpar Todos
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-2">
                          {votes.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              <p>Nenhum voto registrado ainda</p>
                            </div>
                          ) : (
                            votes.map((vote) => (
                              <div
                                key={vote.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex-1">
                                  <p className="font-bold text-gray-800">{vote.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {vote.numbers.join(', ')}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(vote.createdAt).toLocaleString('pt-BR')}
                                  </p>
                                </div>
                                <button
                                  onClick={() => vote.id && handleDeleteVote(vote.id)}
                                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Deletar voto"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
