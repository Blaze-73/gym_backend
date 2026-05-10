import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Droplets, Plus, TrendingUp, Search, Bell, Grid, ChevronRight } from 'lucide-react';

const Nutrition = () => {
  const [nutritionLog, setNutritionLog] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [todayStats, setTodayStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    water: 0,
    targetCalories: 2500,
    targetProtein: 180,
    targetCarbs: 300,
    targetFats: 80,
    targetWater: 3000,
  });

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      const token = localStorage.getItem('token');
      const today = new Date().toISOString().split('T')[0];
      
        const response = await fetch(`/api/nutrition/${today}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNutritionLog(data);
          setMeals(data.meals || []);
          setTodayStats({
            calories: data.calories || 0,
            protein: data.protein_g || 0,
            carbs: data.carbs_g || 0,
            fats: data.fats_g || 0,
            water: data.water_ml || 0,
            targetCalories: data.target_calories || 2500,
            targetProtein: data.target_protein_g || 180,
            targetCarbs: data.target_carbs_g || 300,
            targetFats: data.target_fats_g || 80,
            targetWater: data.target_water_ml || 3000,
          });
        } else if (response.status === 404) {
          // No log for today – initialise empty state
          setNutritionLog(null);
          setMeals([]);
          setTodayStats(prev => ({
            ...prev,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
          }));
        } else {
          console.error('Failed to fetch nutrition data:', response.status);
        }
    } catch (error) {
      console.error('Failed to fetch nutrition:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWater = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      const today = new Date().toISOString().split('T')[0];
      
      await fetch('/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          log_date: today,
          water_ml: todayStats.water + amount,
        }),
      });

      setTodayStats(prev => ({
        ...prev,
        water: prev.water + amount,
      }));
    } catch (error) {
      console.error('Failed to add water:', error);
    }
  };

  const getMacroPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-fixed border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black font-headline text-white uppercase italic">
                NUTRITION <span className="text-primary-fixed">ENGINE</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">Fuel your performance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Fuel Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary-fixed/20 to-surface-container-high border border-primary-fixed/30 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-primary-fixed uppercase tracking-wider mb-2">Core Diagnostics</p>
                <h2 className="text-3xl font-black font-headline text-white uppercase">
                  Fuel Status: <span className="text-primary-fixed">Operational</span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black font-headline text-white">
                  {todayStats.calories.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">/ {todayStats.targetCalories.toLocaleString()} KCAL</p>
              </div>
            </div>

            {/* Macros */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Protein */}
              <div className="p-6 bg-surface-container-highest/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-headline uppercase text-gray-500">Protein</span>
                  <span className="text-sm font-bold text-primary-fixed">{todayStats.protein}g</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getMacroPercentage(todayStats.protein, todayStats.targetProtein)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-primary-fixed"
                  />
                </div>
                <p className="text-xs text-gray-500">Target: {todayStats.targetProtein}g</p>
              </div>

              {/* Carbs */}
              <div className="p-6 bg-surface-container-highest/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-headline uppercase text-gray-500">Carbs</span>
                  <span className="text-sm font-bold text-primary-fixed">{todayStats.carbs}g</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getMacroPercentage(todayStats.carbs, todayStats.targetCarbs)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-primary-fixed"
                  />
                </div>
                <p className="text-xs text-gray-500">Target: {todayStats.targetCarbs}g</p>
              </div>

              {/* Fats */}
              <div className="p-6 bg-surface-container-highest/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-headline uppercase text-gray-500">Fats</span>
                  <span className="text-sm font-bold text-primary-fixed">{todayStats.fats}g</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getMacroPercentage(todayStats.fats, todayStats.targetFats)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-primary-fixed"
                  />
                </div>
                <p className="text-xs text-gray-500">Target: {todayStats.targetFats}g</p>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Meals */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Consumption */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black font-headline uppercase">Daily Consumption</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddMeal(true)}
                  className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg font-headline font-bold text-sm uppercase flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Meal
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {meals.slice(0, 4).map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden group"
                  >
                    <div className="relative aspect-video bg-surface-container-highest">
                      {meal.image ? (
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Utensils className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded">
                          {meal.meal_type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-headline font-bold mb-2">{meal.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>P: {meal.protein_g}g</span>
                        <span>C: {meal.carbs_g}g</span>
                        <span>F: {meal.fats_g}g</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black font-headline text-primary-fixed">
                          {meal.calories} cal
                        </span>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Performance Recipes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-black font-headline uppercase mb-6">Performance Recipes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {['Citrus Seared Omega Salmon', 'Mediterranean Endurance Bowl', 'Iron Skillet Steak Strips'].map((recipe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-square bg-surface-container-highest flex items-center justify-center">
                      <Utensils className="w-16 h-16 text-gray-600" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-headline font-bold text-sm">{recipe}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Hydration */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface-container-high border border-white/5 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-primary-fixed" />
                  <span className="font-headline font-bold uppercase">Hydration</span>
                </div>
                <span className="text-2xl font-black font-headline text-primary-fixed">
                  {(todayStats.water / 1000).toFixed(1)}L
                </span>
              </div>

              <div className="h-32 bg-surface-container-highest rounded-xl mb-4 relative overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min((todayStats.water / todayStats.targetWater) * 100, 100)}%` }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-0 left-0 right-0 bg-primary-fixed/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black font-headline">
                    {Math.round((todayStats.water / todayStats.targetWater) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                {[250, 500, 750].map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddWater(amount)}
                    className="flex-1 py-3 bg-surface-container-highest border border-white/10 rounded-lg text-sm font-headline font-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors"
                  >
                    +{amount}ml
                  </motion.button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Goal: {(todayStats.targetWater / 1000).toFixed(1)}L
              </p>
            </motion.section>

            {/* Supplement Protocol */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface-container-high border border-white/5 rounded-xl p-6"
            >
              <h3 className="font-headline font-bold uppercase mb-4">Supplement Protocol</h3>
              <div className="space-y-4">
                {[
                  { name: 'Creatine Monohydrate', dose: '5g' },
                  { name: 'Whey Isolate', dose: '30g' },
                  { name: 'Omega-3 Complex', dose: '2g' },
                ].map((supplement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-lg">
                    <span className="text-sm font-headline">{supplement.name}</span>
                    <span className="text-sm font-bold text-primary-fixed">{supplement.dose}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nutrition;
