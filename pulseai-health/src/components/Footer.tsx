import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Shield, Activity, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import PulseAILogo from './PulseAILogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-4"
          >
            <div className="mb-8">
              <PulseAILogo size="sm" showTagline={false} />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              PulseAI is a modern health monitoring platform designed to help healthcare teams deliver better patient care through real-time data and intelligent insights.
            </p>
            <div className="flex gap-4">
              {[Globe, Shield, Activity].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all group">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-8">Platform</h4>
              <ul className="space-y-4">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/signup', label: 'Features' },
                  { to: '/signup', label: 'How It Works' },
                  { to: '/signup', label: 'Pricing' },
                  { to: '/signup', label: 'Compliance' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm font-medium hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-8">Resources</h4>
              <ul className="space-y-4">
                {[
                  { to: '/signup', label: 'Health Dashboard' },
                  { to: '/signup', label: 'Patient Registry' },
                  { to: '/signup', label: 'Alert History' },
                  { to: '/signup', label: 'Help Center' },
                  { to: '/signup', label: 'Contact Support' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm font-medium hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-8">Contact</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-900">support@pulseai.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-sm font-bold text-slate-900">+1 (800) PULSE-AI</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      Medical District, San Francisco<br />
                      CA 94103, USA
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-10 border-t border-slate-200"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <p className="text-xs font-medium text-slate-500">
                © {currentYear} PulseAI Health Monitoring. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/compliance', label: 'Compliance' }
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
