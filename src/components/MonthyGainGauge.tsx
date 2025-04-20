import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { scaleLinear } from 'd3-scale';
import { TrendingUp, ChevronUp, Info, Smartphone, Target } from 'lucide-react';

interface MonthData {
  month: string;
  gain: number;
  percentage: number;
}

interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  available: boolean;
}

const MonthlyGainGauge: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState<string>('Mai');
  const [hover, setHover] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const monthlyIncomeGoal = 1500; // Monthly income goal in USD
  
  const withdrawalMethods: WithdrawalMethod[] = [
    { id: 'wave', name: 'Wave', icon: '🌊', available: true },
    { id: 'taptap', name: 'TapTap Send', icon: '📱', available: true },
    { id: 'orange', name: 'Orange Money', icon: '🍊', available: false }
  ];
  
  // Sample data for monthly gains
  const monthlyData: MonthData[] = [
    { month: 'Jan', gain: 1250, percentage: 1.55 },
    { month: 'Fév', gain: 1420, percentage: 1.75 },
    { month: 'Mar', gain: 1510, percentage: 1.87 },
    { month: 'Avr', gain: 1380, percentage: 1.71 },
    { month: 'Mai', gain: 2160, percentage: 2.67 },
    { month: 'Juin', gain: 0, percentage: 0 }
  ];
  
  const currentMonthData = monthlyData.find(item => item.month === activeMonth) || monthlyData[4];
  
  const colorScale = scaleLinear<string>()
    .domain([0, 1, 2, 3])
    .range(['#ef4444', '#f59e0b', '#10b981', '#059669']);
  
  const gaugeData = [
    { name: 'Value', value: currentMonthData.percentage },
    { name: 'Remaining', value: 3 - currentMonthData.percentage > 0 ? 3 - currentMonthData.percentage : 0 }
  ];
  
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const start = 0;
    const end = currentMonthData.percentage;
    const duration = 1500;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedPercentage(start + (end - start) * progress);
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [currentMonthData.percentage]);
  
  const prevMonthIndex = monthlyData.findIndex(item => item.month === activeMonth) - 1;
  const prevMonth = prevMonthIndex >= 0 ? monthlyData[prevMonthIndex] : null;
  const changePercentage = prevMonth ? ((currentMonthData.percentage - prevMonth.percentage) / prevMonth.percentage) * 100 : 0;
  
  const progressToGoal = (currentMonthData.gain / monthlyIncomeGoal) * 100;
  
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
    }>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">Gain: {payload[0].value.toFixed(2)}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Target: 3.00%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full transition-all duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 mr-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gain Mensuel</h3>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeMonth === 'Avr' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveMonth('Avr')}
            >
              Avr
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeMonth === 'Mai' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveMonth('Mai')}
            >
              Mai
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <Info className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="80%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="70%"
                  outerRadius="90%"
                  cornerRadius={6}
                  paddingAngle={0}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  <Cell fill={colorScale(currentMonthData.percentage)} />
                  <Cell fill="#1f2937" />
                  <Label
                    value={`${animatedPercentage.toFixed(2)}%`}
                    position="center"
                    fill="#1f2937"
                    className="dark:fill-white"
                    style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className={`mt-2 text-center transform transition-all duration-500 ${hover ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Objectif: 3% par mois</p>
            {changePercentage !== 0 && prevMonth && (
              <div className={`flex items-center justify-center mt-1 ${changePercentage >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                <ChevronUp className={`h-4 w-4 ${changePercentage < 0 ? 'transform rotate-180' : ''}`} />
                <span className="text-sm font-medium">{Math.abs(changePercentage).toFixed(1)}% vs. {prevMonth.month}</span>
              </div>
            )}
          </div>
          
          <div className="w-full mt-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Gain Mensuel</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">${currentMonthData.gain.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Investi</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">$80,800</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Performance</p>
                <p className={`text-lg font-bold ${
                  currentMonthData.percentage < 1.5 
                    ? 'text-red-500 dark:text-red-400' 
                    : currentMonthData.percentage < 2.5 
                    ? 'text-yellow-500 dark:text-yellow-400' 
                    : 'text-green-500 dark:text-green-400'
                }`}>
                  {currentMonthData.percentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 mr-3">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Objectif de Rente Mensuelle</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Progression vers l'objectif</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">${currentMonthData.gain} / ${monthlyIncomeGoal}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressToGoal, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {progressToGoal >= 100 
              ? "Félicitations ! Vous avez atteint votre objectif de rente mensuelle !" 
              : `Il vous manque $${(monthlyIncomeGoal - currentMonthData.gain).toLocaleString()} pour atteindre votre objectif`
            }
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowWithdrawalModal(true)}
            className="flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            <Smartphone className="h-5 w-5 mr-2" />
            Configurer le retrait automatique
          </button>
        </div>
      </div>

      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Choisir une méthode de retrait</h3>
            <div className="space-y-3">
              {withdrawalMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={!method.available}
                  className={`w-full p-4 rounded-lg border ${
                    selectedMethod === method.id 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' 
                      : method.available 
                        ? 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700' 
                        : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  } flex items-center justify-between`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                  </div>
                  {!method.available && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">Bientôt disponible</span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowWithdrawalModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Handle withdrawal logic here
                  setShowWithdrawalModal(false);
                }}
                disabled={!selectedMethod}
                className={`px-4 py-2 rounded-md ${
                  selectedMethod 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyGainGauge;