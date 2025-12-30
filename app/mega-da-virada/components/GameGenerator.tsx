'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { FiCopy, FiSettings, FiEyeOff, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Vote, GameConfig } from '../types';

interface GameGeneratorProps {
  votes: Vote[];
  isLocked?: boolean;
  showOnlySelected?: boolean;
}

export default function GameGenerator({ votes, isLocked = false, showOnlySelected = false }: GameGeneratorProps) {
  const [gameConfigs, setGameConfigs] = useState<GameConfig[]>([
    { size: 9, quantity: 1 },
    { size: 8, quantity: 2 },
    { size: 6, quantity: 2 },
  ]);

  const [showConfig, setShowConfig] = useState(false);
  const [games, setGames] = useState<number[][]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedGames, setSelectedGames] = useState<number[][]>([]);
  const [editingGame, setEditingGame] = useState<number | null>(null);
  const [editingNumbers, setEditingNumbers] = useState<number[]>([]);

  // Marcar que estamos no cliente e carregar jogos salvos
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('megasena_selected_games');
    if (saved) {
      try {
        setSelectedGames(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar jogos salvos:', error);
      }
    }
  }, []);

  // Calcular os números mais votados
  const getMostVotedNumbers = useMemo(() => {
    const frequency: { [key: number]: number } = {};
    
    votes.forEach(vote => {
      vote.numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });
    });

    return Object.entries(frequency)
      .map(([num, count]) => ({ number: parseInt(num), count }))
      .sort((a, b) => b.count - a.count);
  }, [votes]);

  // Gerar jogos apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    if (!isClient) return;

    const generateGames = () => {
      const result: number[][] = [];
      const usedNumbers = new Set<number>();

      // Função para embaralhar array (Fisher-Yates shuffle)
      const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      // Criar uma lista de números disponíveis embaralhada
      const availableNumbers = shuffleArray(getMostVotedNumbers.map(({ number }) => number));

      gameConfigs
        .sort((a, b) => b.size - a.size) // Começar pelos jogos maiores
        .forEach(config => {
          for (let i = 0; i < config.quantity; i++) {
            const game: number[] = [];
            
            // Pegar números mais votados que ainda não foram usados (já embaralhados)
            for (const number of availableNumbers) {
              if (!usedNumbers.has(number) && game.length < config.size) {
                game.push(number);
                usedNumbers.add(number);
              }
            }

            // Se não tiver números suficientes, preencher com números não votados (embaralhados)
            if (game.length < config.size) {
              const nonVotedNumbers = shuffleArray(
                Array.from({ length: 60 }, (_, i) => i + 1)
                  .filter(num => !usedNumbers.has(num))
              );
              
              for (const num of nonVotedNumbers) {
                if (game.length < config.size) {
                  game.push(num);
                  usedNumbers.add(num);
                } else {
                  break;
                }
              }
            }

            // NÃO ordenar - manter distribuição aleatória
            result.push(game);
          }
        });

      return result;
    };

    setGames(generateGames());
  }, [isClient, getMostVotedNumbers, gameConfigs]);

  const addConfig = () => {
    setGameConfigs([...gameConfigs, { size: 6, quantity: 1 }]);
  };

  const removeConfig = (index: number) => {
    setGameConfigs(gameConfigs.filter((_, i) => i !== index));
  };

  const updateConfig = (index: number, field: 'size' | 'quantity', value: number) => {
    const newConfigs = [...gameConfigs];
    newConfigs[index][field] = value;
    setGameConfigs(newConfigs);
  };

  const totalNumbers = gameConfigs.reduce((sum, config) => sum + (config.size * config.quantity), 0);

  const selectGame = (gameIndex: number) => {
    const game = games[gameIndex];
    const newSelected = [...selectedGames, game];
    setSelectedGames(newSelected);
    localStorage.setItem('megasena_selected_games', JSON.stringify(newSelected));
    toast.success(`Jogo ${gameIndex + 1} selecionado!`);
  };

  const removeSelectedGame = (index: number) => {
    const newSelected = selectedGames.filter((_, i) => i !== index);
    setSelectedGames(newSelected);
    localStorage.setItem('megasena_selected_games', JSON.stringify(newSelected));
    toast.info('Jogo removido');
  };

  const startEditing = (index: number) => {
    setEditingGame(index);
    setEditingNumbers([...selectedGames[index]]);
  };

  const toggleEditNumber = (num: number) => {
    if (editingNumbers.includes(num)) {
      setEditingNumbers(editingNumbers.filter(n => n !== num));
    } else {
      setEditingNumbers([...editingNumbers, num]);
    }
  };

  const saveEdit = () => {
    if (editingGame === null) return;
    
    const newSelected = [...selectedGames];
    newSelected[editingGame] = editingNumbers;
    setSelectedGames(newSelected);
    localStorage.setItem('megasena_selected_games', JSON.stringify(newSelected));
    setEditingGame(null);
    setEditingNumbers([]);
    toast.success('Jogo atualizado!');
  };

  const cancelEdit = () => {
    setEditingGame(null);
    setEditingNumbers([]);
  };

  const regenerateGames = () => {
    if (!isClient) return;
    
    const generateGames = () => {
      const result: number[][] = [];
      const usedNumbers = new Set<number>();

      const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const availableNumbers = shuffleArray(getMostVotedNumbers.map(({ number }) => number));

      gameConfigs
        .sort((a, b) => b.size - a.size)
        .forEach(config => {
          for (let i = 0; i < config.quantity; i++) {
            const game: number[] = [];
            
            for (const number of availableNumbers) {
              if (!usedNumbers.has(number) && game.length < config.size) {
                game.push(number);
                usedNumbers.add(number);
              }
            }

            if (game.length < config.size) {
              const nonVotedNumbers = shuffleArray(
                Array.from({ length: 60 }, (_, i) => i + 1)
                  .filter(num => !usedNumbers.has(num))
              );
              
              for (const num of nonVotedNumbers) {
                if (game.length < config.size) {
                  game.push(num);
                  usedNumbers.add(num);
                } else {
                  break;
                }
              }
            }

            result.push(game);
          }
        });

      return result;
    };

    setGames(generateGames());
    toast.info('Novos jogos gerados!');
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-800">
          {showOnlySelected ? 'Jogos do Bolão' : 'Gerador de Jogos'}
        </h2>
        {!isLocked && (
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            {showConfig ? <FiEyeOff size={16} /> : <FiSettings size={16} />}
            {showConfig ? 'Ocultar' : 'Configurar'} Jogos
          </button>
        )}
      </div>

      {/* Aviso quando está travado mas não tem jogos */}
      {showOnlySelected && selectedGames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-yellow-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhum jogo selecionado</h3>
          <p className="text-gray-600">
            O bolão está travado mas não há jogos selecionados.
          </p>
          <p className="text-gray-600 mt-1">
            Contate o administrador do bolão.
          </p>
        </div>
      )}

      {/* Configurações */}
      {!isLocked && showConfig && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Configuração dos Jogos
          </h3>
          
          <div className="space-y-4">
            {gameConfigs.map((config, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Números por jogo
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="15"
                    value={config.size}
                    onChange={(e) => updateConfig(index, 'size', parseInt(e.target.value) || 6)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={config.quantity}
                    onChange={(e) => updateConfig(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <button
                  onClick={() => removeConfig(index)}
                  className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <FiTrash2 size={16} />
                  Remover
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addConfig}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiPlus size={16} />
            Adicionar Configuração
          </button>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Total:</strong> {gameConfigs.reduce((sum, c) => sum + c.quantity, 0)} jogos 
              utilizando {totalNumbers} números únicos
            </p>
          </div>
        </div>
      )}

      {/* Jogos Selecionados */}
      {selectedGames.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-purple-800">
              Meus Jogos Selecionados ({selectedGames.length})
            </h3>
            {!isLocked && (
              <button
                onClick={() => {
                  setSelectedGames([]);
                  localStorage.removeItem('megasena_selected_games');
                  toast.info('Todos os jogos removidos');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Limpar Todos
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {selectedGames.map((game, index) => (
              <div key={index} className="border-2 border-purple-300 rounded-lg p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                {editingGame === index ? (
                  // Modo de edição
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">
                      Editando Jogo {index + 1} - Selecione {editingNumbers.length}/15 números
                    </h4>
                    <div className="grid grid-cols-10 gap-2 mb-4">
                      {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          onClick={() => toggleEditNumber(num)}
                          disabled={!editingNumbers.includes(num) && editingNumbers.length >= 15}
                          className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                            editingNumbers.includes(num)
                              ? 'bg-purple-600 text-white scale-110'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-30'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={editingNumbers.length < 6}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
                      >
                        Salvar ({editingNumbers.length} números)
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modo de visualização
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-800">
                        Jogo {index + 1} - {game.length} números
                      </h4>
                      {!isLocked && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(index)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => removeSelectedGame(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Remover
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {[...game].sort((a, b) => a - b).map((num, i) => (
                        <div
                          key={i}
                          className="relative group"
                        >
                          <div className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            {num.toString().padStart(2, '0')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Jogos gerados */}
      {!showOnlySelected && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-green-800">
              Jogos Sugeridos
            </h3>
            {!isLocked && (
              <button
                onClick={regenerateGames}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
              >
                Gerar Novos Jogos
              </button>
            )}
          </div>
        
        {games.length > 0 ? (
          games.map((game, index) => {
            const isSelected = selectedGames.some(sg => 
              sg.length === game.length && sg.every((n, i) => game.includes(n))
            );
            
            return (
              <div key={index} className={`border-2 rounded-lg p-6 ${
                isSelected 
                  ? 'border-purple-400 bg-purple-50 opacity-50' 
                  : 'border-green-200 bg-gradient-to-r from-green-50 to-yellow-50'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Jogo {index + 1} - {game.length} números
                  </h3>
                  <div className="flex gap-2">
                    {!isSelected && (
                      <button
                        onClick={() => selectGame(index)}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Selecionar Jogo
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(game.join(', '));
                        toast.success('Números copiados!');
                      }}
                      className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FiCopy size={14} />
                      Copiar
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[...game].sort((a, b) => a - b).map((num) => {
                    const numberData = getMostVotedNumbers.find(n => n.number === num);
                    const votes = numberData?.count || 0;
                    
                    return (
                      <div key={num} className="relative group">
                        <div className="bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                          {num.toString().padStart(2, '0')}
                        </div>
                        {votes > 0 && (
                          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {votes}
                          </div>
                        )}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {votes} {votes === 1 ? 'voto' : 'votos'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <strong>Sequência:</strong> {game.join(' - ')}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aguardando votos para gerar os jogos...</p>
            <p className="text-sm mt-2">Os jogos serão gerados automaticamente baseados nos números mais votados</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
