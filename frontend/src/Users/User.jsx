import s from "./User.module.css";
import Input from "@mui/material/Input";
import { Avatar, Button, List, ListItem, ListItemText } from "@mui/material";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "../query/user";
import { CREATE_USER } from "../mutations/user";

const Users = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  // const { data, loading, error , refetch} = useQuery(GET_ALL_USERS, {pollInterval:1000});

  //для одного юзера передаем параметры
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: { id: "61717235e1488ae8392bcd53" },
  });

  const [newUser] = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className={s.containerUsers}>
      <form>
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
      </form>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#9fb3c73b",
          padding: "10px",
        }}
        className={s.users}
      >
        {users.map((user) => {
          return (
            <ListItem key={user.id} className={s.user}>
              <Avatar></Avatar>
              <ListItemText
                primary={<span>{user.username}</span>}
                secondary={
                  <span>
                    id: {user.id} <br /> {user.age} years old
                  </span>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Users;
