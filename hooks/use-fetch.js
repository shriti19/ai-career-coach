// hooks/use-fetch.js
"use client"
import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(undefined); // Reset data to its initial state
    setError(null);
  };

  return { data, loading, error, fn, setData, reset }; // Add the reset function to the returned object
};

export default useFetch;