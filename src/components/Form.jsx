import React, { memo } from "react";

const Form = ({
  action,
  name,
  age,
  birthPlace,
  phone,
  onChange,
  onSubmit,
  className,
}) => {
  return (
    <form className={`modal ${className}`} onSubmit={onSubmit}>
      {" "}
      <div className="input-group">
        <label htmlFor="name">Tên</label>
        <input type="text" name="name" value={name} onChange={onChange} />
      </div>
      <div className="input-group">
        <label htmlFor="age">Tuổi</label>
        <input
          type="number"
          name="age"
          value={age}
          min={1}
          max={200}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="birthPlace">Nơi sinh</label>
        <input
          type="text"
          name="birthPlace"
          value={birthPlace}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="phone">Số điện thoại</label>
        <input type="text" name="phone" value={phone} onChange={onChange} />
      </div>
      <div className="flex-center">
        <button className="btn">
          {action === "add" ? "Thêm thành viên" : "Sửa thành viên"}
        </button>
      </div>
    </form>
  );
};

export default memo(Form);
