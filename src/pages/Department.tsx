import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { departmentsData } from '../constants';
import ContactForm from '../components/ContactForm';

export default function Department() {
  const { id } = useParams<{ id: string }>();
  
  // Scroll to top when department changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id || !departmentsData[id as keyof typeof departmentsData]) {
    return <Navigate to="/" replace />;
  }

  const dept = departmentsData[id as keyof typeof departmentsData];

  return (
    <div className="bg-white">
      {/* Department Hero */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={dept.image} 
            alt={dept.name} 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-teal-400/30">
              <dept.icon className="h-10 w-10 text-teal-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              {dept.name}
            </h1>
            <p className="text-xl text-stone-200 leading-relaxed">
              {dept.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Department Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-stone max-w-none">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">About Our {dept.name} Services</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              {dept.fullDesc}
            </p>
            
            <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100 my-12">
              <h3 className="text-2xl font-bold text-teal-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-teal-600 mr-3">✓</span>
                  <span className="text-stone-700">Internationally trained and highly experienced Indian specialists.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-teal-600 mr-3">✓</span>
                  <span className="text-stone-700">JCI and NABH accredited Indian partner hospitals ensuring global standards at a fraction of Western costs.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-teal-600 mr-3">✓</span>
                  <span className="text-stone-700">State-of-the-art medical technology and advanced infrastructure.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-teal-600 mr-3">✓</span>
                  <span className="text-stone-700">Dedicated international patient care team for seamless assistance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm defaultTreatment={dept.id} />
    </div>
  );
}
