import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVideos } from "../api/youtube";

export default function Dashboard() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleLogout = () => navigate("/login");

  useEffect(() => {
    async function loadVideos() {
      try {
        const allVideos = await getAllVideos();
        setVideos(allVideos);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    loadVideos();
  }, []);

  // CATEGORY FILTERS
  const bikeVideos = videos.filter(v =>
    /bike|ride|motorcycle|biker/i.test(v.snippet.title)
  );

  const travelVideos = videos.filter(v =>
    /travel|trip|tour|explore|vlog/i.test(v.snippet.title)
  );

  const foodVideos = videos.filter(v =>
    /food|eat|restaurant|taste|recipe/i.test(v.snippet.title)
  );

  // Netflix Row Component
  const VideoRow = ({ title, items }) => (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 px-2">{title}</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide px-2">
        {items.map(video => (
          <div
            key={video.id.videoId}
            className="min-w-[250px] cursor-pointer transform transition duration-300 hover:scale-110 hover:z-20"
            onClick={() => setSelectedVideo(video.id.videoId)}
          >
            <div className="relative">
              <img
                src={video.snippet.thumbnails.high.url}
                className="w-[250px] h-[150px] object-cover rounded-xl shadow-lg"
                alt={video.snippet.title}
              />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
            </div>
            <p className="text-sm mt-2 text-gray-300 font-medium">
              {video.snippet.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-12 py-6 bg-[#141414] shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide text-red-600">NETFLIX</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-5 py-2 rounded-lg text-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* HERO BANNER */}
      <div className="relative w-full h-[350px] flex items-center px-14 bg-cover bg-center"
           style={{
             backgroundImage:
               "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')"
           }}>
        <div className="bg-black/60 absolute inset-0"></div>

        <h1 className="relative text-5xl font-bold text-white drop-shadow-lg leading-snug">
          Welcome to My Travel Vlog 🌍 <br />
          <span className="text-red-500">Enjoy the Experience!</span>
        </h1>
      </div>

      {/* VIDEO ROWS */}
      <div className="px-10 py-10">
        <VideoRow title="🏍 Bike Rides" items={bikeVideos} />
        <VideoRow title="✈️ Travel Vlogs" items={travelVideos} />
        <VideoRow title="🍲 Food & Taste" items={foodVideos} />
      </div>

      {/* POPUP MODAL PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-black rounded-xl p-4 max-w-4xl w-full relative shadow-2xl animate-scaleIn">

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-4 text-white text-3xl hover:text-red-500"
            >
              ✖
            </button>

            <iframe
              className="w-full h-[500px] rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn .3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn .3s ease-out;
        }
        @keyframes fadeIn {
          from {opacity:0;}
          to {opacity:1;}
        }
        @keyframes scaleIn {
          from {transform:scale(.85);opacity:0;}
          to {transform:scale(1);opacity:1;}
        }
      `}</style>
    </div>
  );
}
