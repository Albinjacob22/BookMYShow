import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { Heart } from 'lucide-react';
import DataSelect from '../components/DataSelect';
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading';

const timeFormat = minutes => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const movie = dummyShowsData.find(show => show._id === id);
    if (!movie) {
      console.error('Movie not found for ID:', id);
      return;
    }
    setShow({
      movie,
      dataTime: dummyDateTimeData,
    });
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-104 w-[280px] object-cover"
        />

        <div>
          <BlurCircle top="-100px" left="-100px" />
          <div className="flex flex-col gap-4 text-white">
            <p className="text-sm text-primary uppercase tracking-wide">
              English
            </p>

            <h1 className="text-4xl font-bold max-w-md leading-snug">
              {show.movie.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>{show.movie?.vote_average?.toFixed(1)} User Rating</span>
            </div>

            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              {show.movie.overview}
            </p>

            <p className="text-sm text-gray-300 pt-1">
              {timeFormat(show.movie.runtime)} ∙{' '}
              {show.movie.genres.map(genre => genre.name).join(', ')} ∙{' '}
              {show.movie.release_date.split('-')[0]}
            </p>

            <div className="flex items-center flex-wrap gap-4 mt-4">
              <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
                <PlayCircleIcon className="w-5 h-5" />
                Watch Trailer
              </button>

              <a
                href="#dateSelect"
                className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                Buy Tickets
              </a>

              <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="text-lg font-medium mt-20 text-white">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-6 pb-4">
        <div className="flex items-center gap-6 w-max px-4">
          {show.movie?.casts?.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center text-white w-24 shrink-0"
            >
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 w-20 object-cover mb-2 border border-gray-600"
              />
              <p className="text-xs font-medium truncate">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection Component */}
      <DataSelect dataTime={show.dataTime} id={id} />

      <p className="text-lg font-medium mt-20 mb-8 text-white">
        You May Also Like
      </p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.slice(0, 5).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate('/movies');
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  ) : <Loading />
};

export default MovieDetails;
