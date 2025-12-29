import { Vote } from '../types';

interface StatisticsProps {
  votes: Vote[];
}

export default function Statistics({ votes }: StatisticsProps) {
  // Calcular frequência de cada número
  const numberFrequency = () => {
    const frequency: { [key: number]: number } = {};
    
    votes.forEach(vote => {
      vote.numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });
    });

    return Object.entries(frequency)
      .map(([num, count]) => ({ number: parseInt(num), count }))
      .sort((a, b) => b.count - a.count);
  };

  const topNumbers = numberFrequency();
  const totalVotes = votes.length;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        Estatísticas
      </h2>

      <div className="mb-6">
        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg p-4 mb-4">
          <p className="text-gray-700 text-sm font-medium">Total de Votos</p>
          <p className="text-4xl font-bold text-green-800">{totalVotes}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg p-4">
          <p className="text-gray-700 text-sm font-medium">Total de Números Votados</p>
          <p className="text-4xl font-bold text-green-800">{totalVotes * 6}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Números Mais Votados
      </h3>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {topNumbers.length > 0 ? (
          topNumbers.map(({ number, count }, index) => {
            const percentage = totalVotes > 0 
              ? ((count / totalVotes) * 100).toFixed(1)
              : 0;
            
            return (
              <div 
                key={number}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg
                    ${index < 3 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-green-600'}
                  `}>
                    {number.toString().padStart(2, '0')}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {count} {count === 1 ? 'voto' : 'votos'}
                    </span>
                    <span className="text-sm font-bold text-green-700">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index < 3 
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-8">
            Nenhum voto registrado ainda
          </p>
        )}
      </div>

      {/* Últimos votos */}
      {votes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Últimos Votos
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {votes.slice(0, 10).map((vote, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <p className="font-medium text-gray-800 mb-2">{vote.name}</p>
                <div className="flex flex-wrap gap-2">
                  {vote.numbers.map((num) => (
                    <div
                      key={num}
                      className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      {num.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(vote.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
