
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'
import Layout from '@/components/Layout'

export default function PrivacyPage() {
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
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Last updated: April 22, 2026</p>
          </motion.div>

          <div className="card-neat bg-white p-8 md:p-12">
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  1. Data Governance
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  At PulseAI, we prioritize the security and privacy of healthcare data. This policy outlines our standards for data collection, processing, and protection within our monitoring platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-secondary rounded-full" />
                  2. Security Standards
                </h2>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-6">
                  <p className="text-slate-600 leading-relaxed font-medium mb-4 italic">
                    "PulseAI maintains full HIPAA compliance, ensuring the highest standards for Protected Health Information (PHI)."
                  </p>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      'Data-at-Rest Encryption',
                      'Secure Transmission',
                      'Strict Access Controls',
                      'Real-time Audit Logging',
                      'SOC 2 Type II Certified',
                      'Biometric Data Isolation'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3 uppercase text-sm">
                  <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                  3. Telemetry Collection
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We collect only the essential telemetry required for clinical analysis, including real-time vitals, diagnostic-grade waveforms, and device health status. All data is anonymized before reaching our AI modeling layer.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3 uppercase text-sm">
                  <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                  4. Third-Party Restrictions
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  PulseAI maintains a strict policy against data monetization. Patient information is never shared, sold, or accessible by unauthorized entities. Access is limited to authorized clinical staff within your organization.
                </p>
              </section>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mt-12 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lock className="w-24 h-24" />
                </div>
                <h3 className="text-sm font-black mb-4 flex items-center gap-2 uppercase tracking-widest relative z-10">
                  <Eye className="h-4 w-4 text-blue-400" />
                  PRIVACY INQUIRIES
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10 font-medium">
                  Direct all compliance and privacy-related inquiries to our Data Protection Officer at{' '}
                  <a href="mailto:privacy@pulseai.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    privacy@pulseai.com
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
