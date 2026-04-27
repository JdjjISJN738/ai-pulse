import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Wind, 
  Activity, 
  Moon, 
  Brain, 
  Clock, 
  Filter,
  ChevronDown,
  Search,
  CheckCircle,
  Star,
  BookOpen
} from 'lucide-react'
import Layout from '@/components/Layout'
import { HEALTH_PRACTICES, getCategories, getPracticesByCategory, PracticeCategory, HealthPractice, DifficultyLevel } from '@/lib/health-practices'
import ConditionBadge from '@/components/ConditionBadge'

const categoryIcons: Record<PracticeCategory, typeof Heart> = {
  'Cardiovascular': Heart,
  'Respiratory': Wind,
  'Metabolic': Activity,
  'Sleep': Moon,
  'Mental Health': Brain
}

const categoryColors: Record<PracticeCategory, { bg: string; border: string; text: string; icon: string }> = {
  'Cardiovascular': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', icon: 'bg-rose-100' },
  'Respiratory': { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', icon: 'bg-sky-100' },
  'Metabolic': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'bg-amber-100' },
  'Sleep': { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', icon: 'bg-indigo-100' },
  'Mental Health': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'bg-purple-100' }
}

const difficultyConfig: Record<DifficultyLevel, { bg: string; text: string; border: string }> = {
  'Easy': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Moderate': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'Intense': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
}

function PracticeCard({ practice, index }: { practice: HealthPractice; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const CategoryIcon = categoryIcons[practice.category]
  const catColor = categoryColors[practice.category]
  const diffConfig = difficultyConfig[practice.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-6 rounded-2xl border-2 ${catColor.bg} ${catColor.border} hover:shadow-lg transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${catColor.icon} flex items-center justify-center`}>
            <CategoryIcon className={`h-6 w-6 ${catColor.text}`} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight mb-1">{practice.title}</h3>
            <div className="flex items-center gap-3">
              <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${diffConfig.bg} ${diffConfig.border} ${diffConfig.text}`}>
                {practice.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                <Clock className="h-3 w-3" />
                {practice.duration}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/50 rounded-xl transition-colors"
        >
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4">
        {practice.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mr-2">Recommended for:</span>
          <ConditionBadge conditions={practice.recommendedFor} size="sm" showIcon={false} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-slate-200/50"
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50">
              <CheckCircle className={`h-5 w-5 ${catColor.text}`} />
              <div>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-wider mb-1">Category</p>
                <p className="text-sm font-bold text-slate-700">{practice.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="card-neat p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-slate-200" />
            <div>
              <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-20 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2].map(j => (
              <div key={j} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-200" />
                    <div>
                      <div className="h-4 w-40 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-3 w-full bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PracticesPage() {
  const [activeCategory, setActiveCategory] = useState<PracticeCategory | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'All'>('All')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['All', ...getCategories()] as Array<PracticeCategory | 'All'>
  
  const filteredPractices = HEALTH_PRACTICES.filter(practice => {
    const matchesCategory = activeCategory === 'All' || practice.category === activeCategory
    const matchesSearch = practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         practice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         practice.recommendedFor.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = difficultyFilter === 'All' || practice.difficulty === difficultyFilter
    return matchesCategory && matchesSearch && matchesDifficulty
  })

  const groupedPractices = filteredPractices.reduce((acc, practice) => {
    if (!acc[practice.category]) {
      acc[practice.category] = []
    }
    acc[practice.category].push(practice)
    return acc
  }, {} as Record<string, HealthPractice[]>)

  const categoryOrder: PracticeCategory[] = ['Cardiovascular', 'Respiratory', 'Metabolic', 'Sleep', 'Mental Health']
  const sortedCategories = activeCategory === 'All' 
    ? categoryOrder.filter(cat => groupedPractices[cat]?.length > 0)
    : [activeCategory]

  return (
    <Layout requireAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Health Practices Library</h1>
            <p className="text-slate-500 mt-2 font-medium">Evidence-based health practices categorized by condition</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-primary">{HEALTH_PRACTICES.length} Practices Available</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search practices, descriptions, or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
              showFilters ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="text-xs font-bold">Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Difficulty</p>
                  <div className="flex gap-2">
                    {['All', 'Easy', 'Moderate', 'Intense'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff as DifficultyLevel | 'All')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                          difficultyFilter === diff
                            ? 'bg-primary text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(category => {
            const Icon = category === 'All' ? BookOpen : categoryIcons[category as PracticeCategory]
            const color = category === 'All' 
              ? { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' }
              : categoryColors[category as PracticeCategory]
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${
                  isActive 
                    ? `${color.bg} ${color.border} ${color.text}` 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
                {category !== 'All' && (
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/50' : 'bg-slate-100'
                  }`}>
                    {getPracticesByCategory(category as PracticeCategory).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {filteredPractices.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <Search className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No Practices Found</p>
            <p className="text-slate-400 text-xs font-medium mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((category, catIndex) => {
              const practices = groupedPractices[category] || []
              const Icon = categoryIcons[category]
              const catColor = categoryColors[category]

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${catColor.icon} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${catColor.text}`} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">{category}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {practices.length} {practices.length === 1 ? 'Practice' : 'Practices'}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {practices.map((practice, index) => (
                      <PracticeCard key={practice.id} practice={practice} index={index} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
