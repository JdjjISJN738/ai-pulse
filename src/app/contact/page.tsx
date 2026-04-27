
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import Layout from '@/components/Layout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-neat max-w-2xl mx-auto p-12 text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Message Received
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Thank you for contacting PulseAI. Our team will review your inquiry and respond within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold tracking-wide hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
            >
              Back to Contact
            </motion.button>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Support & Inquiries
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Connect with our team to learn how PulseAI can transform your workflow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 card-neat p-8 md:p-10"
          >
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
                    placeholder="e.g. Dr. Sarah Chen"
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

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Medical Center Name"
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
          </motion.div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-neat p-8 bg-white h-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-12 bg-primary rounded-br-lg" />
              
              <h2 className="text-xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                Contact Details
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email Support</p>
                    <a href="mailto:support@pulseai.com" className="text-base font-bold text-slate-900 hover:text-primary transition-colors">
                      support@pulseai.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Phone Support</p>
                    <a href="tel:+18007857324" className="text-base font-bold text-slate-900 hover:text-primary transition-colors">
                      +1 (800) PULSE-AI
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Office Location</p>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      Medical District, San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Support Hours</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase">
                  Monday — Friday: 9AM – 6PM PST<br />
                  24/7 Monitoring for clinical partners
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
