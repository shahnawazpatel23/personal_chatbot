import anime from 'animejs';
import Transparent from './Transparent';

const Background = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-slate-800 overflow-hidden">
      <DotGrid />
      <Transparent/>
    </div>
  );
};

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;
const DOT_SIZE = 16; // Adjust this to match the size of your dots plus padding

const DotGrid = () => {
    const handleClick =(e)=>{
        anime({
            targets:".dot-point",
            scale:[
                {value:1.35, easing:"easeOutSine",duration:250},
                {value:1, easing:"easeInOutQuad",duration:500},
            ],
            translateY:[
                {value:-15, easing:"easeOutSine",duration:250},
                {value:0, easing:"easeInOutQuad",duration:500},
            ],
            opacity:[
                {value:1, easing:"easeOutSine",duration:250},
                {value:0.5, easing:"easeInOutQuad",duration:500},
            ],
            delay:anime.stagger(100,{
                grid:[GRID_WIDTH,GRID_HEIGHT],
                from: e.target.dataset.index,
            })
        })
    }
  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
        onClick={handleClick}
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${GRID_WIDTH}, ${DOT_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, ${DOT_SIZE}px)`,
      }}
      className="grid"
    >
      {dots}
    </div>
  );
};






export default Background;


