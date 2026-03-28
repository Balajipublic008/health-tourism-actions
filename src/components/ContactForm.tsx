import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactForm({ defaultTreatment = '' }: { defaultTreatment?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: defaultTreatment,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your consultation request has been received. Our team will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', treatment: defaultTreatment, message: '' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello,%20I%20am%20looking%20for%20medical%20tourism%20assistance.', '_blank');
  };

  return (
    <section id="consultation" className="py-24 bg-teal-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Contact Info */}
          <div className="lg:w-2/5 bg-teal-800 p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-6">Start Your Healing Journey Today</h3>
              <p className="text-teal-100 mb-12 text-lg">
                Fill out the form with your medical details, or reach out to us directly via WhatsApp for immediate assistance.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-sm text-teal-200 mb-1">Call / WhatsApp (24/7)</p>
                    <p className="text-xl font-semibold">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-sm text-teal-200 mb-1">Email Us</p>
                    <p className="text-xl font-semibold">care@healandexplore.in</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-sm text-teal-200 mb-1">Head Office</p>
                    <p className="text-lg font-medium">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-teal-700">
              <button 
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                Chat on WhatsApp Now
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 p-12 lg:p-16">
            <h3 className="text-2xl font-bold text-stone-900 mb-8">Book a Free Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">Phone / WhatsApp Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-stone-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-stone-700 mb-2">Medical Issue / Required Treatment</label>
                <select 
                  id="treatment" 
                  name="treatment" 
                  value={formData.treatment}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-stone-50 focus:bg-white"
                >
                  <option value="">Select a treatment category</option>
                  <option value="surgery">General & Advanced Surgery</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="gynecology">Gynecology & Obstetrics</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology & Neurosurgery</option>
                  <option value="psychiatry">Psychiatry & Wellness</option>
                  <option value="dental">Dental Care</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Briefly describe your condition</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-stone-50 focus:bg-white resize-none"
                  placeholder="Please provide any relevant details about your medical history..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-teal-600/20"
              >
                Request Free Consultation
              </button>
              <p className="text-xs text-stone-500 text-center mt-4">
                Your information is secure and strictly confidential. We do not share your data with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
