'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FiDownload, FiTrash2, FiLock, FiX, FiSettings } from 'react-icons/fi';
import { Vote } from '../types';

interface AdminPanelProps {
  votes: Vote[];
  onVoteDeleted: () => void;
  adminPassword?: string;
}

export default function AdminPanel({ votes, onVoteDeleted, adminPassword }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Senha padrão apenas se não houver bolão
  const ADMIN_PASSWORD = adminPassword || 'megasena2025';

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success('Autenticado com sucesso!');
    } else {
      toast.error('Senha incorreta!');
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const response = await fetch(`/api/mega-sena?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Voto deletado com sucesso!');
        onVoteDeleted();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao deletar voto');
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar voto');
    } finally {
      setDeleting(null);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(votes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `megasena-votos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success('Dados exportados com sucesso!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
      >
        <FiSettings size={16} />
        Admin
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Painel de Administração
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setAuthenticated(false);
                setPassword('');
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <FiX size={28} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!authenticated ? (
            <form onSubmit={handleAuth} className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha de Administrador
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  placeholder="Digite a senha"
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiLock size={18} />
                Entrar
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={exportData}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiDownload size={18} />
                  Exportar Dados (JSON)
                </button>
                <button
                  onClick={() => {
                    setAuthenticated(false);
                    setPassword('');
                    toast.info('Logout realizado');
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Sair
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total de Votos</p>
                  <p className="text-2xl font-bold text-gray-800">{votes.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Números</p>
                  <p className="text-2xl font-bold text-gray-800">{votes.length * 6}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Números Únicos</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {new Set(votes.flatMap(v => v.numbers)).size}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Gerenciar Votos ({votes.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {votes.map((vote) => (
                    <div
                      key={vote.id}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">{vote.name}</p>
                          <div className="flex flex-wrap gap-2 my-2">
                            {vote.numbers.map((num) => (
                              <span
                                key={num}
                                className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                              >
                                {num.toString().padStart(2, '0')}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(vote.createdAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <button
                          onClick={() => vote.id && handleDelete(vote.id)}
                          disabled={deleting === vote.id}
                          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-sm font-medium flex items-center gap-2"
                        >
                          <FiTrash2 size={14} />
                          {deleting === vote.id ? 'Deletando...' : 'Deletar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
