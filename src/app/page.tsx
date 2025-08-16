import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="mb-8">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden border-4 border-white shadow-xl">
            <Image
              src="/images/profile-picture.jpeg"
              alt="Vishnu Varma Profile Picture"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Hi, I&apos;m <span className="text-blue-600">Vishnu Varma</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to my personal website!
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <a 
            href="/VishnuVarmaResume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Resume
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            I&apos;m a software developer with a passion for creating user-friendly applications 
            and solving complex problems.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Over the past summer, I worked at Meta as a software engineer intern. Currently I&apos;m a senior at the Georgia Institute of Technology and am currently searching for new grad opportunities.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Let&apos;s Connect</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          I&apos;m always interested in hearing about new opportunitiess. 
          Feel free to reach out if you&apos;d like to collaborate or just want to say hello!
        </p>
        <div className="flex justify-center space-x-6">
          <a href="mailto:vishvarm04@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
            vishvarm04@gmail.com
          </a>
          <a href="https://github.com/VishVarm" className="text-blue-600 hover:text-blue-700 font-medium">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vishnuvarma0415/" className="text-blue-600 hover:text-blue-700 font-medium">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
