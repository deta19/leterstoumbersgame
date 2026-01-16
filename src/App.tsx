import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const getLetterValue = (letter) => {
    const upper = letter.toUpperCase();
    if (upper >= 'A' && upper <= 'Z') {
      return upper.charCodeAt(0) - 64; // A=1, B=2, ..., Z=26
    }
    return 0;
  };

  const sumDigits = (num) => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  const handleSubmit = () => {
    // Step 1: Convert each letter to its number and sum them
    let letterSum = 0;
    const breakdown = [];
    
    for (let char of input) {
      const value = getLetterValue(char);
      if (value > 0) {
        breakdown.push({ letter: char, value });
        letterSum += value;
      }
    }

    // Step 2: Sum the digits of the result repeatedly until single digit
    let finalNumber = letterSum;
    const reductions = [letterSum];
    
    while (finalNumber >= 10) {
      finalNumber = sumDigits(finalNumber);
      reductions.push(finalNumber);
    }

    setResult({
      breakdown,
      letterSum,
      reductions,
      finalNumber
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto p-3">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center p-3">
            Letter to Number Calculator
          </h1>
          
          <div className="mb-6">
            <div className="mb-4 p-3 ">
              <label className="block text-gray-700 font-semibold mb-2 form-label">
                Enter a word or phrase:
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 form-control"
                placeholder="Type something..."
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Letter Values:
                </h2>
                <div className="flex flex-wrap gap-2">
                  {result.breakdown.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item.letter} = {item.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Sum of Letter Values:
                </h2>
                <p className="text-2xl font-bold text-indigo-600">
                  {result.letterSum}
                </p>
              </div>

              {result.reductions.length > 1 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Digit Reduction:
                  </h2>
                  <p className="text-gray-700">
                    {result.reductions.join(' → ')}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-center">
                <h2 className="text-white text-lg font-semibold mb-2">
                  Final Number:
                </h2>
                <p className="text-5xl font-bold text-white">
                  {result.finalNumber}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm p-3">
          <p>A=1, B=2, C=3, ... Z=26</p>
        </div>
      </div>
    </div>
  );
}

export default App
