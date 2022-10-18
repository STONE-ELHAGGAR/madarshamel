import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Chart.js Line Chart',
    },
    },
  }
  
  const ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
    {
        label: 'Dataset 1',
        data: [5, 6, 7,20,20,3,7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'Dataset 2',
        data: [42, 30, 1,77,25,0,50],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    ],
  }

const PieChart = ({options,ChartData}) => {
    return(
        <>
            <Pie
                options={options}
                data={ChartData}
            />
        </>
    )
}

export default PieChart;