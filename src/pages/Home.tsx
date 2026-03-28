import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronRight } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { departmentsData } from '../constants';
import Services3D from '../components/Services3D';

const destinations = [
  { name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1564507592208-027041cb5899?auto=format&fit=crop&w=600&q=80', desc: 'Experience the ultimate symbol of love during your recovery.' },
  { name: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', desc: 'Relax and rejuvenate in the serene, nature-filled backwaters.' },
  { name: 'Himalayan Retreats', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80', desc: 'Find peace and holistic healing in the majestic mountains.' },
  { name: 'Goa Beaches', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', desc: 'Recover comfortably by the sunny, relaxing beaches of Goa.' },
];

const steps = [
  { title: '1. Free Consultation', desc: 'Share your medical reports online. Our experts will evaluate and provide a customized treatment plan and cost estimate.' },
  { title: '2. Visa & Travel', desc: 'We provide an invitation letter for your Medical Visa and assist with flight bookings and accommodation.' },
  { title: '3. Treatment', desc: 'Arrive in India. We provide airport pickup and guide you through your procedure at our world-class, premium Indian hospitals.' },
  { title: '4. Recovery & Tour', desc: 'Recover in comfort. Once cleared by your doctor, enjoy a guided tour of incredible India before flying home safely.' },
];

export default function Home() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello,%20I%20am%20looking%20for%20medical%20tourism%20assistance.', '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80" 
            alt="Medical Tourism India" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/95 to-stone-50 dark:from-stone-950/80 dark:via-stone-950/95 dark:to-stone-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-sm font-semibold tracking-wide uppercase mb-6 border border-teal-200 dark:border-teal-800">
              Premium Healthcare. Unbeatable Prices in India.
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 mb-8">
              High-Quality Care <br className="hidden md:block" />
              <span className="text-teal-600 dark:text-teal-400">in India.</span> <span className="text-amber-600 dark:text-amber-500">Low Prices.</span>
            </h1>
            <p className="mt-4 text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Experience the world's best medical treatments in India at incredibly low prices. Get access to internationally accredited Indian hospitals, top-tier surgeons, and zero waiting time—saving you up to 80% compared to Western countries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#consultation"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/30 transition-all"
              >
                Book Free Consultation
              </a>
              <button 
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 shadow-sm transition-all gap-2"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why India Stats */}
      <section className="py-12 bg-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">60-80%</div>
              <div className="text-teal-100 text-sm uppercase tracking-wider">Cost Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">Zero</div>
              <div className="text-teal-100 text-sm uppercase tracking-wider">Waiting Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">JCI</div>
              <div className="text-teal-100 text-sm uppercase tracking-wider">Accredited Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">100%</div>
              <div className="text-teal-100 text-sm uppercase tracking-wider">English Speaking Staff</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="py-24 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">World-Class Medical Specialties</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">We cover a wide range of medical specialties, providing you with the best doctors and state-of-the-art technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(departmentsData).map((dept, index) => (
              <Link to={`/department/${dept.id}`} key={dept.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-end"
                >
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-end">
                    <div className="w-12 h-12 bg-teal-500/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-teal-400/30 group-hover:bg-teal-500/40 transition-colors">
                      <dept.icon className="h-6 w-6 text-teal-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{dept.name}</h3>
                    <p className="text-stone-300 leading-relaxed mb-4 line-clamp-2">{dept.shortDesc}</p>
                    <div className="mt-auto flex items-center text-teal-300 font-medium group-hover:text-teal-200 transition-colors">
                      Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-stone-100 dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">Your Journey to Health</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">A seamless, hassle-free experience from your home country to India and back.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-300 dark:bg-stone-700 -translate-y-1/2 z-0"></div>
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 bg-white dark:bg-stone-950 rounded-3xl p-8 shadow-sm border border-stone-200 dark:border-stone-800 text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg shadow-amber-500/30">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">{step.title}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="py-24 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">Recover & Explore</h2>
              <p className="text-lg text-stone-600 dark:text-stone-400">Combine your healing process with a memorable vacation. India offers diverse landscapes perfect for post-treatment recovery.</p>
            </div>
            <a href="#consultation" className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300">
              Plan your itinerary <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-stone-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">{dest.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Contact Form */}
      <ContactForm />
    </>
  );
}
