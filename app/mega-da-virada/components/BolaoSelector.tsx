'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FiUsers, FiPlus, FiLogIn, FiCircle, FiCopy, FiShare2, FiX } from 'react-icons/fi';
import { Bolao } from '../types';

interface BolaoSelectorProps {
  onBolaoSelected: (bolao: Bolao | null) => void;
  urlParams?: { name?: string; password?: string };
  refreshTrigger?: number;
  onLoadingComplete?: () => void;
}

export default function BolaoSelector({ onBolaoSelected, urlParams, refreshTrigger, onLoadingComplete }: BolaoSelectorProps) {
  const [mode, setMode] = useState<'none' | 'create' | 'join'>('none');
  const [bolaoName, setBolaoName] = useState('');
  const [bolaoPassword, setBolaoPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentBolao, setCurrentBolao] = useState<Bolao | null>(null);

  // Carregar bolão do localStorage ao montar o componente
  useEffect(() => {
    const savedBolao = localStorage.getItem('megasena_bolao');
    const savedPassword = localStorage.getItem('megasena_bolao_password');
    
    if (savedBolao && savedPassword && !currentBolao && !urlParams?.name) {
      try {
        const bolaoData = JSON.parse(savedBolao);
        setBolaoName(bolaoData.name);
        setBolaoPassword(savedPassword);
        setMode('join');
        setTimeout(() => {
          handleJoinBolaoFromUrl(bolaoData.name, savedPassword);
        }, 500);
      } catch (error) {
        console.error('Erro ao carregar bolão do localStorage:', error);
        localStorage.removeItem('megasena_bolao');
        localStorage.removeItem('megasena_bolao_password');
        onLoadingComplete?.();
      }
    } else if (!urlParams?.name) {
      // Não tem bolão salvo e nem parâmetros de URL
      onLoadingComplete?.();
    }
  }, [urlParams]);

  // Refresh bolao data when trigger changes
  useEffect(() => {
    if (currentBolao && refreshTrigger && refreshTrigger > 0) {
      refreshBolaoData();
    }
  }, [refreshTrigger]);

  const refreshBolaoData = async () => {
    if (!currentBolao) return;
    
    try {
      const response = await fetch(
        `/api/bolao?name=${encodeURIComponent(currentBolao.name)}&password=${encodeURIComponent(bolaoPassword)}`
      );

      const data = await response.json();

      if (response.ok) {
        setCurrentBolao(data.bolao);
        onBolaoSelected(data.bolao);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do bolão:', error);
    }
  };

  useEffect(() => {
    if (urlParams?.name && urlParams?.password && !currentBolao) {
      setBolaoName(urlParams.name);
      setBolaoPassword(urlParams.password);
      setMode('join');
      setTimeout(() => {
        handleJoinBolaoFromUrl(urlParams.name!, urlParams.password!);
      }, 500);
    }
  }, [urlParams]);

  const handleCreateBolao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bolaoName.trim() || !bolaoPassword.trim() || !adminPassword.trim() || !creatorName.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (bolaoPassword.length < 4) {
      toast.error('A senha deve ter no mínimo 4 caracteres');
      return;
    }

    if (adminPassword.length < 4) {
      toast.error('A senha de admin deve ter no mínimo 4 caracteres');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/bolao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bolaoName,
          password: bolaoPassword,
          adminPassword: adminPassword,
          createdBy: creatorName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentBolao(data.bolao);
        onBolaoSelected(data.bolao);
        
        // Salvar no localStorage
        localStorage.setItem('megasena_bolao', JSON.stringify(data.bolao));
        localStorage.setItem('megasena_bolao_password', bolaoPassword);
        
        toast.success(`Bolão "${data.bolao.name}" criado com sucesso!`);
      } else {
        toast.error(data.error || 'Erro ao criar bolão');
      }
    } catch (error) {
      console.error('Erro ao criar bolão:', error);
      toast.error('Erro ao criar bolão');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinBolaoFromUrl = async (name: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/bolao?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`
      );

      const data = await response.json();

      if (response.ok) {
        setCurrentBolao(data.bolao);
        onBolaoSelected(data.bolao);
        toast.success(`Você entrou no bolão "${data.bolao.name}"!`);
      } else {
        toast.error(data.error || 'Erro ao entrar no bolão');
        setMode('none');
      }
    } catch (error) {
      console.error('Erro ao entrar no bolão:', error);
      toast.error('Erro ao entrar no bolão');
      setMode('none');
    } finally {
      setLoading(false);
      onLoadingComplete?.();
    }
  };

  const handleJoinBolao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bolaoName.trim() || !bolaoPassword.trim()) {
      toast.error('Preencha o nome e senha do bolão');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/bolao?name=${encodeURIComponent(bolaoName)}&password=${encodeURIComponent(bolaoPassword)}`
      );

      const data = await response.json();

      if (response.ok) {
        setCurrentBolao(data.bolao);
        onBolaoSelected(data.bolao);
        
        // Salvar no localStorage
        localStorage.setItem('megasena_bolao', JSON.stringify(data.bolao));
        localStorage.setItem('megasena_bolao_password', bolaoPassword);
        
        toast.success(`Você entrou no bolão "${data.bolao.name}"!`);
      } else {
        toast.error(data.error || 'Erro ao entrar no bolão');
      }
    } catch (error) {
      console.error('Erro ao entrar no bolão:', error);
      toast.error('Erro ao entrar no bolão');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveBolao = () => {
    setCurrentBolao(null);
    onBolaoSelected(null);
    setMode('none');
    setBolaoName('');
    setBolaoPassword('');
    setCreatorName('');
    
    // Limpar do localStorage
    localStorage.removeItem('megasena_bolao');
    localStorage.removeItem('megasena_bolao_password');
    
    toast.info('Você saiu do bolão');
  };

  const copyShareLink = () => {
    if (!currentBolao) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set('bolao', currentBolao.name);
    url.searchParams.set('senha', bolaoPassword);
    
    navigator.clipboard.writeText(url.toString());
    toast.success('Link copiado! Compartilhe com seus amigos');
  };

  const handleIndividual = () => {
    setCurrentBolao(null);
    onBolaoSelected(null);
    setMode('none');
  };

  if (currentBolao) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FiUsers className="text-purple-800" size={20} />
              <h3 className="text-lg font-bold text-purple-800">
                Bolão: {currentBolao.name}
              </h3>
            </div>
            <p className="text-sm text-purple-700">
              Criado por: {currentBolao.createdBy}
            </p>
            <p className="text-sm text-purple-700">
              Participantes: {currentBolao.participants || 0}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyShareLink}
              className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              title="Copiar link para compartilhar"
            >
              <FiShare2 size={16} />
              Compartilhar
            </button>
            <button
              onClick={handleLeaveBolao}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              <FiX size={16} />
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'none') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Como deseja participar?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleIndividual}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            <FiCircle size={24} />
            Individual
          </button>
          <button
            onClick={() => setMode('create')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            <FiPlus size={24} />
            Criar Bolão
          </button>
          <button
            onClick={() => setMode('join')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <FiLogIn size={24} />
            Entrar em Bolão
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <FiPlus size={24} />
            Criar Novo Bolão
          </h3>
          <button
            onClick={() => setMode('none')}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleCreateBolao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              placeholder="Quem está criando o bolão?"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Bolão
            </label>
            <input
              type="text"
              value={bolaoName}
              onChange={(e) => setBolaoName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              placeholder="Ex: Bolão da Família Silva"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha do Bolão
            </label>
            <input
              type="password"
              value={bolaoPassword}
              onChange={(e) => setBolaoPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              placeholder="Mínimo 4 caracteres"
              disabled={loading}
              minLength={4}
              autoComplete="new-password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Compartilhe esta senha com quem você quer convidar
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha de Administração
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
              placeholder="Mínimo 4 caracteres"
              disabled={loading}
              minLength={4}
              autoComplete="new-password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use esta senha para acessar o painel de administração
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? 'Criando...' : 'Criar Bolão'}
          </button>
        </form>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <FiLogIn size={24} />
            Entrar em um Bolão
          </h3>
          <button
            onClick={() => setMode('none')}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleJoinBolao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Bolão
            </label>
            <input
              type="text"
              value={bolaoName}
              onChange={(e) => setBolaoName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Nome do bolão que você quer entrar"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha do Bolão
            </label>
            <input
              type="password"
              value={bolaoPassword}
              onChange={(e) => setBolaoPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Digite a senha do bolão"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? 'Entrando...' : 'Entrar no Bolão'}
          </button>
        </form>
      </div>
    );
  }

  return null;
}
