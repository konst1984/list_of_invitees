import React from "react";
import success from "../images/success.svg";

interface ISuccess {
  count: number;
  onClickSendInvites: () => void;
}

export const Success = ({ count, onClickSendInvites }: ISuccess) => {
  return (
    <div className="success-block">
      <img src={success} alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button className="send-invite-btn" onClick={onClickSendInvites}>
        Назад
      </button>
    </div>
  );
};
