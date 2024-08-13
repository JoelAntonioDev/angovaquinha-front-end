import React from "react";

import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <a className="linkFooter" href="/employer">
              <p>AngoVaquinhas info</p>
            </a>
            <a className="linkFooter" href="/healthPlan">
              <p>Contribua no AngoVaquinhas</p>
            </a>
            <a className="linkFooter" href="/individual">
              <p>Baixe o aplicativo</p>
            </a>
            <a className="linkFooter" href="/individual">
              <p>Sobre Nós</p>
            </a>
            <a className="linkFooter" href="/individual">
              <p>Contacte-nos</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <a className="linkFooter" href="/resource">
              <p>Carreiras</p>
            </a>
            <a className="linkFooter" href="/resource">
              <p>Blogue</p>
            </a>
            <a className="linkFooter" href="/resource">
              <p>Ajuda e Suporte</p>
            </a>
            <a className="linkFooter" href="/resource">
              <p>Afiliado</p>
            </a>
            <a className="linkFooter" href="/resource">
              <p>Investidores</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <a className="linkFooter" href="/employer">
              <p>Termos de uso</p>
            </a>
            <a className="linkFooter" href="/employer">
              <p>Política de privacidade</p>
            </a>
            <a className="linkFooter" href="/employer">
              <p>Declaração de acessibilidade</p>
            </a>
            <a className="linkFooter" href="/employer">
              <p>Mapa do site</p>
            </a>
            <a className="linkFooter" href="/employer">
              <p>Declaração de cookies</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <div className="idioma">
              <i className="pi pi-globe"> Idioma</i>
            </div>
            <div className="socialmedia">
              <p>
                <i className="pi pi-facebook"></i>
              </p>
              <p>
                <i className="pi pi-github"></i>
              </p>
              <p>
                <i className="pi pi-linkedin"></i>
              </p>
              <p>
                <i className="pi pi-instagram"></i>
              </p>
            </div>
            <div
              className="barra-pesquisa"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <input
                type="text"
                placeholder="Pesquisar"
                className="search-bar"
              />
              <button style={{ marginLeft: "8px", color: "#666666" }}>
                search
              </button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#666666",
                marginRight: "20px",
              }}
            >
              <span style={{ color: "#FFF" }}>AngoVaquinhas</span>
            </h1>
          </div>

          <div className="sb__footer-below-links" style={{ color: "white" }}>
            @{new Date().getFullYear()} AngoVaquinhas. Todos os Direitos
            Reservados
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
