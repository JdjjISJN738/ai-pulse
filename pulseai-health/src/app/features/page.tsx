
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Brain, AlertCircle, Smartphone, BarChart3, TrendingUp, Users, Shield, Zap, Lock } from 'lucide-react'
import Layout from '@/components/Layout'

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-neat p-8 flex flex-col h-full group"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${
          feature.color === 'blue' ? 'bg-primary/10 border-primary/20 text-primary' :
          feature.color === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-600' :
          feature.color === 'red' ? 'bg-rose-50 border-rose-100 text-rose-600' :
          feature.color === 'green' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
          feature.color === 'orange' ? 'bg-orange-50 border-orange-100 text-orange-600' :
          feature.color === 'indigo' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' :
          feature.color === 'teal' ? 'bg-teal-50 border-teal-100 text-teal-600' :
          'bg-slate-50 border-slate-100 text-slate-600'
        }`}>
          <feature.icon className="h-7 w-7" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          {feature.category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
        {feature.title}
      </h3>
      <p className="text-slate-600 mb-6 font-medium leading-relaxed text-sm">
        {feature.description}
      </p>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-6 border-t border-slate-100 mt-auto">
          <h4 className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-widest">Key Features:</h4>
          <ul className="space-y-3">
            {feature.benefits?.map((benefit: string, idx: number) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 text-slate-600 font-bold text-xs"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-8 text-primary hover:text-primary-hover font-bold text-xs flex items-center gap-2 transition-all group/btn"
      >
        {isExpanded ? 'Show Less' : 'View Details'}
        <TrendingUp className={`h-3 w-3 transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
      </button>
    </motion.div>
  )
}

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'ai', label: 'Clinical AI' },
    { id: 'integration', label: 'Ecosystem' },
    { id: 'security', label: 'Compliance' }
  ]

  const features = [
    {
      title: 'Realtime Vital Tracking',
      description: 'Track heart rate, oxygen level, blood pressure, ECG, temperature, and more in one live dashboard.',
      icon: Activity,
      color: 'blue',
      category: 'monitoring',
      benefits: [
        'Continuous monitoring of all vital signs',
        'Real-time data visualization',
        'Customizable alert thresholds',
        'Historical data tracking'
      ]
    },
    {
      title: 'AI Risk Detection',
      description: 'Identify unusual patterns early with intelligent monitoring that flags potential health concerns.',
      icon: Brain,
      color: 'purple',
      category: 'ai',
      benefits: [
        'Machine learning pattern recognition',
        'Early warning system',
        'Predictive risk scoring',
        'Automated anomaly detection'
      ]
    },
    {
      title: 'Instant Smart Alerts',
      description: 'Send immediate alerts to doctors, staff, or caregivers when readings cross thresholds.',
      icon: AlertCircle,
      color: 'red',
      category: 'monitoring',
      benefits: [
        'Multi-channel notifications',
        'Customizable alert rules',
        'Escalation protocols',
        'Mobile app integration'
      ]
    },
    {
      title: 'Wearable Integration',
      description: 'Connect with smartwatches, medical sensors, and IoT devices for continuous data.',
      icon: Smartphone,
      color: 'green',
      category: 'integration',
      benefits: [
        'Support for 50+ devices',
        'Plug-and-play setup',
        'Automatic device detection',
        'Battery status monitoring'
      ]
    },
    {
      title: 'Clinical Dashboard',
      description: 'Give care teams a clear view of patient history, alerts, and trends.',
      icon: BarChart3,
      color: 'orange',
      category: 'monitoring',
      benefits: [
        'Interactive data visualization',
        'Patient risk scoring',
        'Trend analysis tools',
        'Custom report generation'
      ]
    },
    {
      title: 'Predictive Analytics',
      description: 'Use AI to support earlier intervention with trend forecasting and risk scoring.',
      icon: TrendingUp,
      color: 'indigo',
      category: 'ai',
      benefits: [
        'Advanced predictive models',
        'Trend forecasting',
        'Risk trajectory analysis',
        'Early intervention alerts'
      ]
    },
    {
      title: 'Multi-User Support',
      description: 'Collaborate with entire care team through role-based access and permissions.',
      icon: Users,
      color: 'teal',
      category: 'integration',
      benefits: [
        'Role-based access control',
        'Team collaboration tools',
        'Audit trail logging',
        'Secure data sharing'
      ]
    },
    {
      title: 'Enterprise Security',
      description: 'Protect sensitive patient data with encrypted storage and compliance-ready architecture.',
      icon: Shield,
      color: 'gray',
      category: 'security',
      benefits: [
        'End-to-end encryption',
        'HIPAA compliance',
        'Regular security audits',
        'Data backup systems'
      ]
    }
  ]

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Capabilities
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Advanced Monitoring Modules
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Explore our suite of health monitoring tools designed for precision and care.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border-2 ${
                activeCategory === category.id
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-primary-light hover:text-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Integration Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 p-12 card-neat bg-slate-900 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-48 h-48" />
          </div>
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl font-black mb-6 tracking-tight">SECURE API & EMR INTEGRATION</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
              PulseAI is built on a modern, headless architecture. Easily integrate our data streams into your existing clinical workflows via our encrypted GraphQL API.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                EXPLORE DEVELOPER DOCS
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all border border-white/10">
                SYSTEM ARCHITECTURE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
