import React, { memo } from "react";

const MemberInfo = ({ rows, deleteMember, showUpdateMember }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID thành viên</th>
          <th>Họ và tên</th>
          <th>Tuổi</th>
          <th>Nơi sinh</th>
          <th>Số điện thoại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          return (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.birthPlace}</td>
              <td>{row.phone}</td>
              <td>
                <div className="action">
                  <button className="btn" onClick={() => showUpdateMember(row)}>
                    Sửa
                  </button>
                  <button className="btn" onClick={() => deleteMember(row.id)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(MemberInfo);
