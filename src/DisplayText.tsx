import React, { useState, FC } from "react";
import UserTodos from "./UserTodos";

const DisplayText: FC = () => {
  const [txt, setTxt] = useState("");
  const [todoControl, setTodoControl] =
    useState<ReturnType<typeof UserTodos>>();

  const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxt(e.target.value);
  };
  const onClickShowMsg = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setTodoControl(null);
    setTodoControl(<UserTodos userName={txt} />);
  };

  return (
    <form>
      <div>
        <label>Enter your name</label>
      </div>
      <div>
        <input data-testid="user-input" value={txt} onChange={onChangeTxt} />
      </div>
      <div>
        <button data-testid="input-submit" onClick={onClickShowMsg}>
          Show Message
        </button>
      </div>
      {todoControl}
    </form>
  );
};

export default DisplayText;
