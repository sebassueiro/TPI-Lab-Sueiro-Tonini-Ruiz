import React, { useEffect, useState } from "react";
import ListSales from "../listSales/ListSales";
import { useNavigate } from "react-router";
import useTranslation from "../../custom/useTranslation/useTranslation";
import FilteredSales from "../filteredSales/FilteredSales";

const ManageSales = () => {
  const [sales, setSales] = useState([]);
  const [emailSelected, setEmailSelected] = useState("Todos");
  const [salesFiltered, setSalesFiltered] = useState([]);

  const navigate = useNavigate();
  const translate = useTranslation();
  useEffect(() => {
    fetch("http://localhost:8000/sales", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((salesData) => {
        setSales(salesData);
        setSalesFiltered(salesData);
        console.log(salesData);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100  p-4">
      <h1>{translate("list_sales")}</h1>
      <div className="d-flex flex-column-end align-items-center justify-content-center h-100  p-4">
        <button
          className="m-2 btn btn-outline-dark"
          onClick={() => {
            navigate("/");
          }}
        >
          {translate("back_to_shop")}
        </button>
      </div>
      <FilteredSales
        emailSelected={emailSelected}
        setEmailSelected={setEmailSelected}
        sales={sales}
        setSalesFiltered={setSalesFiltered}
      />
      {sales.length === 0 ? (
        <h3 className="d-flex justify-content-center mx-auto px-4">
          {translate("no_sales")}
        </h3>
      ) : (
        <ListSales sales={salesFiltered} />
      )}
    </div>
  );
};

export default ManageSales;
