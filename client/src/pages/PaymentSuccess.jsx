import { useEffect } from "react";
import api from "../api";

export default function PaymentSuccess() {

  useEffect(() => {

    api.post("/api/payment/success");

  }, []);

  return (
    <h1 style={{textAlign:"center"}}>
      Payment Successful 🎉
    </h1>
  );

}