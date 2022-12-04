import React from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export interface IItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IUsers {
  items: IItem[];
  isLoading: boolean;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  invites: Array<number>;
  onClickInvite: (id: number) => void;
  onClickSendInvites: () => void;
  count: number;
}

export const Users = ({
  items,
  isLoading,
  onChangeSearch,
  searchValue,
  invites,
  onClickInvite,
  onClickSendInvites,
  count,
}: IUsers) => {
  const filterItems = items.filter((el) => {
    const fullName = `${el.first_name} ${el.last_name}`.toLowerCase();
    const searchValueLowerCase = searchValue.toLowerCase();
    return (
      fullName.includes(searchValueLowerCase) ||
      el.email.toLowerCase().includes(searchValueLowerCase)
    );
  });

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={searchValue}
          onChange={onChangeSearch}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {filterItems.map((el) => (
            <User
              onClickInvite={onClickInvite}
              isInvited={invites.includes(el.id)}
              key={el.id}
              {...el}
            />
          ))}
        </ul>
      )}
      <button
        onClick={onClickSendInvites}
        className="send-invite-btn"
        disabled={!Boolean(count)}
        aria-disabled={!Boolean(count)}
      >
        Отправить приглашение
      </button>
    </>
  );
};
