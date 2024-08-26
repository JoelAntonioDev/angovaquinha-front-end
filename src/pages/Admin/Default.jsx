import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import "primeicons/primeicons.css";
import { Chart } from "primereact/chart";

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
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
    setChartData(data);
    setChartOptions(options);
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
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
                <li>Usuários</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.segunda_linha_b}>Gráfico de vaquinhas</div>
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
