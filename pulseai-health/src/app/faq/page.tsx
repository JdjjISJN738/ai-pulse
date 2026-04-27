

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Users, Shield, Zap, Brain, Activity } from 'lucide-react'
import Layout from '@/components/Layout'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-neat overflow-hidden border-slate-100"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-primary-light/5 transition-colors group"
      >
        <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{question}</span>
        <div className={`p-2 rounded-lg transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 pt-2">
          <div className="h-px w-full bg-slate-50 mb-6" />
          <p className="text-slate-500 font-medium leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: MessageSquare },
    { id: 'technical', label: 'Technical', icon: Brain },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'features', label: 'Features', icon: Activity }
  ]

  const faqs = [
    {
      category: 'general',
      question: 'What is PulseAI?',
      answer: 'PulseAI is an AI-powered health monitoring platform. We provide care teams with the tools to track patient vitals in real-time, leveraging intelligent algorithms to detect risks early.'
    },
    {
      category: 'general',
      question: 'Who is the platform designed for?',
      answer: 'Our platform is built for hospitals, specialized clinics, telehealth networks, and remote patient monitoring programs. It scales from single-doctor practices to multi-facility healthcare networks.'
    },
    {
      category: 'general',
      question: 'How does the 14-day free trial work?',
      answer: 'The trial provides full-access to the Professional tier. You can monitor up to 10 patients, integrate your existing devices, and experience the full power of our AI risk detection with no credit card required.'
    },
    {
      category: 'technical',
      question: 'Which medical devices are supported?',
      answer: 'PulseAI features universal integration with 50+ medical-grade and consumer IoT devices. This includes Apple Health, Fitbit, Garmin, and various Bluetooth-enabled ECG, SpO2, and blood pressure monitors.'
    },
    {
      category: 'technical',
      question: 'How does the AI reduce false positives?',
      answer: 'Our AI models use multi-vital correlation. Instead of alerting on a single threshold breach, it analyzes patterns across heart rate, oxygen levels, and history to ensure alerts are clinically significant.'
    },
    {
      category: 'security',
      question: 'Is PulseAI HIPAA and GDPR compliant?',
      answer: 'Yes. Security is our foundation. We maintain full HIPAA compliance, GDPR readiness, and SOC 2 Type II certification. All data is encrypted using industry-standard protocols.'
    },
    {
      category: 'features',
      question: 'Can we set custom clinical thresholds?',
      answer: 'Absolutely. Every patient profile allows for granular threshold customization. You can define specific parameters for different patient populations or individual clinical needs.'
    },
    {
      category: 'features',
      question: 'What is the data latency?',
      answer: 'PulseAI is designed for real-time monitoring. Vital signs are processed with minimal delay, ensuring that care teams are seeing the most current data available.'
    }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Help Center
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Find answers to common questions about our platform and features.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border-2 ${
                activeCategory === cat.id
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-primary-light hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Need Direct Assistance?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
              Our clinical implementation team is available 24/7 to help you deploy PulseAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20"
              >
                Implementation Guide
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}


