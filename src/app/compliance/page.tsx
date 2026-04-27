
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, ClipboardCheck, Globe, Server, UserCheck } from 'lucide-react'
import Layout from '@/components/Layout'

const certifications = [
  {
    title: 'HIPAA Compliant',
    description: 'Fully compliant with the Health Insurance Portability and Accountability Act.',
    icon: ShieldCheck
  },
  {
    title: 'SOC 2 Type II',
    description: 'Rigorous auditing for security, availability, and confidentiality.',
    icon: ClipboardCheck
  },
  {
    title: 'GDPR Ready',
    description: 'Compliant with European data protection and privacy regulations.',
    icon: Globe
  },
  {
    title: 'ISO 27001',
    description: 'International standard for information security management systems.',
    icon: Server
  }
]

export default function CompliancePage() {
  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
            >
              <ShieldCheck className="h-4 w-4" />
              Verified Healthcare Standards
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              Compliance & Security
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              PulseAI is built to meet and exceed global regulatory requirements for healthcare data protection.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-neat p-10 text-center relative group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center mx-auto mb-8 group-hover:border-primary transition-colors">
                  <cert.icon className="h-8 w-8 text-slate-900 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{cert.title}</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed">{cert.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-primary-dark rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Lock className="w-64 h-64" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-10 tracking-tight">Security Infrastructure</h2>
                <div className="space-y-10">
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Lock className="h-6 w-6 text-primary-light group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Secure Encryption</h4>
                      <p className="text-slate-300 text-sm font-medium leading-relaxed">Advanced encryption protocols for all patient data both in-transit and at-rest within our platform.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <UserCheck className="h-6 w-6 text-primary-light group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Access Control</h4>
                      <p className="text-slate-300 text-sm font-medium leading-relaxed">Granular role-based access control (RBAC) and multi-factor authentication for all platform users.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-neat p-8 bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary-light" />
                  Compliance Verification
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-8">
                  Our compliance team performs regular audits and security assessments to ensure the platform remains at the forefront of healthcare standards.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold mb-1">99.9%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime Guarantee</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold mb-1">24/7</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
