import styles from "./HeaderIn.module.css";

function HeaderIn() {
  const value = localStorage.getItem("user");
  const userData = value ? JSON.parse(value) : null;
  return (
    <header className={styles.headerIn}>
      <a href="">
        <span>AngoVaquinhas</span>
      </a>
      <nav style={{ display: "flex", gap: "10px" }}>
        <div className={styles.barra}>
          <input
            type="text"
            name=""
            placeholder="O que procuras?"
            id=""
            style={{
              border: "none",
              borderRight: "1px solid",
              padding: "8px 15px",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            }}
          />
          <button
            value="p"
            style={{
              border: "none",
              padding: "8px",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <a href="#">Explorar</a>
        <a href="#">Criar Vaquinha</a>
        <a href="/userProfile">{userData.email}</a>
        <a href="#">Sair</a>
      </nav>
    </header>
  );
}

export default HeaderIn;
