import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import "primeicons/primeicons.css";
import { Chart } from "primereact/chart";

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});
  const [qtdUsuario, setQtdUsuario] = useState(0);
  const [qtdVaquinhas, setQtdVaquinhas] = useState(0);
  function obterQtdVaquinha(){
    fetch("/api/get-qtd-vaquinhas", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log( data);
          setQtdVaquinhas(data.data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
  }
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    obterQtdVaquinha()
    fetch("/api/get-qtd-usuarios", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log( data);
          setQtdUsuario(data.data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [qtdUsuario, 2, 1],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: 60, // Numeric value for cutout percentage
    };
    const chartData2 = {
      labels: ["A", "B", "C","D"],
      datasets: [
        {
          label: "Vaquinhas",
          data: [200, 50, 10,8],
          backgroundColor: [
            getComputedStyle(document.documentElement).getPropertyValue("--blue-500"),
            getComputedStyle(document.documentElement).getPropertyValue("--yellow-500"),
            getComputedStyle(document.documentElement).getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            getComputedStyle(document.documentElement).getPropertyValue("--blue-400"),
            getComputedStyle(document.documentElement).getPropertyValue("--yellow-400"),
            getComputedStyle(document.documentElement).getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
          },
          grid: {
            drawBorder: false
          }
        }
      }
    };
    setChartData(data);
    setChartOptions(options);
    setChartData2(chartData2);
    setChartOptions2(options2);
  }, []);

  return (
    <div className={styles.container_default}>
      <div className={styles.primeira_linha}>
        <div className={styles.primeira_linha_left}>
          <div>
            <h4>Joel António</h4>
            Seu último login: 21h atrás em Angola.
          </div>
        </div>
        <div className={styles.primeira_linha_right}>
          <div className={styles.filtroB}>
            <i className="pi pi-calendar"></i> Last 7 days
          </div>
          <div className={styles.filtroC}>
            <i className="pi pi-file-arrow-up"></i> Export
          </div>
          <div className={styles.filtroD}>
            <i className="pi pi-info-circle"></i> Info
          </div>
        </div>
      </div>

      <div className={styles.segunda_linha}>
        <div className={styles.segunda_linha_a}>
          Gráfico de usuários
          <div className={styles.container_grafico}>
            <div className={styles.grafico}>
              <div
                style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
              >
                <Chart
                  type="doughnut"
                  data={chartData}
                  optionss={chartOptions}
                />
              </div>
            </div>
            <div>
              <ul>
                <li>Masculino</li>
                <li>Feminino</li>
                <li>Por faixa etária</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.segunda_linha_b}>
          Gráfico de vaquinhas
          <div className={styles.container_grafico}>
            <div className={styles.grafico}>
              <div
                  style={{width: "100%", maxWidth: "600px", margin: "0 auto"}}
              >
                <Chart
                    type="bar"
                    data={chartData2}
                    options={chartOptions2}
                    style={{maxHeight:"150px"}}
                />
              </div>
            </div>

          </div></div>
        <div className={styles.segunda_linha_c}>Gráfico de contribuições</div>
      </div>

      <div className={styles.terceira_linha}>
        <div className={styles.terceira_linha_a}>
          Histórico de contribuições por províncias
          <div className={styles.container_grafico}>
            <div>
              <ul>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.terceira_linha_b}>
          Gráfico de vaquinhas por províncias
        </div>
        <div className={styles.terceira_linha_c}>Totais arrecadados</div>
      </div>

      <div className={styles.quarta_linha}>
        <div className={styles.quarta_linha_a}>
          Histórico de contribuições por províncias
          <div className={styles.container_grafico}>
            <div>
              <ul>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
