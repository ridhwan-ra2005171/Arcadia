import React, { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Modern Minimalist Garden',
    category: 'Residential',
    image: 'https://i.pinimg.com/736x/50/3d/ea/503dea884a1e9d3950501b2800fc75d5.jpg'
  },
  {
    title: 'Tropical Paradise Retreat',
    category: 'Commercial',
    image: 'https://img.freepik.com/premium-photo/escape-paradise-discover-luxurious-tropical-getaway-with-breathtaking-beaches-thrilling_996993-108525.jpg'
  },
  {
    title: 'Japanese Zen Garden',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1610238115511-81be15284155?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphcGFuZXNlJTIwZ2FyZGVufGVufDB8fDB8fHww'
  },
  {
    title: 'Corporate Plaza Landscaping',
    category: 'Commercial',
    image: 'https://northviewlandscape.com/wp-content/uploads/2021/01/Depositphotos_83116236_s-2019.jpg'
  },
  {
    title: 'Mediterranean Villa Garden',
    category: 'Residential',
    image: 'https://st.hzcdn.com/simgs/pictures/landscapes/italian-villa-pritzkat-and-johnson-architects-img~79a1f77602864733_4-6917-1-3520835.jpg'
  },
  {
    title: 'Public Park Renovation',
    category: 'Public',
    image: 'https://qdnewssl-5762.kxcdn.com/images/dev/qatar%20news/large/Qatar%20Public%20Parks_04-52-2023_10-52_Qatar%20Day%20Article%20Image%202%20GURMEET%20SINGH%20Jan%2004%202023.jpg'
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (filter === 'All') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => {
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project);
      });
    };
  }, [visibleProjects]);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Projects</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of stunning landscape and garden architecture projects
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Residential', 'Commercial', 'Public'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative overflow-hidden rounded-lg shadow-lg opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-green-300">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;