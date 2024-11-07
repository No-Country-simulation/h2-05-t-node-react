import { useEffect, useState } from "react";
import Container from "../../../components/common/Container";
import chartData from '../../../utils/chartData.json';
import chartDataTwo from '../../../utils/chartDataTwo.json';
import chartDataThree from '../../../utils/chartDataThree.json'; // Importa el nuevo JSON
import chartOptions from '../../../utils/chartOptions.json';
import chartOptionsTwo from '../../../utils/chartOptionsTwo.json';
import { Chart } from "primereact/chart";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import ButtonSolid from "../../../components/common/ButtonSolid";
import ButtonOutline from "../../../components/common/ButtonOutline";

const PlayerToken = () => {
  const [data, setData] = useState({});
  const [dataTwo, setDataTwo] = useState({});
  const [dataThree, setDataThree] = useState({});
  const [chartOptionsState, setChartOptionsState] = useState({});
  const [chartOptionsStateTwo, setChartOptionsStateTwo] = useState({});
  const [chartOptionsStateThree, setChartOptionsStateThree] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    setData(chartData);
    setDataTwo(chartDataTwo);
    setDataThree(chartDataThree); // Establece los datos para el gráfico 3

    const options = {
      ...chartOptions,
      scales: {
        x: {
          ...chartOptions?.scales?.x,
          title: {
            ...chartOptions?.scales?.x.title,
            color: textColor
          },
          ticks: {
            ...chartOptions?.scales?.x.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptions.scales.x.grid,
            color: surfaceBorder
          }
        },
        y: {
          ...chartOptions?.scales?.y,
          title: {
            ...chartOptions?.scales?.y.title,
            color: textColor
          },
          ticks: {
            ...chartOptions?.scales?.y.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptions.scales.y.grid,
            color: surfaceBorder
          },
          min: 0,
          max: 200000 // Ajustar el máximo si es necesario
        }
      },
      plugins: {
        tooltip: {
          // Habilitar tooltip para mostrar datos apilados
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
            }
          }
        },
        legend: { // Asegúrate de que esta opción está aquí para desactivar la leyenda
          display: false
        }
      }
    };

    const optionsTwo = {
      ...chartOptionsTwo,
      scales: {
        x: {
          ...chartOptionsTwo.scales.x,
          title: {
            ...chartOptionsTwo.scales.x.title,
            color: textColor
          },
          ticks: {
            ...chartOptionsTwo.scales.x.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptionsTwo.scales.x.grid,
            color: surfaceBorder
          }
        },
        y: {
          ...chartOptionsTwo.scales.y,
          title: {
            ...chartOptionsTwo.scales.y.title,
            color: textColor
          },
          ticks: {
            ...chartOptionsTwo.scales.y.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptionsTwo.scales.y.grid,
            color: surfaceBorder
          }
        }
      }
    };

    const optionsThree = {
      ...chartOptions,
      scales: {
        x: {
          ...chartOptions?.scales?.x,
          title: {
            display: true, // Asegúrate de que el título se muestre
            text: 'Año', // Título del eje X
            color: textColor
          },
          ticks: {
            ...chartOptions.scales.x.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptions.scales.x.grid,
            color: surfaceBorder
          }
        },
        y: {
          ...chartOptions.scales.y,
          title: {
            display: true, // Asegúrate de que el título se muestre
            text: 'Tokens liberados', // Título del eje Y
            color: textColor
          },
          ticks: {
            ...chartOptions.scales.y.ticks,
            color: textColorSecondary
          },
          grid: {
            ...chartOptions.scales.y.grid,
            color: surfaceBorder
          },
          min: 0,
          max: 10000 // Ajustar el máximo si es necesario
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
            }
          }
        },
        legend: {
          display: false // Desactivar la leyenda
        }
      }
    };

    setChartOptionsState(options);
    setChartOptionsStateTwo(optionsTwo);
    setChartOptionsStateThree(optionsThree);
  }, []);

  return (
    <Container className="w-full mt-3">
      <div className="flex items-center justify-center gap-5 mb-5">
        <ButtonSolid className='w-[130px]'>Compra</ButtonSolid>
        <ButtonOutline className='w-[130px]'>Venta</ButtonOutline>
      </div>

      <div className="">
        <div className="pb-2 font-medium ">
          {/* GRAFICO 1 */}
          <div>
            <h2 className="text-black mt-2">Liberación Acumulada del Token Anual</h2>
            <div className="card mt-3">
              <Chart type="line" data={data} options={chartOptionsState} />
            </div>
          </div>

          {/* GRAFICO 2 */}
          <div>
            <h2 className="text-black mt-2">Liberación de Tokens Anual</h2>
            <div className="card mt-3">
              <Chart type="line" data={dataTwo} options={chartOptionsStateTwo} />
            </div>
          </div>

          {/* GRAFICO 3 - Gráfico de barras apiladas */}
          <div>
            <h2 className="text-black mt-2">Tokens Liberados vs. Quemados</h2>
            <div className="card mt-3">
              <Chart type="bar" data={dataThree} options={{ ...chartOptionsStateThree, scales: { ...chartOptionsStateThree?.scales, y: { ...chartOptionsStateThree?.scales?.y, stacked: true }, x: { ...chartOptionsStateThree?.scales?.x, stacked: true } } }} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default PlayerToken