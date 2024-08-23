import styles from "./HeaderIn.module.css";
import { Avatar } from "primereact/avatar";
function HeaderIn() {
  const value = localStorage.getItem("user");
  const userData = value ? JSON.parse(value) : null;
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header className={styles.headerIn}>
        <a href="/home">
          <span>AngoVaquinhas</span>
        </a>
        <nav style={{ display: "flex", gap: "10px" }}>
          <a href="/explorar">Explorar</a>
          <a href="/cadastroVaquinha">Criar Vaquinha</a>

          <a href="/userProfile">
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
              className="mr-2"
              size="large"
              shape="circle"
            />
            {userData.email}
          </a>
          <a onClick={handleLogout}>Sair</a>
        </nav>
      </header>
    </>
  );
}

export default HeaderIn;
