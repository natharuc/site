'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FiCheckCircle, FiX, FiPlus, FiAward, FiTrendingUp, FiDollarSign, FiStar, FiZap, FiUsers } from 'react-icons/fi';

interface GameCheckerProps {
  selectedGames: number[][];
  bolao?: { prizeAmount?: string } | null;
}

interface GameResult {
  gameIndex: number;
  numbers: number[];
  matches: number[];
  matchCount: number;
  prize: string;
}

interface PrizeDistribution {
  sena: number;
  quina: number;
  quadra: number;
}

export default function GameChecker({ selectedGames, bolao }: GameCheckerProps) {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [numberInput, setNumberInput] = useState('');
  const [externalWinners, setExternalWinners] = useState({
    sena: '',
    quina: '',
    quadra: ''
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{
    attempts: number;
    prize: string;
    numbers: number[];
  } | null>(null);
  const [targetPrizes, setTargetPrizes] = useState({
    sena: false,
    quina: false,
    quadra: true
  });

  const addDrawnNumber = (num: number) => {
    if (num < 1 || num > 60) {
      toast.error('Número deve estar entre 1 e 60');
      return;
    }
    
    if (drawnNumbers.includes(num)) {
      toast.error('Número já foi adicionado');
      return;
    }

    if (drawnNumbers.length >= 6) {
      toast.error('Máximo de 6 números sorteados');
      return;
    }

    setDrawnNumbers([...drawnNumbers, num]);
    toast.success(`Número ${num} adicionado`);
  };

  const handleAddMultipleNumbers = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!numberInput.trim()) {
      toast.error('Digite os números sorteados');
      return;
    }

    // Parse dos números - aceita vírgula, espaço, pipe e ponto e vírgula como separadores
    const normalizedInput = numberInput
      .replace(/\|/g, ',')
      .replace(/;/g, ',')
      .replace(/\s+/g, ',')
      .replace(/,+/g, ',');
    
    const numbersStr = normalizedInput.split(',').map(n => n.trim()).filter(n => n);
    const numbers = numbersStr.map(n => parseInt(n)).filter(n => !isNaN(n));

    if (numbers.length === 0) {
      toast.error('Nenhum número válido encontrado');
      return;
    }

    const invalidNumbers = numbers.filter(n => n < 1 || n > 60);
    if (invalidNumbers.length > 0) {
      toast.error('Todos os números devem estar entre 1 e 60');
      return;
    }

    const newDrawn = [...drawnNumbers];
    let added = 0;
    
    for (const num of numbers) {
      if (!newDrawn.includes(num) && newDrawn.length < 6) {
        newDrawn.push(num);
        added++;
      }
    }

    setDrawnNumbers(newDrawn);
    setNumberInput('');
    toast.success(`${added} número(s) adicionado(s)`);
  };

  const removeDrawnNumber = (num: number) => {
    setDrawnNumbers(drawnNumbers.filter(n => n !== num));
    toast.info(`Número ${num} removido`);
  };

  const clearAll = () => {
    setDrawnNumbers([]);
    toast.info('Números limpos');
  };

  const generateRandomDraw = (): number[] => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const handleSimulate = () => {
    const randomNumbers = generateRandomDraw();
    setDrawnNumbers(randomNumbers);
    setSimulationResult(null);
    toast.success('Sorteio simulado!');
  };

  const handleLuckSimulation = async () => {
    if (selectedGames.length === 0) {
      toast.error('Adicione jogos primeiro para simular!');
      return;
    }

    if (!targetPrizes.sena && !targetPrizes.quina && !targetPrizes.quadra) {
      toast.error('Selecione pelo menos um prêmio para simular!');
      return;
    }

    setIsSimulating(true);
    setSimulationResult(null);
    
    // Usar setTimeout para não travar a UI
    setTimeout(() => {
      let attempts = 0;
      let won = false;
      let winningDraw: number[] = [];
      let prizeType = '';

      while (!won && attempts < 1000000) {
        attempts++;
        const draw = generateRandomDraw();
        
        // Verificar se algum jogo ganhou
        for (const game of selectedGames) {
          const matches = game.filter(num => draw.includes(num)).length;
          
          // Verificar se ganhou um dos prêmios desejados
          if (matches === 6 && targetPrizes.sena) {
            won = true;
            winningDraw = draw;
            prizeType = 'SENA';
            break;
          } else if (matches === 5 && targetPrizes.quina) {
            won = true;
            winningDraw = draw;
            prizeType = 'QUINA';
            break;
          } else if (matches === 4 && targetPrizes.quadra) {
            won = true;
            winningDraw = draw;
            prizeType = 'QUADRA';
            break;
          }
        }
      }

      setIsSimulating(false);
      
      if (won) {
        setSimulationResult({
          attempts,
          prize: prizeType,
          numbers: winningDraw
        });
        setDrawnNumbers(winningDraw);
        toast.success(`Você ganhou! Foram necessárias ${attempts.toLocaleString('pt-BR')} tentativas!`);
      } else {
        toast.error('Não conseguiu ganhar em 1 milhão de tentativas!');
      }
    }, 100);
  };

  const checkResults = (): GameResult[] => {
    if (drawnNumbers.length === 0) return [];

    return selectedGames.map((game, index) => {
      const matches = game.filter(num => drawnNumbers.includes(num));
      const matchCount = matches.length;
      
      let prize = '';
      if (matchCount === 6) prize = 'SENA';
      else if (matchCount === 5) prize = 'QUINA';
      else if (matchCount === 4) prize = 'QUADRA';
      else if (matchCount === 3) prize = 'Terno';
      else prize = '';

      return {
        gameIndex: index,
        numbers: game,
        matches,
        matchCount,
        prize
      };
    }).sort((a, b) => b.matchCount - a.matchCount);
  };

  const calculatePrizeDistribution = (): PrizeDistribution & { 
    senaWinners: number; 
    quinaWinners: number; 
    quadraWinners: number;
    senaPerWinner: number;
    quinaPerWinner: number;
    quadraPerWinner: number;
  } => {
    const prizeAmount = bolao?.prizeAmount || '';
    const prize = parseFloat(prizeAmount.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    // Distribuição da Mega da Virada: 35% sena, 19% quina, 19% quadra
    const senaTotal = prize * 0.35;
    const quinaTotal = prize * 0.19;
    const quadraTotal = prize * 0.19;

    const senaWinners = results.filter(r => r.matchCount === 6).length + (parseInt(externalWinners.sena) || 0);
    const quinaWinners = results.filter(r => r.matchCount === 5).length + (parseInt(externalWinners.quina) || 0);
    const quadraWinners = results.filter(r => r.matchCount === 4).length + (parseInt(externalWinners.quadra) || 0);

    return {
      sena: senaTotal,
      quina: quinaTotal,
      quadra: quadraTotal,
      senaWinners,
      quinaWinners,
      quadraWinners,
      senaPerWinner: senaWinners > 0 ? senaTotal / senaWinners : 0,
      quinaPerWinner: quinaWinners > 0 ? quinaTotal / quinaWinners : 0,
      quadraPerWinner: quadraWinners > 0 ? quadraTotal / quadraWinners : 0,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const results = checkResults();
  const hasWinners = results.some(r => r.matchCount >= 4);
  const distribution = calculatePrizeDistribution();

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <FiCheckCircle className="text-blue-600" size={32} />
        <h2 className="text-3xl font-bold text-blue-800">
          Conferir Resultados
        </h2>
      </div>

      {/* Input de números sorteados */}
      <div className="mb-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          Números Sorteados ({drawnNumbers.length}/6)
        </h3>

        {/* Números sorteados */}
        <div className="flex flex-wrap gap-3 mb-4 min-h-[4rem]">
          {drawnNumbers.length === 0 ? (
            <p className="text-gray-400 italic">Nenhum número sorteado ainda...</p>
          ) : (
            drawnNumbers.map((num) => (
              <div
                key={num}
                className="relative group"
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {num.toString().padStart(2, '0')}
                </div>
                <button
                  onClick={() => removeDrawnNumber(num)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remover"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Grid de seleção rápida */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-blue-700 mb-2">Seleção Rápida</h4>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => addDrawnNumber(num)}
                disabled={drawnNumbers.includes(num) || drawnNumbers.length >= 6}
                className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                  drawnNumbers.includes(num)
                    ? 'bg-blue-600 text-white scale-110'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-300 disabled:opacity-30 disabled:hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Input manual */}
        <form onSubmit={handleAddMultipleNumbers} className="mb-4">
          <h4 className="text-sm font-bold text-blue-700 mb-2">Adicionar Múltiplos</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Ex: 4, 8, 17, 23, 35, 59"
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <FiPlus size={16} />
              Adicionar
            </button>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Digite até 6 números separados por vírgula, espaço, pipe ou ponto e vírgula
          </p>
        </form>

        {drawnNumbers.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Limpar Tudo
          </button>
        )}
      </div>

      {/* Ganhadores Externos e Simulações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Ganhadores Externos */}
        <div className="p-6 bg-orange-50 border-2 border-orange-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FiUsers className="text-orange-600" size={24} />
            <h3 className="text-lg font-bold text-orange-800">
              Ganhadores Externos ao Bolão
            </h3>
          </div>
          <p className="text-sm text-orange-700 mb-4">
            Informe quantas pessoas de fora do bolão também ganharam para calcular o prêmio corretamente
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Sena (6 acertos)
              </label>
              <input
                type="number"
                min="0"
                value={externalWinners.sena}
                onChange={(e) => setExternalWinners({ ...externalWinners, sena: e.target.value })}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Quina (5 acertos)
              </label>
              <input
                type="number"
                min="0"
                value={externalWinners.quina}
                onChange={(e) => setExternalWinners({ ...externalWinners, quina: e.target.value })}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Quadra (4 acertos)
              </label>
              <input
                type="number"
                min="0"
                value={externalWinners.quadra}
                onChange={(e) => setExternalWinners({ ...externalWinners, quadra: e.target.value })}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Simulações */}
        <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FiZap className="text-purple-600" size={24} />
            {/* Seleção de prêmios para simulação */}
            <div className="p-3 bg-purple-100 border border-purple-300 rounded-lg">
              <p className="text-sm font-bold text-purple-800 mb-2">
                O que você quer ganhar?
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetPrizes.sena}
                    onChange={(e) => setTargetPrizes({ ...targetPrizes, sena: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-purple-900">
                    Sena (6 acertos)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetPrizes.quina}
                    onChange={(e) => setTargetPrizes({ ...targetPrizes, quina: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-purple-900">
                    Quina (5 acertos)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetPrizes.quadra}
                    onChange={(e) => setTargetPrizes({ ...targetPrizes, quadra: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-purple-900">
                    Quadra (4 acertos)
                  </span>
                </label>
              </div>
            </div>

            <h3 className="text-lg font-bold text-purple-800">
              Simulações
            </h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleSimulate}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold flex items-center justify-center gap-2"
            >
              <FiZap size={18} />
              Simular Sorteio Aleatório
            </button>
            
            <button
              onClick={handleLuckSimulation}
              disabled={isSimulating || selectedGames.length === 0}
              className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiStar size={18} />
              {isSimulating ? 'Simulando...' : 'Quanta Sorte Eu Tenho?'}
            </button>

            {simulationResult && (
              <div className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                <p className="text-sm font-bold text-yellow-900 mb-2">
                  Resultado da Simulação:
                </p>
                <p className="text-lg font-bold text-yellow-800">
                  {simulationResult.prize}!
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Tentativas: <span className="font-bold">{simulationResult.attempts.toLocaleString('pt-BR')}</span>
                </p>
                <p className="text-xs text-yellow-600 mt-2">
                  Números sorteados: {simulationResult.numbers.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resultados */}
      {drawnNumbers.length > 0 && selectedGames.length > 0 && (
        <div>
          {hasWinners && (
            <div className="mb-6 p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <FiAward className="text-yellow-600" size={48} />
                <h3 className="text-2xl font-bold text-yellow-800">
                  Parabéns! Você tem jogos premiados!
                </h3>
              </div>
              
              {/* Distribuição de prêmios */}
              {bolao?.prizeAmount && parseFloat(bolao.prizeAmount.replace(/[^\d,]/g, '').replace(',', '.')) > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sena */}
                  {distribution.senaWinners > 0 && (
                    <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FiStar className="text-yellow-600" size={24} />
                        <h4 className="text-lg font-bold text-yellow-800">SENA</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-1">
                        {distribution.senaWinners} ganhador{distribution.senaWinners > 1 ? 'es' : ''}
                      </p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {formatCurrency(distribution.senaPerWinner)}
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">por ganhador</p>
                    </div>
                  )}

                  {/* Quina */}
                  {distribution.quinaWinners > 0 && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FiTrendingUp className="text-green-600" size={24} />
                        <h4 className="text-lg font-bold text-green-800">QUINA</h4>
                      </div>
                      <p className="text-sm text-green-700 mb-1">
                        {distribution.quinaWinners} ganhador{distribution.quinaWinners > 1 ? 'es' : ''}
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(distribution.quinaPerWinner)}
                      </p>
                      <p className="text-xs text-green-600 mt-1">por ganhador</p>
                    </div>
                  )}

                  {/* Quadra */}
                  {distribution.quadraWinners > 0 && (
                    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCheckCircle className="text-blue-600" size={24} />
                        <h4 className="text-lg font-bold text-blue-800">QUADRA</h4>
                      </div>
                      <p className="text-sm text-blue-700 mb-1">
                        {distribution.quadraWinners} ganhador{distribution.quadraWinners > 1 ? 'es' : ''}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(distribution.quadraPerWinner)}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">por ganhador</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Conferência dos Jogos
          </h3>

          <div className="space-y-4">
            {results.map((result) => {
              // Calcular prêmio individual
              let individualPrize = 0;
              if (result.matchCount === 6) individualPrize = distribution.senaPerWinner;
              else if (result.matchCount === 5) individualPrize = distribution.quinaPerWinner;
              else if (result.matchCount === 4) individualPrize = distribution.quadraPerWinner;

              return (
                <div
                  key={result.gameIndex}
                  className={`border-2 rounded-lg p-6 ${
                    result.matchCount >= 6
                      ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100'
                      : result.matchCount >= 5
                      ? 'border-green-400 bg-gradient-to-r from-green-50 to-green-100'
                      : result.matchCount >= 4
                      ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-gray-800">
                      Jogo {result.gameIndex + 1} - {result.numbers.length} números
                    </h4>
                    <div className="text-right">
                      <div className={`text-2xl font-bold flex items-center gap-2 justify-end ${
                        result.matchCount >= 6 ? 'text-yellow-600' :
                        result.matchCount >= 5 ? 'text-green-600' :
                        result.matchCount >= 4 ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                        {result.matchCount >= 6 && <FiStar size={24} />}
                        {result.matchCount === 5 && <FiTrendingUp size={24} />}
                        {result.matchCount === 4 && <FiCheckCircle size={24} />}
                        {result.matchCount} acerto{result.matchCount !== 1 ? 's' : ''}
                      </div>
                      {result.prize && (
                        <div className="text-lg font-bold text-gray-700 mt-1">
                          {result.prize}
                        </div>
                      )}
                      {individualPrize > 0 && (
                        <div className="text-xl font-bold text-green-700 mt-2 flex items-center gap-2 justify-end">
                          <FiDollarSign size={20} />
                          {formatCurrency(individualPrize)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {[...result.numbers].sort((a, b) => a - b).map((num) => {
                      const isMatch = result.matches.includes(num);
                      return (
                        <div
                          key={num}
                          className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all ${
                            isMatch
                              ? 'bg-green-600 text-white scale-110 ring-4 ring-green-300'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {num.toString().padStart(2, '0')}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedGames.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg font-medium">Nenhum jogo para conferir</p>
          <p className="text-gray-400 text-sm mt-1">
            Adicione jogos primeiro para poder conferir os resultados
          </p>
        </div>
      )}
    </div>
  );
}
