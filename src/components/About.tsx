import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              entry.target.classList.add('animate-slideRight');
            } else if (entry.target === imageRef.current) {
              entry.target.classList.add('animate-slideLeft');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={imageRef} 
            className="opacity-0 transform translate-x-8"
          >
            <img
              src="https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Our team working on a garden design"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          
          <div 
            ref={textRef}
            className="opacity-0 transform -translate-x-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Creating Beautiful Outdoor Spaces Since 2010</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Arcadia, we believe that a well-designed outdoor space can transform your life. Our team of passionate landscape architects and garden designers work closely with you to create outdoor environments that reflect your personality and meet your needs.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With over 15 years of experience in the industry, we've developed a reputation for innovative designs, sustainable practices, and exceptional craftsmanship. From small urban gardens to sprawling estates, we approach each project with the same level of dedication and attention to detail.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-600 font-bold text-4xl mb-2">250+</h4>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-green-600 font-bold text-4xl mb-2">15+</h4>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <h4 className="text-green-600 font-bold text-4xl mb-2">20</h4>
                <p className="text-gray-600">Design Awards</p>
              </div>
              <div>
                <h4 className="text-green-600 font-bold text-4xl mb-2">100%</h4>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;