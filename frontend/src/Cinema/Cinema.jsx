import { useEffect, useState } from "react";
import { reservedSits } from "../State/sits.initial";
import s from "./Cinema.module.css";
import Button from "@mui/material/Button";

const Cinema = () => {
  // let [count, setCount] = useState(24);
  let [sits, setSits] = useState({
    rowOne: new Array(10).fill(false),
    rowTwo: new Array(8).fill(false),
    rowThree: new Array(6).fill(false),
  });

  // let [modal, toogleModal] = useState(false);

  // const reservedSits = useReactiveVar(reservedSits);

  const showSelectedSits = (e, bool, index, row) => {
    console.log(e.target.innerText);
    let sit = Number(e.target.innerText);
    // reservedSits([...reservedSits(),sit])
    // console.log(reservedSits());
    // setSelectedSits([...selectedSits, sit])
    // debugger

    if (bool) {
      setSits({ ...sits, ...(sits[row][index] = false) });
      return;
    }
    setSits({ ...sits, ...(sits[row][index] = true) });
  };

  console.log(sits);

  // let red = "#e75151"
  // let green = "rgb(78, 175, 49)"
  let red = { backgroundColor: "#e75151" };
  let green = { backgroundColor: "rgb(78, 175, 49)" };
  let grey = { backgroundColor: "rgb(152, 180, 194)" };

  let num = 25;

  // useEffect(()=>{
  //   reservedSits().map((s)=> )
  // },[])


  function setSelectedSits(e,s, i, row) {
    e.preventDefault();
    showSelectedSits(e, s, i, row)
  }
  function choosePlaces() {
   Object.keys(sits).map((row)=>sits[row].map(s=> {
     console.log(s);
     if(s) {
       console.log(s);
     }
   }))
  }

  return (
    <div className={s.container}>
      <div className={s.cinema}>
        {Object.keys(sits).map((row) => (
          <div className={s.row} key={row}>
            {sits[row].map((s, i) => {
              if (num > 0) {
                num = num - 1;
              }
              return reservedSits().map((sit) =>
                  <div
                    onClick={ sit !== num ?(e)=>setSelectedSits(e,s, i, row):null}
                    style={sit === num ? red : s ? grey : green}
                    row={row}
                    key={num}
                  >
                    {num}
                  </div>
                
              );
            })}
          </div>
        ))}
        <Button variant="contained" onClick={choosePlaces} className={s.scene}>
          SCENE (Click to reserve seats)
        </Button>
      </div>
    </div>
  );
};

export default Cinema;
