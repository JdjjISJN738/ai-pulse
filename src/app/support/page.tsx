import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Users, 
  Shield, 
  Zap, 
  Brain, 
  Activity,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  HeadphonesIcon,
  Headphones
} from 'lucide-react'
import Layout from '@/components/Layout'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-neat overflow-hidden border-slate-100 mb-4"
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

export default function SupportPage() {
  const { hash } = useLocation()
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (hash === '#contact') {
      setActiveTab('contact')
    } else if (hash === '#faq') {
      setActiveTab('faq')
    }
  }, [hash])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      category: 'technical',
      question: 'Which medical devices are supported?',
      answer: 'PulseAI features universal integration with 50+ medical-grade and consumer IoT devices. This includes Apple Health, Fitbit, Garmin, and various Bluetooth-enabled ECG, SpO2, and blood pressure monitors.'
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
    }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', organization: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Help & Support
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            How can we help you?
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Search our help center or reach out to our dedicated support team.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'faq' ? 'bg-white text-primary shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              FAQ Center
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'contact' ? 'bg-white text-primary shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Contact Support
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'faq' ? (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                      activeCategory === cat.id
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-white border-slate-100 text-slate-500 hover:border-primary-light hover:text-primary'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-5 gap-12"
            >
              {/* Contact Form */}
              <div className="lg:col-span-3">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-neat p-12 text-center h-full flex flex-col justify-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-100">
                      <CheckCircle className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Message Received</h2>
                    <p className="text-lg text-slate-600 mb-8 font-medium">Our team will respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <div className="card-neat p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Dr. Sarah Chen"
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="sarah.chen@hospital.org"
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-slate-900"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Message</label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="How can we help?"
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-slate-900 resize-none"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={isSubmitting}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-neat p-8 bg-slate-900 text-white relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]" />
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <HeadphonesIcon className="h-6 w-6 text-primary" />
                    Support Channels
                  </h2>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                        <p className="text-base font-bold">support@pulseai.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                        <p className="text-base font-bold">+1 (888) PULSE-AI</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Availability</p>
                        <p className="text-base font-bold">24/7 Clinical Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
