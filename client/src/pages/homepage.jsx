import React, { useEffect, useRef, useState } from 'react';
import icon from '../assets/ball.png';
import axios from "axios";

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="ball-loader"></div>
      <div className="text-2xl text-white">Loading Matches...</div>
    </div>
  );
};

const HomePages = () => {
  const newsRef = useRef(null);

  useEffect(() => {
    const autoScroll = () => {
      if (newsRef.current) {
        const scrollWidth = newsRef.current.scrollWidth;
        const clientWidth = newsRef.current.clientWidth;

        if (newsRef.current.scrollLeft + clientWidth >= scrollWidth) {
          newsRef.current.scrollLeft = 0;
        } else {
          newsRef.current.scrollLeft += 300;
        }
      }
    };

    const scrollInterval = setInterval(autoScroll, 3000);

    return () => clearInterval(scrollInterval); 
  }, []);

  const [matches, setMatches]                   = useState([]);
  const [topScorers, setTopScorers]             = useState([]);
  const [matchesNow, setMatchesNow]             = useState([]);
  const [matchesTomorrow, setMatchesTomorrow]   = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);

  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0]; 

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    const APIkey                = '6bfd4dbfd450b9b417182535a629b7da5e11af7cddad0d2f3a83d79808aab7b4';
    const endpoint              = 'https://apiv2.apifootball.com/';
    const urlMatches            = `${endpoint}?action=get_standings&league_id=207&APIkey=${APIkey}`;
    const urlTopScorers         = `${endpoint}?action=get_topscorers&league_id=207&APIkey=${APIkey}`;
    const urlMatchesNow         = `${endpoint}?action=get_predictions&APIkey=${APIkey}&from=${todayFormatted}&to=${todayFormatted}`;
    const urlMatchestomorrow    = `${endpoint}?action=get_predictions&APIkey=${APIkey}&from=${tomorrowFormatted}&to=${tomorrowFormatted}`;

    axios.get(urlMatches)
      .then(response => {
        console.log(response);
        
        setMatches(response.data || []); 
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false);
      });

    axios.get(urlTopScorers)
      .then(response => {
        console.log(response);
        
        setTopScorers(response.data || []); 
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false);
      });

    axios.get(urlMatchesNow)
      .then(response => {
        
        const matchesData = response.data.slice(0, 5)
        
        setMatchesNow(matchesData); 
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false);
      });

    axios.get(urlMatchestomorrow)
      .then(response => {
        
        const matchesData = response.data.slice(0, 5)
        
        setMatchesTomorrow(matchesData); 
        setLoading(false);
      })
      .catch(error => {
        setError(error); 
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          </ul>
        </div>
      </nav>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Top Scorers Serie A</h2>
              {topScorers.map((top, index) => {

                  return (
                    <ul className="space-y-4"
                      key={top.team_key}>
                      <li className="flex justify-between">
                        <span>{top.player_name}</span>
                        <span className="font-bold">{top.goals} Goals</span>
                      </li>
                    </ul>
                  );
                })
              }
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Today's Matches</h2>
              <ul className="space-y-4">
                {matchesNow && matchesNow.length > 0 ? (
                  matchesNow.map((now, index) => (
                    <li key={index} className="text-xl">
                      <div className="mt-2 text-center text-sm text-gray-400">
                        <p className="font-semibold">League Name: {now.league_name}</p>
                      </div>

                      <div className="flex items-center mb-2">
                        <div className="flex-1 text-left font-semibold">{now.match_hometeam_name}</div>
                        
                        <div className="mx-4 text-xl font-semibold">VS</div>
                        
                        <div className="flex-1 text-right font-semibold">{now.match_awayteam_name}</div>
                      </div>

                      <div className="mt-2 text-center text-sm text-gray-400">
                        <p className="font-semibold">Match Time: {now.match_time}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No matches available</li>
                )}
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Upcoming Matches</h2>
              <ul className="space-y-4">
                {matchesTomorrow && matchesTomorrow.length > 0 ? (
                  matchesTomorrow.map((tomorrow, index) => (
                    <li key={index} className="text-xl">
                      <div className="mt-2 text-center text-sm text-gray-400">
                        <p className="font-semibold">League Name: {tomorrow.league_name}</p>
                      </div>

                      <div className="flex items-center mb-2">
                        <div className="flex-1 text-left font-semibold">{tomorrow.match_hometeam_name}</div>
                        
                        <div className="mx-4 text-xl font-semibold">VS</div>
                        
                        <div className="flex-1 text-right font-semibold">{tomorrow.match_awayteam_name}</div>
                      </div>

                      <div className="mt-2 text-center text-sm text-gray-400">
                        <p className="font-semibold">Match Time: {tomorrow.match_time} - Match Date: {tomorrow.match_date}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No matches available</li>
                )}
              </ul>
            </div>
          </section>

          <section className="lg:grid-cols-3 gap-8 mb-16">
            <h2 className="text-3xl font-semibold text-blue-400 mb-8">{matches[0]?.league_name} Standings ({matches[0]?.country_name})</h2>
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
                  {matches && matches.length > 0 ? (
                    matches.map((team, index) => {
                      const isRelegated   = team.overall_promotion === "Relegation - Serie B";
                      const isChampions   = team.overall_promotion === "Promotion - Champions League (League phase: )";
                      const isEuropa      = team.overall_promotion === "Promotion - Europa League (League phase: )";
                      const isConference  = team.overall_promotion === "Promotion - Conference League (Qualification: )";

                      return (
                        <tr
                          key={team.teamId}
                          className={`bg-gray-800 hover:bg-gray-600 ${
                            isRelegated
                              ? "bg-red-600"
                              : isChampions
                              ? "bg-blue-600"
                              : isEuropa
                              ? "bg-orange-600"
                              : isConference
                              ? "bg-green-600"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">{team.team_name}</td>
                          <td className="px-6 py-3">{team.overall_league_payed}</td>
                          <td className="px-6 py-3">{team.overall_league_W}</td>
                          <td className="px-6 py-3">{team.overall_league_D}</td>
                          <td className="px-6 py-3">{team.overall_league_L}</td>
                          <td className="px-6 py-3">{team.overall_league_PTS}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-3 text-center">
                        No standings data available
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
            <div className="mb-4 text-gray-400">
              <p className="font-semibold text-blue-400">Information:</p>
              <ul>
                <li><span className="text-blue-600">🟦</span> Promotion - Champions League</li>
                <li><span className="text-red-600">🟥</span> Relegation - Serie B</li>
                <li><span className="text-orange-600">🟧</span> Promotion - Europa League (League phase)</li>
                <li><span className="text-green-600">🟩</span> Promotion - Conference League (Qualification)</li>
              </ul>
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
