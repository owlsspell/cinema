import s from "./Cinema.module.css";

const Seats = ({  row, i, s, setSelectedSits, num , seats}) => {
  let red = { backgroundColor: "#e75151" };
  let green = { backgroundColor: "rgb(78, 175, 49)" };
  let grey = { backgroundColor: "rgb(152, 180, 194)" };
  // console.log("renderSit", num, sit);
  let isReserved = seats.includes(num)
  // console.log(isReserved);
  return (
    // <div className={s.row} key={row}>
    //   {sits[row].map((s, i) => {
    //     return reservedSits().map((sit) => (
    <div
      onClick={!isReserved? (e) => setSelectedSits(e, s, i, row) : null}
      style={isReserved ? red : s ? grey : green}
      row={row}
      // key={num}
    >
      {num}
    </div>
    //     ));
    //   })}
    // </div>
  );
};

export default Seats;
