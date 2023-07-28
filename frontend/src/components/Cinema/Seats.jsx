import { reservedSitsByUser } from "../../State/cinema.initial";
import style from "./Seats.module.css";
import ChairIcon from '@mui/icons-material/Chair';

const Seats = ({ row, i, s, setSelectedSits, num, seats }) => {
  let isReserved = seats.includes(num);
  let userReserved = reservedSitsByUser().seats.includes(num);
  return (
    <div
      onClick={!isReserved ? (e) => setSelectedSits(e, s, i, row) : null}
      className={style.seat + " " + (isReserved ? style.red : s ? style.grey : userReserved ? style.blue : style.green)}
      // style={isReserved ? red : s ? grey : userReserved ? blue : green}
      row={row}
    >
      <span>{num}


      </span>
      <div><ChairIcon /></div>
    </div>
  );
};

export default Seats;
