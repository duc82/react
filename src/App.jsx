import React, { useCallback, useState } from "react";
import MemberInfo from "./components/MemberInfo";
import Overlay from "./components/Overlay";
import Form from "./components/Form";
import Avatar from "./components/Avatar";
import anonymous from "./assets/anonymous.jpg";

const initialValue = {
  name: "",
  age: "",
  phone: "",
  birthPlace: "",
};

const currentMembers = JSON.parse(localStorage.getItem("rows")) || [];

const App = () => {
  const [members, setMembers] = useState(currentMembers);
  const [values, setValues] = useState(initialValue);
  const [isActiveSideBar, setIsActiveSideBar] = useState(false);
  const [action, setAction] = useState("add");
  const [aiId, setAiId] = useState(members[members.length - 1]?.id || 0);

  const handleChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!(values.name && values.age && values.birthPlace && values.phone)) {
        alert("Vui lòng nhập tất cả thông tin!");
        return;
      }
      const newValues = { ...values, id: aiId + 1 };
      setAiId((prev) => prev + 1);
      setMembers([...members, newValues]);
      localStorage.setItem("rows", JSON.stringify([...members, newValues]));
      setIsActiveSideBar(false);
      setValues(initialValue);
    },
    [aiId, members, values]
  );

  const deleteMember = useCallback(
    (id) => {
      const newMembers = members.filter((member) => member.id !== id);
      setMembers(newMembers);
      localStorage.setItem("rows", JSON.stringify(newMembers));
    },
    [members]
  );

  const showAddMember = () => {
    setAction("add");
    setIsActiveSideBar(true);
    setValues(initialValue);
  };

  const showUpdateMember = useCallback((row) => {
    setAction("update");
    setIsActiveSideBar(true);
    setValues(row);
  }, []);

  const updateMember = useCallback(
    (e) => {
      e.preventDefault();
      const indexMember = members.findIndex(
        (member) => member.id === values.id
      );
      const newMembers = [...members];
      newMembers[indexMember] = values;
      setMembers(newMembers);
      localStorage.setItem("rows", JSON.stringify(newMembers));
      setValues(initialValue);
      setIsActiveSideBar(false);
    },
    [members, values]
  );

  return (
    <div className="App">
      <h1 className="title">Thông tin thành viên</h1>
      <Avatar src={anonymous} alt="Anonymouse" />
      <div className="flex-end">
        <button className="btn" onClick={showAddMember}>
          Thêm thành viên
        </button>
      </div>

      <MemberInfo
        rows={members}
        deleteMember={deleteMember}
        showUpdateMember={showUpdateMember}
      />

      <Overlay
        active={isActiveSideBar}
        onClick={() => setIsActiveSideBar(false)}
      />
      <Form
        action={action}
        className={`${isActiveSideBar ? "active" : ""}`}
        id={values.id}
        name={values.name}
        age={values.age}
        birthPlace={values.birthPlace}
        phone={values.phone}
        onChange={handleChangeValue}
        onSubmit={action === "add" ? addMember : updateMember}
      />
    </div>
  );
};

export default App;
