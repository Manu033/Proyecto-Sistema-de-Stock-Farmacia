import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Content from "../components/layout/Content";

function AdminPage() {
  return (
    <>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default AdminPage;
