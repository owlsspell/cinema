import s from "./User.module.css";
import Input from "@mui/material/Input";
import { Avatar, Button, List, ListItem, ListItemText } from "@mui/material";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../query/user";
import { reservedSitsByUser, ticketHolder } from "../../State/cinema.initial";
import { CREATE_ORDER } from "../../mutations/cinema";
import { useHistory } from "react-router";
import { Box } from "@mui/system";
import ShowSnackbar from "../Utils/Snackbar";
import ShowBackdrop from "../Utils/Backdrop";
import { GET_ALL_SEATS } from "../../query/seats";

const Users = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const {
    data: allSeats,
    loading: loadingSeats,
    refetch: refetchSeats,
  } = useQuery(GET_ALL_SEATS);

  //для одного юзера передаем параметры
  // const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
  //   variables: { id: "61717235e1488ae8392bcd53" },
  // });

  // const [newUser] = useMutation(CREATE_USER);
  const [newOrder] = useMutation(CREATE_ORDER);

  const [success, toogleSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  let history = useHistory();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const addUser = (e) => {
    e.preventDefault();
    if (username == "" && age == "") {
      alert("Error");
      return;
    }
    ticketHolder(ticketHolder().concat({ username, age }));
    setUsername("");
    setAge("");
  };

  const getAll = (e) => {
    e.preventDefault();
    if (
      reservedSitsByUser().seats.length === 0 &&
      ticketHolder().length === 0
    ) {
      toogleSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    if (username == "" && age == "") {
      setOpenSnackbar(true);
    }
    if (reservedSitsByUser().seats.length === ticketHolder().length) {
      setOpenBackdrop(true);
      console.log(true);
      newOrder({
        variables: {
          input: {
            holders: ticketHolder(),
            seats: reservedSitsByUser().seats,
          },
        },
      });
      toogleSuccess(true);
      reservedSitsByUser({ seats: [] });
      ticketHolder([]);
      refetchSeats();
      refetch();
    } else if (ticketHolder().length > reservedSitsByUser().seats.length) {
      toogleSuccess(false);
      refetch();

      setTimeout(function () {
        history.push("/home");
      }, 1000);
    }
    setOpenBackdrop(false);
    setOpenSnackbar(true);
  };

  return (
    <div className={s.containerUsers}>
      <div className={s.innerContainer}>
        {reservedSitsByUser().seats.length > 0 ? (
          <div>
            You have reserved seats:
            {reservedSitsByUser().seats.map((seat) => seat + " ")}
          </div>
        ) : null}

        <p>Add you info</p>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <Input
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            type="number"
            placeholder="Age"
          />
          <div className="btns">
            <Button onClick={(e) => addUser(e)}>Create</Button>
            <Button onClick={(e) => getAll(e)}>Get</Button>
          </div>
        </Box>
        {ticketHolder().length > 0 && (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#9fb3c73b",
              padding: "10px",
            }}
            className={s.users}
          >
            {ticketHolder().map((user, i) => {
              return (
                <ListItem key={i} className={s.user}>
                  <Avatar></Avatar>
                  <ListItemText
                    primary={<span>{user.username}</span>}
                    secondary={
                      <span>
                        id: {i + 1} <br />{" "}
                        {user.age != "" ? user.age + " years old" : null}
                      </span>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
      <ShowSnackbar
        severity={success ? "success" : "info"}
        message={
          success === false ? "Pleace select seats" : "You have reserved seats!"
        }
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
      />
      <ShowBackdrop
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
      />
    </div>
  );
};

export default Users;
