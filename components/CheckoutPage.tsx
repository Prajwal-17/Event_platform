"use client"

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { CheckoutProps } from "@/lib/types";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckoutPage = ({ amount, eventId, userId }: CheckoutProps) => {

  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-paymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false);
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,

      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}&eventId=${eventId}&userId=${userId}`
      }
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      router.push("/")
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return <div>Loading....</div>
  }

  return (<>
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button disabled={!stripe || !elements} className="w-full bg-black text-white">
        {loading ? "Processing " : `Pay${amount}`}
      </button>
    </form>
  </>)
}

export default CheckoutPage