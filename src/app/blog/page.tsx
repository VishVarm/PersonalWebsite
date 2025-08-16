'use client';

import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    // {
    //   id: 1,
    //   title: "Getting Started with Next.js 14 and App Router",
    //   date: "2024-01-15",
    //   slug: "getting-started-nextjs-14-app-router"
    // }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development, technology, and the things I learn along the way.
        </p>
      </div>

      {/* Social Media Links */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow My Journey</h2>
                                <p className="text-gray-600 mb-4">Check out what I&apos;m reading and watching</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.goodreads.com/user/show/59864701-vishnu-varma"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Goodreads
            </a>
            <a
              href="https://boxd.it/1FrFH"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              Letterboxd
            </a>
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="block hover:bg-gray-50 transition-colors"
            >
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 