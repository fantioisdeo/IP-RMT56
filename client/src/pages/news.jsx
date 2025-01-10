import React, { useEffect, useRef, useState } from 'react';
import icon from '../assets/ball.png';

const NewsPage = () => {
  const newsRef = useRef(null);
  const [newsList, setNewsList] = useState([
    {
      title: 'Exciting Transfer News',
      description: 'The biggest transfer of the summer is about to happen! Top players are making moves to new teams, and the football world is buzzing with excitement.',
      date: 'Jan 1, 2025',
    },
    {
      title: 'Upcoming Tournament Highlights',
      description: 'The tournament is heating up, and teams are preparing for some thrilling matches. Here\'s what to expect in the next few weeks!',
      date: 'Dec 30, 2024',
    },
    {
      title: 'New Star on the Horizon',
      description: 'A young prodigy is making waves in the football scene. Find out who the next big star is, and how he\'s set to change the game.',
      date: 'Dec 28, 2024',
    },
  ]);

  const [isAdmin, setIsAdmin] = useState(true); // Set to true for testing; in real scenario, fetch from authentication
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');

  // Auto scroll function
  useEffect(() => {
    const autoScroll = () => {
      if (newsRef.current) {
        const scrollWidth = newsRef.current.scrollWidth;
        const clientWidth = newsRef.current.clientWidth;

        if (newsRef.current.scrollLeft + clientWidth >= scrollWidth) {
          // Reset scroll to the left if it reaches the end
          newsRef.current.scrollLeft = 0;
        } else {
          // Scroll to the right by a fixed amount (e.g., 300px)
          newsRef.current.scrollLeft += 300;
        }
      }
    };

    // Set an interval for auto scrolling every 3 seconds
    const scrollInterval = setInterval(autoScroll, 3000);

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  }, []);

  // Function to handle news addition
  const handleAddNews = () => {
    if (newTitle && newDescription && newDate) {
      const newNews = {
        title: newTitle,
        description: newDescription,
        date: newDate,
      };
      setNewsList([...newsList, newNews]);
      // Clear form after submission
      setNewTitle('');
      setNewDescription('');
      setNewDate('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <header className="bg-gray-900 p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-500">
            <img src={icon} alt="Icon" className="w-8 h-8 mr-2 inline-block" /> The Ultimate Football Dashboard
          </h1>
          <div>
            <a
              href="/"
              className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-blue-500 hover:shadow-2xl hover:opacity-90"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto">
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="#" className="hover:text-blue-400">
                Home
              </a>
            </li>   
          </ul>
        </div>
      </nav>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add New News (Admin Only) */}
          {isAdmin && (
            <section className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Add New News</h2>
              <div className="space-y-4">
                <form action="" method="post">
                  <input
                    type="text"
                    placeholder="News Title"
                    className="w-full p-2 bg-gray-800 text-white rounded-lg"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="News Description"
                    className="w-full p-2 bg-gray-800 text-white rounded-lg"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="News Date (e.g., Jan 1, 2025)"
                    className="w-full p-2 bg-gray-800 text-white rounded-lg"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <button
                    onClick={handleAddNews}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
                  >
                    Add News
                  </button>
                </form>
              </div>
            </section>
          )}

          {/* Latest News */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-blue-400 mb-8">Latest News</h2>
            <div
              ref={newsRef}
              className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {newsList.map((news, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg snap-start">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">{news.title}</h3>
                  <p className="text-gray-400 mb-4">{news.description}</p>
                  <span className="text-gray-500 text-sm">Published: {news.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 The Ultimate Football Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
