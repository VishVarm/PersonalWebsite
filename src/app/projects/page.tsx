import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Business Finance Tracker",
      description: " Developed a web app to track the finances of various publicly traded companies, such as Pfizer, and used a Large Language Model to analyze the effects of the COVID-19 pandemic on the company.",
      technologies: ["Python", "HTML", "CSS", "JavaScript", "Pandas"],
      image: "/images/businessfinancetracker.jpg",
      github: "https://github.com/VishVarm/10KAnalyzer",
    },
    {
      id: 2,
      title: "The Community Restoration Project Website",
      description: "Developed a website for the Community Restoration Project (CRP) in the Morgan Stanley Hackathon.",
      technologies: ["ReactJS", "TypeScript", "Firebase", "Python"],
      image: "/images/crp.png",
      github: "https://github.com/vireshpati/MS-C2G2024-TCRP-Team-8",
    },
    {
      id: 3,
      title: "Soccer Neural Network",
      description: "Developed a neural network in Python to create predict the positions of soccer players based on the player’s statistics, such as goals scored and passes completed",
      technologies: ["Python", "Numpy", "Pandas"],
      image: "/images/soccer.jpg",
      github: "https://github.com/VishVarm/FootballNeuralNetwork",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge 
          and learning experience in my journey as a developer.
        </p>
      </div>

      {/* All Projects */}
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 