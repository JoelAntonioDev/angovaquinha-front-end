import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <span>AngoVaquinhas</span>
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
        <a href="">Explorar</a>
        <a href="/signUp">Criar conta</a>
        <a href="/login">Entrar</a>
        <a href="">Criar Vaquinha</a>
      </nav>
    </header>
  );
}

export default Header;
