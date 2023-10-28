import { useState } from "react";
import "./ListUser.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const ListUsers = ({ users, deleteUserHandler }) => {
  const [isHovered, setIsHovered] = useState(false);
  const translate = useTranslation();
  return (
    <div className="d-flex  flex-column align-items-center w-100">
      {users.length === 0 ? (
        <h3 className="d-flex justify-content-center mx-auto px-4">
          {translate("no_user_filter")}
        </h3>
      ) : (
        <table className="table table-hover mx-auto text-center ">
          <thead>
            <tr>
              <th>Id</th>
              <th>{translate("name")}</th>
              <th>{translate("lastname")}</th>
              <th>Email</th>
              <th>{translate("password")}</th>
              <th>{translate("type_of_user")}</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.userType}</td>
                <td>
                  <div className="button-container">
                    {user.userType !== "superAdmin" && (
                      <button
                        id="tacho"
                        className={`button ${isHovered ? "hovered" : ""}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <span onClick={() => deleteUserHandler(user.id)}>
                          🗑️
                        </span>
                      </button>
                    )}

                    {isHovered && (
                      <div className="hover-text">
                        {translate("wish_delete")}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default ListUsers;
