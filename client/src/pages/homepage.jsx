import React, { useEffect, useRef } from 'react';
import icon from '../assets/ball.png';

const HomePages = () => {
  const newsRef = useRef(null);

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

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <header className="bg-gray-900 p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-500">
            <img src={icon} alt="Icon" className="w-8 h-8 mr-2 inline-block" /> The Ultimate Football Dashboard
          </h1>
          <div>
            <a
              href="/login"
              className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-blue-500 hover:shadow-2xl hover:opacity-90"
            >
              Login
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
            <li>
              <a href="#" className="hover:text-blue-400">
                Matches
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Standings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Teams
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Today's Matches</h2>
              <div className="flex justify-between text-xl">
                <div className="font-semibold">Team A</div>
                <div className="font-semibold">VS</div>
                <div className="font-semibold">Team B</div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Match Time: 20:00</p>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Top Scorers</h2>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Player 1</span>
                  <span className="font-bold">15 Goals</span>
                </li>
                <li className="flex justify-between">
                  <span>Player 2</span>
                  <span className="font-bold">12 Goals</span>
                </li>
                <li className="flex justify-between">
                  <span>Player 3</span>
                  <span className="font-bold">10 Goals</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Upcoming Matches</h2>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Team C vs Team D</span>
                  <span className="font-semibold">22:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Team E vs Team F</span>
                  <span className="font-semibold">00:00</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="lg:grid-cols-3 gap-8 mb-16">
            <h2 className="text-3xl font-semibold text-blue-400 mb-8">League Standings</h2>
            <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-lg">
              <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Rank</th>
                    <th className="px-6 py-3 font-semibold">Team</th>
                    <th className="px-6 py-3 font-semibold">Games</th>
                    <th className="px-6 py-3 font-semibold">Won</th>
                    <th className="px-6 py-3 font-semibold">Drawn</th>
                    <th className="px-6 py-3 font-semibold">Lost</th>
                    <th className="px-6 py-3 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800 hover:bg-gray-600">
                    <td className="px-6 py-3">1</td>
                    <td className="px-6 py-3">Team A</td>
                    <td className="px-6 py-3">20</td>
                    <td className="px-6 py-3">15</td>
                    <td className="px-6 py-3">3</td>
                    <td className="px-6 py-3">2</td>
                    <td className="px-6 py-3">48</td>
                  </tr>
                  <tr className="bg-gray-800 hover:bg-gray-600">
                    <td className="px-6 py-3">2</td>
                    <td className="px-6 py-3">Team B</td>
                    <td className="px-6 py-3">20</td>
                    <td className="px-6 py-3">14</td>
                    <td className="px-6 py-3">4</td>
                    <td className="px-6 py-3">2</td>
                    <td className="px-6 py-3">46</td>
                  </tr>
                  <tr className="bg-gray-800 hover:bg-gray-600">
                    <td className="px-6 py-3">3</td>
                    <td className="px-6 py-3">Team C</td>
                    <td className="px-6 py-3">20</td>
                    <td className="px-6 py-3">12</td>
                    <td className="px-6 py-3">5</td>
                    <td className="px-6 py-3">3</td>
                    <td className="px-6 py-3">41</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-blue-400 mb-8">Latest News</h2>
            <div
              ref={newsRef}
              className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg snap-start">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Exciting Transfer News</h3>
                <p className="text-gray-400 mb-4">
                  The biggest transfer of the summer is about to happen! Top players are making moves to new teams, and the football world is buzzing with excitement.
                </p>
                <span className="text-gray-500 text-sm">Published: Jan 1, 2025</span>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-lg snap-start">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Upcoming Tournament Highlights</h3>
                <p className="text-gray-400 mb-4">
                  The tournament is heating up, and teams are preparing for some thrilling matches. Here's what to expect in the next few weeks!
                </p>
                <span className="text-gray-500 text-sm">Published: Dec 30, 2024</span>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-lg snap-start">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">New Star on the Horizon</h3>
                <p className="text-gray-400 mb-4">
                  A young prodigy is making waves in the football scene. Find out who the next big star is, and how he's set to change the game.
                </p>
                <span className="text-gray-500 text-sm">Published: Dec 28, 2024</span>
              </div>
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

export default HomePages;
