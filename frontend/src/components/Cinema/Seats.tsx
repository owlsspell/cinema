import React from "react";
import { reservedSitsByUser } from "../../State/cinema.initial";

type PropsSears ={
  row:string, i:number, s:boolean, setSelectedSits:(e:React.MouseEvent<HTMLDivElement> ,s:boolean,i:number,row:string)=> void,num:number, seats:number[]
}

const Seats = ({ row, i, s, setSelectedSits, num, seats }:PropsSears) => {
  let red = { backgroundColor: "#e75151" };
  let green = { backgroundColor: "rgb(78, 175, 49)" };
  let grey = { backgroundColor: "rgb(152, 180, 194)" };
  let blue = { backgroundColor: "rgb(55, 146, 192)" };
  let isReserved = seats.includes(num);
  let userReserved = reservedSitsByUser().seats.includes(num);

  const handleClick=(e:React.MouseEvent<HTMLDivElement>) => setSelectedSits(e, s, i, row)
  

  return (
    <div
      onClick={!isReserved ? (e:React.MouseEvent<HTMLDivElement> )=> handleClick(e) : ()=>{return}}
      style={isReserved ? red : s ? grey : userReserved ? blue : green}
      // row={row}
    >
      {num}
    </div>
  );
};

export default Seats;
