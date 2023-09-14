import { useEffect, useState, useRef } from "react";
import axios from "axios";

const codeParam = new URLSearchParams(window.location.search).get("code");

export default function useAuth() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const callRef = useRef(false);

  useEffect(() => {
    if (!codeParam || callRef.current) return;
    callRef.current = true;
    axios
      .post("http://localhost:3001/login", {
        code: codeParam,
      })
      .then((res) => {
        console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        //window.history.pushState({}, "", "/dashboard");
      })
      .catch((err) => {
        console.log(err);
        window.location = "/";
      });
  }, [codeParam]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    console.log("ref-enter");
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log("refresh");
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
