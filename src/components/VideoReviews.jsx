import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const videoReviews = [
  {
    id: 1,
    name: "Aisha Rahman",
    country: "Bangladesh",
    url: "https://www.youtube.com/watch?v=oSGk9k_G7mw",
  },
  {
    id: 2,
    name: "Michael Chen",
    country: "China",
    url: "https://www.youtube.com/watch?v=zwfwbg37hQo",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    country: "Spain",
    url: "https://www.youtube.com/watch?v=VTDCojDdLGs",
  },
  {
    id: 4,
    name: "David Johnson",
    country: "USA",
    url: "https://www.youtube.com/watch?v=nOxNsQpp7Ts",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    country: "UAE",
    url: "https://www.youtube.com/watch?v=36hoFcSEpCo",
  },
  {
    id: 6,
    name: "Leonardo Costa",
    country: "Brazil",
    url: "https://www.youtube.com/watch?v=aEUlQM17Qx0",
  },
  {
    id: 7,
    name: "Emma Wilson",
    country: "UK",
    url: "https://www.youtube.com/watch?v=wjUzEqSHy0g",
  },
];

const getYouTubeId = (url) => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
};

export default function VideoReviews() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Student Video Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Real students sharing their experience with Scholar Stream.
          </p>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {videoReviews.map((review) => {
            const videoId = getYouTubeId(review.url);
            const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <SwiperSlide key={review.id}>
                <div
                  className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200
                             hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => setActiveVideo(videoId)}
                  >
                    <img
                      src={thumbnail}
                      alt={review.name}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-all duration-300"
                    />

                    {/* Floating Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full bg-purple-600 shadow-xl 
                                      flex items-center justify-center text-white 
                                      group-hover:bg-purple-700 group-hover:scale-110 transition-all"
                      >
                        <Play className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-5 text-center bg-white">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-purple-600 font-medium">
                      {review.country}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* POPUP MODAL */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 
                         p-2 rounded-full text-white transition"
              onClick={() => setActiveVideo(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* VIDEO */}
            <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full h-[400px]"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
