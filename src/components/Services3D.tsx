import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsData } from '../constants';

export default function Services3D() {
  return (
    <div className="w-full bg-stone-100 dark:bg-stone-900 rounded-3xl overflow-hidden relative border border-stone-200 dark:border-stone-800 shadow-inner p-8">
      <div className="text-center z-10 mb-8">
        <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Our Medical Specialties
        </h3>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
          Explore our world-class treatments and services
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
        {Object.values(departmentsData).slice(0, 8).map((dept) => (
          <Link 
            key={dept.id} 
            to={`/department/${dept.id}`}
            className="group relative rounded-2xl overflow-hidden aspect-square border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all"
          >
            <img 
              src={dept.image} 
              alt={dept.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm border border-teal-400/30">
                <dept.icon className="h-4 w-4 text-teal-300" />
              </div>
              <h4 className="text-white font-semibold text-sm leading-tight">{dept.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
