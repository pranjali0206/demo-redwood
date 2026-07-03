import { Link } from "@tanstack/react-router";
import { MapPin, FlaskConical } from "lucide-react";
import logoWhite from "../../assets/rw-logo.png";
export function Footer() { 
  return ( 
    <footer className="bg-stone-900 text-stone-300"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4"> 
        <div className="md:col-span-2"> 
        <div className="flex items-center"> 
        <img 
          src={logoWhite} 
          alt="Redwood Biotech" 
          className="h-16 w-auto" 
        /> 
      </div> 
 
          <p className="mt-3 italic text-stone-400">Revolution in Biotechnology</p> 
          <p className="mt-6 text-sm leading-relaxed max-w-md"> 
            Genetically engineered Hi-Tech Sagwan teak plantations on your land. Managed by science, owned by you. 
          </p> 
          <div className="mt-6 flex items-start gap-2 text-sm text-stone-400"> 
            <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--brand-red)]" /> 
            <span>260, Anurag Villa, 52 Bigha, Opposite Ocean Motors, Limbodi, Khandwa Road, Indore, Madhya Pradesh, India</span> 
          </div> 
          <div className="mt-3 flex items-center gap-2 text-sm text-amber-400"> 
            <FlaskConical size={16} /> New Laboratory Coming to Indore Soon 
          </div> 
        </div> 
        <div> 
          <h4 className="text-white font-semibold mb-3">Explore</h4> 
          <ul className="space-y-2 text-sm"> 
            {[ 
              ["/", "Home"], ["/about", "About"], ["/agroforestry", "Agroforestry"], 
              ["/investment", "Investment Plans"], ["/gallery", "Gallery"], ["/contact", "Contact"], 
            ].map(([to, label]) => ( 
              <li key={to}><Link to={to} className="hover:text-white">{label}</Link></li> 
            ))} 
          </ul> 
        </div> 
        <div> 
          <h4 className="text-white font-semibold mb-3">Legal</h4> 
          <ul className="space-y-2 text-sm"> 
            {[ 
              ["/terms", "Terms & Conditions"], 
              ["/privacy", "Privacy Policy"], 
              ["/disclaimer", "Disclaimer"], 
            ].map(([to, label]) => ( 
              <li key={to}><Link to={to} className="hover:text-white">{label}</Link></li> 
            ))} 
          </ul> 
        </div> 
      </div> 
      <div className="border-t border-stone-800"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between text-xs text-stone-500"> 
          <span>© {new Date().getFullYear()} Redwood Biotech. All rights reserved.</span> 
        </div> 
      </div> 
    </footer> 
  ); 
}