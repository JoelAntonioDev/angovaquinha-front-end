import styles from "./HeaderIn.module.css";
import { Menubar } from "primereact/menubar";
function HeaderIn() {
  const value = localStorage.getItem("user");
  const userData = value ? JSON.parse(value) : null;
  const handleLogout = () => {
    console.log("entrou");
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
  const items = [
    {
      label: (
        <>
          <a href="">
            <span>AngoVaquinhas</span>
          </a>
        </>
      ),
      icon: "pi pi-home",
    },
    {
      label: (
        <>
          <a href="#">Explorar</a>
        </>
      ),
      icon: "pi pi-star",
    },
    {
      label: (
        <>
          <a href="#">Criar Vaquinha</a>
        </>
      ),
      icon: "pi pi-search",
    },
    {
      label: (
        <>
          <a href="/userProfile">UserEmail</a>
        </>
      ),
      icon: "pi pi-search",
    },
    {
      label: (
        <>
          <a href="#" onClick={handleLogout}>
            Sair
          </a>
        </>
      ),
      icon: "pi pi-search",
    },
  ];
  return (
    <>
      <header className={styles.headerIn}>
        <a href="">
          <span>AngoVaquinhas</span>
        </a>
        <nav style={{ display: "flex", gap: "10px" }}>
          <a href="#">Explorar</a>
          <a href="#">Criar Vaquinha</a>
          <a href="/userProfile">{userData.email}</a>
          <a href="#">Sair</a>
        </nav>
      </header>
      <div className="card" style={{ backgroundColor: "red" }}>
        <Menubar model={items} />
      </div>
    </>
  );
}

export default HeaderIn;
