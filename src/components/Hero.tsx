import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const leafRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Create falling leaves animation
    const createLeaf = () => {
      if (!leafRefs.current || !leafRefs.current.length) return;
      
      const leaf = document.createElement('div');
      leaf.classList.add('leaf');
      
      const size = Math.random() * 10 + 10;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 10 + 15;
      const leftPos = Math.random() * 100;
      
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.left = `${leftPos}%`;
      leaf.style.animationDuration = `${duration}s`;
      leaf.style.transform = `rotate(${rotation}deg)`;
      
      const container = leafRefs.current[0];
      if (container) {
        container.appendChild(leaf);
        
        // Remove leaf after animation completes
        setTimeout(() => {
          if (container.contains(leaf)) {
            container.removeChild(leaf);
          }
        }, duration * 1000);
      }
    };
    
    // Create leaves at intervals
    const interval = setInterval(createLeaf, 2000);
    
    // Initial leaves
    for (let i = 0; i < 10; i++) {
      setTimeout(createLeaf, i * 200);
    }
    
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div ref={(el) => el && (leafRefs.current[0] = el)} className="absolute inset-0 pointer-events-none z-10" />
      
      <div className="container mx-auto px-4 z-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeIn">
            Transform Your Outdoor Space
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 opacity-0 animate-fadeIn animation-delay-300">
            Professional landscaping and garden architecture to create your dream outdoor sanctuary
          </p>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 opacity-0 animate-fadeIn animation-delay-600"
          >
            Get Started
          </button>
        </div>
      </div>
      
      <button 
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;