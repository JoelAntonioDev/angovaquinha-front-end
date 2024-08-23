import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import CardVaquinha from "../../components/CardVaquinha";

function Explorar() {
  const [vaquinhas, setVaquinhas] = useState([]);

  useEffect(() => {
    fetch("/api/get-vaquinhas")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setVaquinhas(data.data); // Armazena as vaquinhas no estado
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <HeaderIn />
      <h1>EXPLORAR...</h1>
      {vaquinhas.map((vaquinha, index) => {
        const imagePath = vaquinha.caminhoImagem;
        // Extrai a parte do caminho a partir de "imagens"
        const relativeImagePath = imagePath.substring(
          imagePath.indexOf("imagens")
        );
        // Constrói a URL da imagem
        const imageUrl = `http://localhost:8080/${relativeImagePath.replace(
          "\\",
          "/"
        )}`;

        return (
          <div key={index} style={{ marginBottom: "15px" }}>
            <CardVaquinha
              id={vaquinha.id}
              titulo={vaquinha.titulo}
              descricao={vaquinha.descricao}
              objectivo={vaquinha.quantia}
              dataCriacao={vaquinha.dataCriacao}
              foto={imageUrl}
            />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default Explorar;
