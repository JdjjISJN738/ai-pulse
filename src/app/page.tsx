
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Brain, AlertCircle, Smartphone, BarChart3, TrendingUp, Users, Heart, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'
import { useHealthService } from '@/lib/health-service'

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let startValue = 0
    const endValue = end

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(startValue + (endValue - startValue) * progress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function Home() {
  const { patients, alerts, unresolvedAlerts } = useHealthService()

  const stats = [
    { label: 'Patients Monitored', value: patients.length, icon: Users },
    { label: 'Active Alerts', value: unresolvedAlerts.length, icon: AlertCircle },
    { label: 'Live Devices', value: patients.length * 5, icon: Smartphone },
    { label: 'Avg Response Time', value: 2.3, suffix: 'm', icon: Activity }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.05),transparent_50%)] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Advanced Health Care</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8"
              >
                AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Health Monitoring</span> For Everyone
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 mb-12 leading-relaxed"
              >
                Real-time tracking and predictive alerts designed to help healthcare providers deliver better care.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-start gap-4"
              >
                <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Learn More
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl -z-10" />
              <img 
                src="/home.jpg" 
                alt="PulseAI Dashboard" 
                className="rounded-[3rem] shadow-2xl border-8 border-white/50 w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-2xl bg-slate-50 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Core Ecosystem</h2>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight">Everything you need for mission-critical care</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Real-time Telemetry', 
                desc: 'Sub-second latency data streaming from all clinical devices directly to your interface.',
                icon: Activity,
                color: 'blue',
                image: '/card1.png'
              },
              { 
                title: 'Predictive Analysis', 
                desc: 'AI algorithms that identify deteriorating patient trends before they become critical.',
                icon: Brain,
                color: 'purple',
                image: '/card2.png'
              },
              { 
                title: 'Instant Uplink', 
                desc: 'Mission-critical alerting system that ensures the right clinician is notified at the right time.',
                icon: AlertCircle,
                color: 'rose',
                image: '/card3.png'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative h-[400px] rounded-[2.5rem] bg-white border border-slate-100 shadow-sm overflow-hidden group"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 transition-transform duration-500 lg:group-hover:-translate-y-4">{feature.title}</h3>
                  <p className="text-slate-200 leading-relaxed text-xs lg:text-sm lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-y-4 lg:group-hover:translate-y-0">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-primary-dark rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] -z-0" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-8 tracking-tight">Ready to improve your care?</h2>
              <p className="text-slate-200 text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join healthcare facilities that trust PulseAI for their health monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/signup" className="px-12 py-5 bg-primary text-white rounded-2xl font-bold text-sm shadow-2xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/signup" className="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center">
                  Talk to Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
