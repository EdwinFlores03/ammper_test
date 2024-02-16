import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const LineChart = ({ data, filter }) => {

  const [category, setCategory] = useState([]);
  const [series, setSeries] = useState();

  const dataChart = () => {
    const rows = data;
    //   const startDate = new Date(filter.date_from);
    //   const endDate = new Date(filter.date_to);
    const startDate = moment(filter.date_from);
    const endDate = moment(filter.date_to);
    
    const filteredData = rows.filter(transaction => {
      const transactionDate = new Date(transaction.value_date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    
    const typesUnique = [...new Set(rows.map(transaction => transaction.type))];  

    let flagStarDate = startDate.clone();
    let monthsInRange = [];
    const categories = [];

    while (flagStarDate.isBefore(endDate) || flagStarDate.isSame(endDate, 'month')) {
        monthsInRange.push(moment(flagStarDate).format('YYYY-MM'));
        categories.push(flagStarDate.year()+'-'+monthNames[flagStarDate.month()]);
        flagStarDate.add(1, 'month');
    }

    let groupedSums = {}; // Inicializamos groupedSums como un objeto vacío

    // Iterando sobre cada tipo de transacción
    typesUnique.forEach((type, index) => {
        groupedSums[type] = {}; // Inicializar un objeto vacío para cada tipo
        // Iterar sobre cada mes en el rango
        monthsInRange.forEach(monthYear => {
            groupedSums[type][monthYear] = 0; // Inicializar la suma para cada mes
        });
    });
    
    // Iterando sobre las transacciones filtradas y calcular las sumas de montos
    filteredData.forEach((transaction, index) => {
        const type = transaction.type;
        const valueDate = new Date(transaction.value_date);
        const monthYear = `${valueDate.getFullYear()}-${(valueDate.getMonth() + 1).toString().padStart(2, '0')}`;
        const dateFormat = moment(transaction.value_date).format('YYYY-MM');

        groupedSums[type][dateFormat] += transaction.amount;
    });

    const dataResult = [];
    let i = 0;
    for (let key in groupedSums) {
        dataResult[i] = {};
        dataResult[i]['name'] = key;
        dataResult[i]['data'] = Object.entries(groupedSums[key]).map(([key, value]) => {
          // Si el valor es un número, redondearlo a dos decimales
          if (typeof value === 'number') {
            value = Math.round(value * 100) / 100;
          }
          return [key, value];
        });
        i++;
    }

    setCategory(categories);
    setSeries(dataResult);
  }

  useEffect(() => {
    dataChart();
  }, [data]);

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Ingresos y Egresos'
    },
    xAxis: {
      categories: category,//filteredData.map(item => item.name),
      title: {
        text: 'Mes'
      }
    },
    yAxis: {
      title: {
        text: 'Monto(MXN)'
      }
    },
    plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
  series: series
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
