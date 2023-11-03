import React from "react";
import useTranslation from "../../custom/useTranslation/useTranslation";

const FilteredSales = ({
  emailSelected,
  setEmailSelected,
  sales,
  setSalesFiltered,
}) => {
  const translate = useTranslation();

  const emailHandler = (event) => {
    setEmailSelected(event.target.value);
  };

  const selectHandler = () => {
    const salesFilter = filterSalesByEmail(sales, emailSelected);
    setSalesFiltered(salesFilter);
  };

  const filterSalesByEmail = (sales, emailSelected) => {
    return emailSelected === "Todos"
      ? sales
      : sales.filter((sale) => sale.email === emailSelected);
  };
  return (
    <div>
      <div className="w-100">
        <div className="border rounded p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <label style={{ width: "330px" }}>{translate("select_email")}</label>
              <select
                className="mr-2 form-select"
                onChange={emailHandler}
                value={emailSelected}
              >
                <option value="Todos">{translate("all_email")}</option>
                {sales
                  .map((sale) => sale.email)
                  .filter(
                    (email, index, emails) => emails.indexOf(email) === index
                  )
                  .map((uniqueEmail, index) => (
                    <option key={index} value={uniqueEmail}>
                      {uniqueEmail}
                    </option>
                  ))}
              </select>
            </div>
            <button
              className="ml-3 btn btn-outline-dark"
              onClick={selectHandler}
            >
              {translate("filter")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredSales;
