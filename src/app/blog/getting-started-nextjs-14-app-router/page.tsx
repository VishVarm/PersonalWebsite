import Link from 'next/link';

export default function BlogPost() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Getting Started with Next.js 14 and App Router
        </h1>
        <time className="text-lg text-gray-600">
          January 15, 2024
        </time>
      </div>

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Next.js 14 introduces the revolutionary App Router, a new paradigm for building React applications that brings server-side rendering, streaming, and React Server Components to the forefront of web development.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          What is the App Router?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The App Router is Next.js 14's new file-system based router that enables you to build React applications with server components by default. It's built on top of React 18's concurrent features and introduces a new mental model for routing and data fetching.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Key Features of Next.js 14
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
          <li><strong>Server Components:</strong> React components that run on the server by default</li>
          <li><strong>Streaming:</strong> Progressive rendering of UI components</li>
          <li><strong>Nested Routes:</strong> Intuitive file-system based routing</li>
          <li><strong>Data Fetching:</strong> Built-in data fetching with async components</li>
          <li><strong>Layouts:</strong> Shared UI across routes</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Getting Started
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To get started with Next.js 14, you can create a new project using the following command:
        </p>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <code className="text-sm text-gray-800">
            npx create-next-app@latest my-app --app
          </code>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The <code className="bg-gray-100 px-2 py-1 rounded">--app</code> flag ensures that your project uses the new App Router by default.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Project Structure
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          With the App Router, your project structure will look like this:
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <pre className="text-sm text-gray-800">
{`my-app/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── blog/
│       └── page.tsx      # Blog page
├── public/               # Static assets
└── package.json`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Creating Your First Page
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          In the App Router, pages are defined by creating <code className="bg-gray-100 px-2 py-1 rounded">page.tsx</code> files. Here's a simple example:
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <pre className="text-sm text-gray-800">
{`// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 14!</h1>
      <p>This is my first page with the App Router.</p>
    </div>
  )
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Server Components
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          One of the most exciting features of Next.js 14 is React Server Components. These components run on the server and can directly access backend resources, databases, and APIs without additional client-side code.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Server Components are perfect for:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
          <li>Fetching data from APIs or databases</li>
          <li>Accessing backend resources securely</li>
          <li>Keeping sensitive information on the server</li>
          <li>Improving initial page load performance</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Conclusion
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Next.js 14 with the App Router represents a significant step forward in React development. The combination of server components, streaming, and improved routing creates a powerful foundation for building modern web applications.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          As you explore these new features, you'll discover that they not only improve performance but also provide a more intuitive development experience. The App Router makes it easier than ever to build complex applications with clear, maintainable code.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Stay tuned for more tutorials on advanced Next.js 14 features and best practices!
        </p>
      </article>

      {/* Back Button */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
} 