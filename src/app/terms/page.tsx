
import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Layout from '@/components/Layout'

export default function TermsPage() {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-primary/10 border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Effective Date: April 22, 2026</p>
          </motion.div>

          <div className="card-neat bg-white p-8 md:p-12">
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  By accessing or using the PulseAI platform, you agree to be bound by these Terms of Service. If you are using the platform on behalf of a healthcare institution, you represent that you have the legal authority to bind that entity.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  2. Scope of Service
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  PulseAI provides an AI-augmented health monitoring platform. Our services are designed to support healthcare workflows but do not constitute a substitute for professional medical judgment. All clinical decisions must be verified by licensed medical practitioners.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  3. Operational Responsibilities
                </h2>
                <ul className="space-y-4">
                  {[
                    'Maintain absolute confidentiality of system access credentials.',
                    'Ensure all clinical data handling aligns with regional health regulations (e.g., HIPAA, GDPR).',
                    'Use the platform exclusively for authorized clinical monitoring.',
                    'Immediate reporting of any system anomalies or potential security compromises.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-bold text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3 uppercase text-sm">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  4. Liability & Performance
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  PulseAI is an auxiliary monitoring tool. We are not liable for clinical outcomes or decisions derived from platform telemetry. The ultimate responsibility for patient care resides with the healthcare provider and their clinical team.
                </p>
              </section>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-rose-50 p-8 rounded-2xl border border-rose-100 mt-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <AlertCircle className="w-24 h-24 text-rose-600" />
                </div>
                <h3 className="text-sm font-black text-rose-900 mb-4 flex items-center gap-2 uppercase tracking-widest relative z-10">
                  CRITICAL MEDICAL DISCLAIMER
                </h3>
                <p className="text-rose-800 text-sm leading-relaxed relative z-10 font-bold">
                  PulseAI is NOT an emergency response system. In life-threatening situations, always follow established emergency protocols and contact emergency services immediately.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
