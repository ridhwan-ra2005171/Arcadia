import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "Arcadia transformed our backyard into a stunning retreat. Their attention to detail and creative vision exceeded our expectations.",
    author: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Working with the Arcadia team was a pleasure from start to finish. They listened to our needs and delivered a beautiful, functional outdoor space.",
    author: "Michael Chen",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The landscape design for our corporate headquarters has received countless compliments. Arcadia's sustainable approach aligned perfectly with our company values.",
    author: "Emily Rodriguez",
    role: "Corporate Client",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    testimonialRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === currentIndex) {
          ref.classList.remove('opacity-0', 'translate-x-full');
          ref.classList.add('opacity-100', 'translate-x-0');
        } else {
          ref.classList.remove('opacity-100', 'translate-x-0');
          ref.classList.add('opacity-0', 'translate-x-full');
        }
      }
    });
  }, [currentIndex]);

  return (
    <section id="testimonials" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with Arcadia
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative overflow-hidden h-80">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-green-500">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <h4 className="text-lg font-bold text-gray-800">{testimonial.author}</h4>
              <p className="text-green-600">{testimonial.role}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                index === currentIndex ? 'bg-green-600 scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;