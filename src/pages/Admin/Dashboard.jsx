import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import 'primeicons/primeicons.css'; // Verifique se isso está corretamente instalado

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Verifique se o tema da variável está correto
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500") || '#0000FF', // Default color
            documentStyle.getPropertyValue("--yellow-500") || '#FFFF00', // Default color
            documentStyle.getPropertyValue("--green-500") || '#00FF00', // Default color
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400") || '#0000CC', // Default color
            documentStyle.getPropertyValue("--yellow-400") || '#CCCC00', // Default color
            documentStyle.getPropertyValue("--green-400") || '#00CC00', // Default color
          ],
        },
      ],
    };

    const options = {
      cutout: 60,
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h4>Gráfico de Teste</h4>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        style={{ height: '400px' }} // Ajuste a altura conforme necessário
      />
    </div>
  );
}

export default Dashboard;
