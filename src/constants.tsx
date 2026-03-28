import { HeartPulse, Activity, ShieldCheck, Smile, Stethoscope, Baby, Brain, Users, Leaf } from 'lucide-react';

export const departmentsData = {
  surgery: {
    id: 'surgery',
    name: 'General & Advanced Surgery',
    icon: Stethoscope,
    shortDesc: 'Minimally invasive and robotic surgeries by expert surgeons.',
    fullDesc: 'Our partner hospitals in India offer state-of-the-art surgical interventions including robotic surgery, laparoscopic procedures, and complex general surgeries at highly affordable prices. We ensure minimal recovery time and world-class post-operative care.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
  },
  pediatrics: {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Baby,
    shortDesc: 'Comprehensive healthcare for infants, children, and adolescents.',
    fullDesc: 'We provide specialized pediatric care ranging from neonatal intensive care to complex pediatric surgeries. Our child-friendly facilities ensure a comfortable environment for your little ones.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
  },
  gynecology: {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    icon: Users,
    shortDesc: 'Advanced women\'s health, maternity, and IVF treatments.',
    fullDesc: 'Comprehensive care for women including high-risk pregnancy management, IVF and fertility treatments, and minimally invasive gynecological surgeries.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80'
  },
  cardiology: {
    id: 'cardiology',
    name: 'Cardiology',
    icon: HeartPulse,
    shortDesc: 'Advanced heart surgeries, bypass, and valve replacements.',
    fullDesc: 'Access to top-tier cardiac care including CABG (Bypass), Angioplasty, Valve Replacements, and pediatric cardiology at a fraction of US and UK costs, performed by India\'s leading cardiologists.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
  },
  neurology: {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    icon: Brain,
    shortDesc: 'Brain and spine surgeries, stroke management, and neuro-rehab.',
    fullDesc: 'Expert treatment for complex neurological disorders, brain tumors, spinal surgeries, and comprehensive neuro-rehabilitation programs.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80'
  },
  psychiatry: {
    id: 'psychiatry',
    name: 'Psychiatry & Wellness',
    icon: Activity,
    shortDesc: 'Mental health, wellness retreats, and holistic rehabilitation.',
    fullDesc: 'Holistic mental health care combining modern psychiatric treatments with traditional Indian wellness practices like Yoga and Ayurveda in serene retreat settings.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  dental: {
    id: 'dental',
    name: 'Dental Care',
    icon: Smile,
    shortDesc: 'Cosmetic dentistry, implants, and full mouth rehabilitation.',
    fullDesc: 'World-class Indian dental clinics offering highly affordable implants, veneers, root canals, and full mouth rehabilitation using the latest international technology.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
  }
};
