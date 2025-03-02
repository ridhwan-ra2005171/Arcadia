import React, { useEffect, useRef } from 'react';
import { Flower2, Trees, Leaf } from 'lucide-react';

const services = [
  {
    icon: <Leaf className="w-12 h-12 text-green-600" />,
    title: 'Landscape Design',
    description: 'Custom landscape designs tailored to your space, preferences, and local climate conditions.'
  },
  {
    icon: <Trees className="w-12 h-12 text-green-600" />,
    title: 'Garden Architecture',
    description: 'Structural elements that transform your garden into a cohesive, functional outdoor living space.'
  },
  {
    icon: <Flower2 className="w-12 h-12 text-green-600" />,
    title: 'Planting & Maintenance',
    description: 'Expert plant selection, installation, and ongoing care to keep your garden thriving year-round.'
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive landscaping and garden architecture services to transform your outdoor space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl opacity-0 transform translate-y-8"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;