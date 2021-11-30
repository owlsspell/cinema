import { useState, useEffect } from "react";
import * as React from "react";
import s from "./Cinema.module.css";
import Button from "@mui/material/Button";
import Seats from "./Seats";
import { GET_ALL_SEATS } from "../../query/seats";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDER, RESERVE_PLACES } from "../../mutations/cinema";
import {
  reservedSits,
  reservedSitsByUser,
  ticketHolder,
} from "../../State/cinema.initial";
import { useHistory } from "react-router-dom";
import ShowSnackbar from "../Utils/Snackbar";
import ShowBackdrop from "../Utils/Backdrop";

type TypeSeat = {
  [key: string]:boolean[] 
}

const Cinema = () => {
  let history = useHistory();
  let [sits, setSits] = useState< TypeSeat >({
    rowOne: new Array(10).fill(false),
    rowTwo: new Array(8).fill(false),
    rowThree: new Array(6).fill(false),
  });
 

  const [newOrder] = useMutation(CREATE_ORDER);
  

  let [choosenSitting, addSitting] = useState <number[] >([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const { data, loading, error, refetch } = useQuery(GET_ALL_SEATS);
  
  useEffect(() => {
  if (!loading) {
    console.log("data", data);
    reservedSits({ seats: data.getAllSeats.seats });
  }
  }, [data]);

  if (data) {
    reservedSits({ seats: data.getAllSeats.seats });
  }

  // const [addPlaces] = useMutation(RESERVE_PLACES);

  const showSelectedSits = (e:React.MouseEvent<HTMLDivElement>, bool:boolean, index:number , row:string ) => {
  
     // @ts-ignore
    let sit:number = Number(e.target.textContent);
    // if (typeof sit == undefined) return;

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
      setSits({ ...sits, ...(sits[row][index]  = false as any) });
      return;
    }
    setSits({ ...sits, ...(sits[row][index] = true as any) });
  };

  function setSelectedSits(e:React.MouseEvent<HTMLDivElement>, s:boolean, i: number, row: string) {
    e.preventDefault();
    console.log(e);
    showSelectedSits(e, s, i, row);
  }

  async function choosePlaces () {
  
    if (choosenSitting.length === 0) {
      return;
    }  

  

  reservedSitsByUser({
    seats:  ((reservedSitsByUser().seats as number[]).concat(choosenSitting)) as []
  })
   

    setOpenBackdrop(true);
    console.log("reservedSitsByUser", reservedSitsByUser().seats);
    console.log("ticketHolder", ticketHolder());
    console.log({ holders: ticketHolder(), seats: reservedSitsByUser().seats });
    if (reservedSitsByUser().seats.length === ticketHolder().length) {
     
      setOpenBackdrop(true);

      await newOrder({
        variables: {
          input: {
            holders: ticketHolder(),
            seats: reservedSitsByUser().seats,
          },
        },
      });
      
      reservedSitsByUser({seats:[]})
      ticketHolder([])
       refetch()
    } else {
      setTimeout(function () {
        history.push("/users");
      }, 2000);
    }
    
    addSitting([]);
    setSits({
      rowOne: new Array(10).fill(false),
      rowTwo: new Array(8).fill(false),
      rowThree: new Array(6).fill(false),
    });

    setOpenBackdrop(false);
    setOpenSnackbar(true);
   
  }


  let num = 25;
 
  return (
    <div className={s.container}>
      <div className={s.cinema}>
        {
          !loading &&
            Object.keys(sits).map((row) => {
              console.log("key", row);
              return (
                <div className={s.row} key={row}>
                  {sits[row].map((s:boolean, i:number) => {
                    if (num > 1) {
                      num = num - 1;

                      return (
                        <Seats
                          row={row}
                          i={i}
                          s={s}
                          setSelectedSits={setSelectedSits}
                          num={num}
                          seats={reservedSits().seats}
                          key={num}
                        />
                      );
                    }
                  })}
                </div>
              );
            })
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
        
        <ShowSnackbar
          severity={
            reservedSitsByUser().seats.length === ticketHolder().length
              ? "success"
              : "info"
          }
          message={
            reservedSitsByUser().seats.length !== ticketHolder().length
              ? "Pleace add your name first"
              : "You have reserved seats!"
          }
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
        />

        <ShowBackdrop
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />
      </div>
    </div>
  );
};

export default Cinema;
