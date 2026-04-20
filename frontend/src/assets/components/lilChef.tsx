import { motion } from "framer-motion";
import chefHat from "../images/chefhat.png";

const Spatula = ({ x = 0, y = 0, rotate = 0, scale = 1, color = "black" }) => (
  <motion.g style={{ x, y, rotate, scale }}>
    <g fill="white" stroke={color} strokeLinecap="round" strokeWidth="1.5">
      <path
        strokeLinejoin="round"
        d="m16.988 2.38l.76.55a15 15 0 0 1 3.32 3.318l.551.759c.577.793.49 1.888-.204 2.581l-4.53 4.527a2 2 0 0 1-1.813.543l-2.038-.418a2 2 0 0 0-1.813.543L4.648 21.35c-.392.41-1.273 1.132-2.225.18c-.864-.862-.203-1.804.207-2.196l6.574-6.566a2 2 0 0 0 .543-1.811L9.33 8.92a2 2 0 0 1 .544-1.81l4.531-4.527a2 2 0 0 1 2.584-.204"
      />
      <path d="m15.22 10.686l2.155-2.154m-4 .309l2.154-2.154" />
    </g>
  </motion.g>
);

interface lilChefProps {
  className?: string,
  isTriggered: boolean,
  wholeScale: number,
}

export default function LilChef({className, isTriggered, wholeScale}: lilChefProps) {
  const x = 0;
  const y = -41;
  const pos = (curr: number, offset: number) => {
    return `${curr + offset}`;
  };
  const pathMaker = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    return `M ${x1 + x} ${y1 + y} Q ${x2 + x} ${y2 + y} ${x3 + x} ${y3 + y}`;
  };

  return (
    <motion.div 
      className={`internal-base-style ${className ?? ''}`}
      style={{ transformOrigin: "top left" }} // Scales from the top corner
      initial={{ scale: wholeScale }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        {/* The Left Arm */}
        <motion.g
          initial={{ rotate: 170 }}
          animate={isTriggered ? { rotate: [170, 90, 90] } : { rotate: 170 }}
          transition={{ duration: 0.5 }}
          style={{
            originX: 0.88,
            originY: 0,
          }}
        >
          <Spatula
            x={28 + x}
            y={178 + y}
            rotate={-160}
            scale={2}
            color="#eebf25"
          />
          <motion.path
            d={pathMaker(60, 150, 63, 170, 63, 180)}
            stroke="black"
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: "drop-shadow(2px 0px 0px #eebf25)",
            }}
          />
        </motion.g>

        {/* The Body */}
        <path
          d={pathMaker(142, 150, 145, 170, 145, 180)}
          stroke="#eebf25"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />

        <circle
          cx={pos(100, x)}
          cy={pos(150, y)}
          r="40"
          stroke="black"
          strokeWidth="8"
          fill="white"
          style={{
            filter: "drop-shadow(0px 3px 0px #eebf25)",
          }}
        />
        <motion.image
          animate={isTriggered ? { rotate: [8, 12] } : {}}
          transition={{ duration: 0.3, ease: "linear" }}
          href={chefHat}
          width="105%"
          height="105%"
          x={`${48 + x}`}
          y={`${29 + y}`}
          style={{ rotate: 8, originX: 0.5, originY: 1.2 }}
        />

        {/* The Left Leg */}
        <path
          d={pathMaker(86, 195, 85, 200, 85, 205)}
          stroke="#eebf25"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />
        <path
          d={pathMaker(85, 190, 83, 200, 83, 205)}
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />

        {/* The Right Leg */}
        <path
          d={pathMaker(118, 194, 119, 200, 119, 205)}
          stroke="#eebf25"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />
        <path
          d={pathMaker(115, 190, 117, 200, 117, 205)}
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />

        {/* The Right Arm */}
        <path
          d={pathMaker(140, 150, 143, 170, 143, 180)}
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
        />

        {/* Eyes */}
        <motion.path
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          fill="transparent"
          initial={{ d: pathMaker(90, 140, 90, 140, 90, 150) }}
          animate={
            isTriggered
              ? {
                  d: [
                    pathMaker(90, 140, 90, 140, 90, 150),
                    pathMaker(90, 145, 90, 145, 90, 145),
                    pathMaker(83, 145, 88, 140, 93, 145),
                  ],
                }
              : { d: pathMaker(90, 140, 90, 140, 90, 150) }
          }
          transition={{
            duration: 0.2,
            ease: "circInOut",
          }}
        />
        <motion.path
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          fill="transparent"
          initial={{ d: pathMaker(110, 140, 110, 140, 110, 150) }}
          animate={
            isTriggered
              ? {
                  d: [
                    pathMaker(110, 140, 110, 140, 110, 150),
                    pathMaker(110, 145, 110, 145, 110, 145),
                    pathMaker(107, 145, 112, 140, 117, 145),
                  ],
                }
              : { d: pathMaker(110, 140, 110, 140, 110, 150) }
          }
          transition={{
            duration: 0.2,
            ease: "circInOut",
          }}
        />
        <path
          d={pathMaker(87, 165, 100, 175, 113, 165)}
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          fill="transparent"
        />
      </motion.svg>
    </motion.div>
  );
}