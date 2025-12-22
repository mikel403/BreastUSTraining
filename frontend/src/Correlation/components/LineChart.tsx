// LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Center, Heading } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register([CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip]);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill?: boolean;
      borderColor?: string;
    }[];
  };
  totalDesc: number;
  //   labels: string[];
  //   total:number[];
  // };
  title: string;
  pointData: { [key: string]: {[key: string]: number} };
}

const LineChart: React.FC<LineChartProps> = ({ data, title, totalDesc,pointData }) => {
  const options: ChartOptions<"line"> = {
    // ... other options
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          afterLabel: function (tooltipItem) {
            const labelcarac = tooltipItem.dataset.label;
            const labelbirads = tooltipItem.label;
            if (labelcarac){const additionalData = pointData[labelcarac][labelbirads]
              return additionalData !== undefined ? `Total: ${additionalData}` : '';
            };
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1,
      },
    },
  };
  const titleCap = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <Box mt={4} width="100%">
      {/* Assign an id to the container for the chart */}
      {/* <Box display={"flex"} justifyContent={"space-evenly"}> */}
      <Center>
        <h3>{titleCap}</h3>
        </Center>
        <Center>
        <p>(Number of descriptions: {totalDesc}) </p>
        </Center>
        
      {/* </Box> */}
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineChart;
