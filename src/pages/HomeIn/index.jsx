import React from "react";
import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import styles from "./HomeIn.module.css";
function HomeIn() {
  const value = localStorage.getItem("user");
  const user = value ? JSON.parse(value) : null;

  return (
    <div>
      <HeaderIn />
      <div className={styles.container_home_in}>
        <h1>Welcome Home</h1>
        {user ? (
          <div>
            <p>User ID: {user.id}</p>
            <p>User Name: {user.nome}</p>
            <p>User Email: {user.email}</p>
            {/* Acesse outras propriedades conforme necessário */}
          </div>
        ) : (
          <p>No user data found</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HomeIn;
