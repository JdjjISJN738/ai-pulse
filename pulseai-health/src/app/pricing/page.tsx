

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Star, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'

function PricingCard({ plan, isPopular, index }: { plan: any; isPopular?: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-3xl transition-all duration-500 border ${
        isPopular 
          ? 'bg-primary-dark text-white border-primary-dark shadow-2xl shadow-primary/10' 
          : 'bg-white text-slate-900 border-slate-100 shadow-xl shadow-slate-200/50'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 tracking-tight ${isPopular ? 'text-white' : 'text-slate-900'}`}>
        {plan.name}
      </h3>
      <p className={`text-sm font-medium mb-8 leading-relaxed ${isPopular ? 'text-slate-200' : 'text-slate-500'}`}>
        {plan.description}
      </p>
      
      <div className="mb-8">
        <div className={`text-5xl font-bold mb-2 flex items-baseline gap-1 ${isPopular ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-2xl font-bold opacity-50">$</span>
          {plan.price}
          <span className={`text-sm font-bold tracking-widest uppercase ml-2 ${isPopular ? 'text-slate-400' : 'text-slate-400'}`}>
            /month
          </span>
        </div>
      </div>

      <div className={`h-px w-full mb-8 ${isPopular ? 'bg-white/10' : 'bg-slate-50'}`} />

      <ul className="space-y-4 mb-10">
        {plan.features.map((feature: string, idx: number) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className={`flex items-center gap-3 text-xs font-bold ${
              isPopular ? 'text-slate-100' : 'text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-full ${isPopular ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'}`}>
              <CheckCircle className="h-3.5 w-3.5" />
            </div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-2xl text-xs font-bold transition-all shadow-lg ${
          isPopular
            ? 'bg-primary text-white shadow-primary/20 hover:bg-primary-hover'
            : 'bg-slate-50 text-slate-900 hover:bg-slate-100 shadow-slate-100'
        }`}
      >
        Select {plan.name}
      </motion.button>
    </motion.div>
  )
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for small clinics & specialized units.',
      price: 29,
      features: [
        'Up to 50 active patients',
        'Realtime vital tracking',
        'Standard clinical alerts',
        'Secure dashboard access',
        '24/7 Email assistance'
      ]
    },
    {
      name: 'Professional',
      description: 'Built for high-volume care teams & facilities.',
      price: 99,
      features: [
        'Up to 500 active patients',
        'Proprietary AI risk detection',
        'Advanced clinical analytics',
        'Universal device integration',
        'Automated patient reports',
        'Priority technical support'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Unlimited scale for hospitals & networks.',
      price: 499,
      features: [
        'Unlimited monitoring capacity',
        'Custom AI model training',
        'Enterprise data analytics',
        'White-label portal access',
        'Dedicated success manager',
        'Custom SLA guarantees',
        'On-premise deployment'
      ]
    }
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header & Toggle Container */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="max-w-3xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
            >
              Pricing Plans
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Scalable Monitoring Solutions
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Choose the perfect plan for your healthcare facility. No hidden fees.
            </p>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Yearly
              <span className="ml-2 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isPopular={plan.name === 'Professional'}
              index={index}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-neat overflow-hidden mb-24"
        >
          <div className="p-10 border-b border-slate-50 bg-slate-50/30">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Full Capability Matrix</h2>
            <p className="text-sm font-medium text-slate-500 mt-2">Compare every feature across our specialized clinical tiers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-white">
                  <th className="py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Feature</th>
                  <th className="py-6 px-6 text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">Starter</th>
                  <th className="py-6 px-6 text-[10px] font-black text-blue-600 uppercase tracking-widest text-center bg-blue-50/30">Professional</th>
                  <th className="py-6 px-6 text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { feature: 'Active Patient Monitoring', starter: '50', professional: '500', enterprise: 'Unlimited' },
                  { feature: 'AI Alert Intelligence', starter: 'Standard', professional: 'Predictive', enterprise: 'Custom Models' },
                  { feature: 'Connected IoT Devices', starter: '10 Units', professional: '50 Units', enterprise: 'Unlimited' },
                  { feature: 'Clinical Reporting', starter: 'Weekly', professional: 'Real-time', enterprise: 'Custom BI' },
                  { feature: 'Technical Support', starter: 'Email', professional: '24/7 Priority', enterprise: 'Dedicated Team' },
                  { feature: 'Security Compliance', starter: 'HIPAA', professional: 'HIPAA + SOC2', enterprise: 'Custom Audit' }
                ].map((row, idx) => (
                  <tr key={row.feature} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-6 px-10 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{row.feature}</td>
                    <td className="py-6 px-6 text-sm font-medium text-slate-500 text-center">{row.starter}</td>
                    <td className="py-6 px-6 text-sm font-black text-blue-600 text-center bg-blue-50/20">{row.professional}</td>
                    <td className="py-6 px-6 text-sm font-medium text-slate-500 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">Deploy PulseAI Today</h2>
            <p className="text-blue-100 text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Experience the future of healthcare monitoring. Start your 14-day full-access trial or book a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/20"
              >
                Book a Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}


