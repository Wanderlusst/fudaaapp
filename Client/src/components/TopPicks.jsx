import  { useEffect } from 'react';
import { topPicks } from '../data/data';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide'; 
import { useTheme } from "./ThemeContext";


const TopPicks = () => {
  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'loop',
      perPage: 4,
      gap: '0.5rem',
      drag: 'free',
      arrows: false,
      autoplay: true,
      interval: 2000,
    });

    splide.mount();

  }, []);

  const { themeMode } = useTheme(); 

  const divStyle = {
    backgroundColor: themeMode === 'dark' ? '#23272f' : 'white',
  };
  const fontStyle = {
    color: themeMode === 'dark' ? '#f6f7f9' : '#23272f',

  }
  return (
    <div className="text-orange-500 font-bold text-2xl text-center" style={{...divStyle,...fontStyle}}>
      TopPicks
      <div className="hidden lg:flex max-w-[1520px] m-auto py-2 px-2">
        <div className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {topPicks.map((item, c) => (
                <li key={c} className="splide__slide">
                  <div className="rounded-3xl relative">
                    <div className="absolute w-full h-full bg-black/50 rounded-3xl text-white">
                      <p className="px-2 pt-4 text-xl">{item.title}</p>
                      <p className="px-2 text-lg">{item.price}</p>
                    </div>
                    <img
                      className="h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
