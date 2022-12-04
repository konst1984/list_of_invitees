import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);

  const onClickInvite = (id: number) => {
    if (invites.includes(id)) {
      const newInvites = invites.filter((_id) => _id !== id);
      setInvites(newInvites);
    } else setInvites((prevState) => [...prevState, id]);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://reqres.in/api/users");
      const resJson = await response.json();
      setUsers(resJson.data);
      setIsLoading(false);
    }
    fetchData()
      .catch((e) => {
        console.warn(e);
        alert("Data error");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClickSendInvites = () => setSuccess(!success);

  return (
    <div className="App">
      {success ? (
        <Success
          count={invites.length}
          onClickSendInvites={onClickSendInvites}
        />
      ) : (
        <Users
          items={users}
          count={invites.length}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearch={onChangeSearch}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
