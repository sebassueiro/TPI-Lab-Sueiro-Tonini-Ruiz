import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  const backMainPageHandler = () => {
    navigate("/");
  };
  return (
    <div className="text-center">
      <h2 className="my-4">La pagina solicitada no fue encontrada</h2>
      <Button onClick={backMainPageHandler}>Volver a la tienda</Button>
    </div>
  );
};

export default PageNotFound;
