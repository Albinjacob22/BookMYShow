import React, { useState } from 'react';
import BlurCircle from './BlurCircle';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DataSelect = ({ dataTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast.error('Please select a date');
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dataSelect" className="pt-20">
      <div className="relative p-6 md:p-10 bg-primary/10 border border-primary/20 rounded-lg overflow-hidden">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Date Picker */}
          <div className="w-full md:w-auto">
            <p className="text-lg font-semibold text-white">Choose Date</p>

            <div className="flex items-center gap-4 mt-5">
              <ChevronDoubleLeftIcon className="w-6 h-6 text-white" />

              <div className="grid grid-cols-4 sm:grid-cols-5 md:flex flex-wrap gap-3 text-sm text-white">
                {Object.keys(dataTime).map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelected(date)}
                    aria-pressed={selected === date}
                    className={`flex flex-col items-center justify-center w-16 h-16 p-1 rounded-lg transition cursor-pointer
                      ${
                        selected === date
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'bg-white/10 text-white border border-primary/40 hover:bg-white/20'
                      }`}
                  >
                    <span className="text-lg font-medium">
                      {new Date(date).getDate()}
                    </span>
                    <span className="text-xs">
                      {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                  </button>
                ))}
              </div>

              <ChevronDoubleRightIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Book Now */}
          <div className="w-full md:w-auto">
            <button
              onClick={onBookHandler}
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSelect;
