import React from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";

const FilteredUsers = ({
  typeUserSelected,
  setTypeUserSelected,
  users,
  setUsersFiltered,
}) => {
  const translate = useTranslation();

  const typeHandler = (event) => {
    setTypeUserSelected(event.target.value);
  };

  const selectHandler = () => {
    const usersFilter = filterUsersByType(users, typeUserSelected);
    setUsersFiltered(usersFilter);
  };

  const filterUsersByType = (users, typeUserSelected) => {
    return typeUserSelected === "Todos"
      ? users
      : users.filter((user) => user.userType === typeUserSelected);
  };
  return (
    <div className="w-100">
      <div className="border rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <label style={{ width: "330px" }}>
              {translate("select_type_users")}:
            </label>
            <select
              className="mr-2 form-select"
              onChange={typeHandler}
              value={typeUserSelected}
            >
              <option value="Todos">{translate("all_users")}</option>
              <option value="admin">{translate("admins")}</option>
              <option value="client">{translate("clients")}</option>
            </select>
          </div>
          <button onClick={selectHandler} className="ml-3 btn btn-outline-dark">
            {translate("filter")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilteredUsers;
