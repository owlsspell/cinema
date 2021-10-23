import { useState } from "react";
import s from "./Cinema.module.css";

const Cinema = () => {
  let [count, setCount] = useState(24);
  let [sits, setSits] = useState({
    rowOne: new Array(10).fill(false),
    rowTwo: new Array(8).fill(false),
    rowThree: new Array(6).fill(false),
  });

  const showModal = (e) => {
    console.log(e.currentTarget);
  };


  let num = 25
  return (
    <div className={s.container}>
      <div className={s.cinema}>
        {Object.keys(sits).map((row) => (
          <div className={s.row} key={row}>
            {sits[row].map((s) => {
              if (num > 0) {
                num = num - 1;
              }
              return (
                <div onMouseEnter={showModal} className={s.sits} row={row} key={num} num={num} >
                  {num}
                </div>
              );
            })}
          </div>
        ))}
        <div className={s.scene}>Scene</div>
      </div>
    </div>
  );
};

export default Cinema;
