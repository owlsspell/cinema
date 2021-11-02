import { useState } from "react";
import * as React from "react";
import MuiAlert from "@mui/material/Alert";
import s from "./Cinema.module.css";
import Button from "@mui/material/Button";
import Seats from "./Sits";
import { GET_ALL_SEATS } from "../query/seats";
import { useMutation, useQuery } from "@apollo/client";
import { RESERVE_PLACES } from "../mutations/cinema";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { reservedSits } from "../State/cinema.initial";

const Cinema = () => {
  let [sits, setSits] = useState({
    rowOne: new Array(10).fill(false),
    rowTwo: new Array(8).fill(false),
    rowThree: new Array(6).fill(false),
  });

  let [choosenSitting, addSitting] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const { data, loading, error, refetch } = useQuery(GET_ALL_SEATS);

  console.log("seats", data);
  // const reservedSits = useReactiveVar(reservedSits);

  const [addPlaces] = useMutation(RESERVE_PLACES);

  const showSelectedSits = (e, bool, index, row) => {
    let sit = Number(e.target.innerText);
    // reservedSits([...reservedSits(),sit])
    // console.log(reservedSits());
    // setSelectedSits([...selectedSits, sit])
    // debugger
    // console.log(choosenSitting.find(selected=> selected==sit));
    // choosenSitting.find(selected=> selected==sit)

    if (!choosenSitting.includes(sit)) {
      addSitting([...choosenSitting, sit]);
    }
    if (choosenSitting.includes(sit) && bool == true) {
      addSitting(
        choosenSitting.filter(function (item) {
          return item !== sit;
        })
      );
    }
    if (bool) {
      setSits({ ...sits, ...(sits[row][index] = false) });
      return;
    }
    setSits({ ...sits, ...(sits[row][index] = true) });
  };

  console.log(sits);
  console.log("choosenSitting", choosenSitting);

  // useEffect(()=>{
  //   reservedSits().map((s)=> )
  // },[])

  function setSelectedSits(e, s, i, row) {
    e.preventDefault();
    console.log(e);
    showSelectedSits(e, s, i, row);
  }

  function choosePlaces() {
    // Object.keys(sits).map((row) =>
    //   sits[row].map((s, i) => {
    //     console.log(s);
    //     if (s) {
    //       // console.log(sits[row][i]);
    //       // reservedSits([choosenSitting]);
    //       console.log("choosenSitting", choosenSitting);

    //       // console.log("reservedSits", reservedSits());
    //     }

    //   })

    // );
    setOpenBackdrop(true);
    addPlaces({
      variables: {
        input: {
          seats: choosenSitting,
        },
      },
    }).then(({ data }) => {
      console.log("data", data);
      addSitting([]);
      setSits({
        rowOne: new Array(10).fill(false),
        rowTwo: new Array(8).fill(false),
        rowThree: new Array(6).fill(false),
      });
      refetch();
      setOpenBackdrop(false);
      setOpenSnackbar(true);
      reservedSits(choosenSitting);
    });
  }

  console.log(reservedSits());

  let num = 25;
  // console.log(reservedSits());

  return (
    <div className={s.container}>
      <div className={s.cinema}>
        {
          !loading &&
            Object.keys(sits).map((row) => {
              console.log("key", row);
              return (
                <div className={s.row} key={row}>
                  {sits[row].map((s, i) => {
                    if (num > 1) {
                      num = num - 1;

                      return (
                        <Seats
                          row={row}
                          i={i}
                          s={s}
                          setSelectedSits={setSelectedSits}
                          num={num}
                          seats={data.getAllSeats.seats}
                          key={num}
                        />
                      );
                    }
                  })}
                </div>
              );
            })
          // } )
        }
        <Button
          variant="contained"
          onClick={() => {
            choosePlaces();
          }}
          className={s.scene}
        >
          SCENE (Click to reserve seats)
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            You have reserved seats! Pleace add your name
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={() => setOpenBackdrop(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Cinema;
