import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { barChartData, getChartData } from "./chartData";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [token, setToken] = useState<string | null>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const jwt_token = localStorage.getItem('jwt_token');
      setToken(jwt_token)
      const data = await getChartData();
      if (data) {
        setChartData(data);
      }
    };

    fetchData();
  }, [setChartData]);

  const options = {
    responsive: true,
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!chartData && token) {
    return <div className="text-center">Loading...</div>;
  }

  console.log("Chart Data", chartData);

  return (
    <Bar
      className="mx-2 sm:ml-96 sm:mr-96 sm:mb-4"
      options={options}
      data={token ? chartData : barChartData}
    />
  );
};

