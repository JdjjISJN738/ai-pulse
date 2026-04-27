
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, BarChart3, Smartphone, Activity } from 'lucide-react'
import Layout from '@/components/Layout'

const steps = [
  {
    title: 'Connect Devices',
    description: 'Integrate existing medical devices or use PulseAI wearable sensors to begin data collection.',
    icon: Smartphone,
    color: 'blue'
  },
  {
    title: 'Real-time Streaming',
    description: 'Vitals are securely streamed to our HIPAA-compliant cloud servers for instant processing.',
    icon: Activity,
    color: 'green'
  },
  {
    title: 'AI Analysis',
    description: 'Our proprietary AI models analyze patterns and detect anomalies in real-time.',
    icon: Zap,
    color: 'purple'
  },
  {
    title: 'Smart Alerts',
    description: 'Care teams receive intelligent, prioritized alerts based on severity and risk levels.',
    icon: CheckCircle,
    color: 'red'
  }
]

export default function HowItWorksPage() {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <span className="text-blue-600 font-black text-xs tracking-[0.2em] uppercase">Architecture & Workflow</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-slate-900 mb-6 tracking-tight"
            >
              How PulseAI Operates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              A high-precision, HIPAA-compliant ecosystem engineered for mission-critical patient monitoring.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-neat p-8 relative group"
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 ${
                  step.color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                  step.color === 'green' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                  step.color === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                  'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase text-sm">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                REAL-TIME TELEMETRY<br />
                <span className="text-blue-600">MEETS CLINICAL INTELLIGENCE</span>
              </h2>
              <div className="space-y-6">
                {[
                  'End-to-end AES-256 encryption for all data streams.',
                  'Sub-second latency for critical vital sign updates.',
                  'Automated triage based on proprietary AI risk modeling.',
                  'Direct integration with major EMR systems.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 font-bold text-sm tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="card-neat bg-slate-900 p-8 aspect-video flex items-center justify-center overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
              <Activity className="w-32 h-32 text-blue-500 opacity-20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-white mb-4 mx-auto" />
                  <p className="text-white font-black text-xs tracking-[0.3em] uppercase">System Dashboard Preview</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/20"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Shield className="w-40 h-40" />
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tight relative z-10">READY FOR DEPLOYMENT?</h2>
            <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto font-medium relative z-10">
              Deploy PulseAI in your facility and experience the future of autonomous patient monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="px-10 py-4 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                BOOK CLINICAL DEMO
              </button>
              <button className="px-10 py-4 border-2 border-slate-700 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                VIEW CAPABILITIES
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
