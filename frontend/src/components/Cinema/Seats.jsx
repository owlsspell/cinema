import { reservedSitsByUser } from "../../State/cinema.initial";

const Seats = ({ row, i, s, setSelectedSits, num, seats }) => {
  let red = { backgroundColor: "#e75151" };
  let green = { backgroundColor: "rgb(78, 175, 49)" };
  let grey = { backgroundColor: "rgb(152, 180, 194)" };
  let blue = { backgroundColor: "rgb(55, 146, 192)" };
  let isReserved = seats.includes(num);
  let userReserved = reservedSitsByUser().seats.includes(num);
  return (
    <div
      onClick={!isReserved ? (e) => setSelectedSits(e, s, i, row) : null}
      style={isReserved ? red : s ? grey : userReserved ? blue : green}
      row={row}
    >
      {num}
    </div>
  );
};

export default Seats;
