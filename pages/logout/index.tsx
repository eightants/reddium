import { GetServerSideProps } from "next";
import React from "react";
import Cookies from "cookies";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  cookies.set("token", "");
  res.statusCode = 302;
  res.setHeader("Location", `/`);
  res.end();
  return {
    props: {}
  };
};

const LogoutPage = () => <div></div>;

export default LogoutPage;
