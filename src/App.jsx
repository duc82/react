import React, { useState } from "react";
import MemberInfo from "./components/MemberInfo";
import Overlay from "./components/Overlay";
import Form from "./components/Form";

const initialValue = {
  id: 0,
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
  const [aiId, setAiId] = useState(initialValue.id);

  const handleChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addMember = (e) => {
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
  };

  const deleteMember = (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
    localStorage.setItem("rows", JSON.stringify(newMembers));
  };

  const showAddMember = () => {
    setAction("add");
    setIsActiveSideBar(true);
    setValues(initialValue);
  };

  const showUpdateMember = (row) => {
    setAction("update");
    setIsActiveSideBar(true);
    setValues(row);
  };

  const updateMember = (e) => {
    e.preventDefault();
    const indexMember = members.findIndex((member) => member.id === values.id);
    const newMembers = [...members];
    newMembers[indexMember] = values;
    setMembers(newMembers);
    localStorage.setItem("rows", JSON.stringify(newMembers));
    setValues(initialValue);
    setIsActiveSideBar(false);
  };

  return (
    <div className="App">
      <h1 className="title">Thông tin thành viên</h1>
      <div className="flex-center">
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
        className={`${isActiveSideBar ? "active" : ""}`}
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
