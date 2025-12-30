'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FiLock, FiUnlock, FiCheckCircle, FiShield } from 'react-icons/fi';
import { Bolao } from '../types';

interface BolaoAdminPanelProps {
  bolao: Bolao;
  onUpdate: () => void;
}

export default function BolaoAdminPanel({ bolao, onUpdate }: BolaoAdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium shadow-lg"
      >
        <FiShield size={16} />
        Admin do Bolão
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-800">
              Administração do Bolão
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setAuthenticated(false);
                setAdminPassword('');
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {!authenticated ? (
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
          ) : (
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
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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

              <button
                onClick={() => {
                  setAuthenticated(false);
                  setAdminPassword('');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
