import { FaDiceD6 } from 'react-icons/fa';

interface NumberSelectorProps {
  selectedNumbers: number[];
  onNumbersChange: (numbers: number[]) => void;
  disabled?: boolean;
}

export default function NumberSelector({ 
  selectedNumbers, 
  onNumbersChange, 
  disabled = false 
}: NumberSelectorProps) {
  const maxNumbers = 60; // Mega Sena vai de 1 a 60
  const numbersToSelect = 6;

  const toggleNumber = (num: number) => {
    if (disabled) return;

    if (selectedNumbers.includes(num)) {
      onNumbersChange(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < numbersToSelect) {
      onNumbersChange([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const selectRandomNumbers = () => {
    if (disabled) return;
    
    const randomNumbers: number[] = [];
    while (randomNumbers.length < numbersToSelect) {
      const randomNum = Math.floor(Math.random() * maxNumbers) + 1;
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }
    onNumbersChange(randomNumbers.sort((a, b) => a - b));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Selecione 6 números (1 a 60)
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={selectRandomNumbers}
            disabled={disabled}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md font-medium text-sm"
            title="Escolher números aleatórios"
          >
            <FaDiceD6 size={18} />
            Surpresinha
          </button>
          <span className={`text-sm font-bold ${
            selectedNumbers.length === numbersToSelect 
              ? 'text-green-600' 
              : 'text-gray-500'
          }`}>
            {selectedNumbers.length}/{numbersToSelect}
          </span>
        </div>
      </div>

      {/* Números selecionados */}
      <div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200 min-h-[60px]">
        {selectedNumbers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedNumbers.map((num) => (
              <div
                key={num}
                className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md"
              >
                {num.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            Clique nos números abaixo para selecionar
          </p>
        )}
      </div>

      {/* Grade de números */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
        {Array.from({ length: maxNumbers }, (_, i) => i + 1).map((num) => {
          const isSelected = selectedNumbers.includes(num);
          return (
            <button
              key={num}
              type="button"
              onClick={() => toggleNumber(num)}
              disabled={disabled || (!isSelected && selectedNumbers.length >= numbersToSelect)}
              className={`
                aspect-square rounded-lg font-bold text-sm transition-all
                ${isSelected 
                  ? 'bg-green-600 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                ${disabled || (!isSelected && selectedNumbers.length >= numbersToSelect)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-md'
                }
              `}
            >
              {num.toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
