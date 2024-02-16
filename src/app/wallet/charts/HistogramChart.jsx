import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const HistogramChart = ({ data, filter }) => {
    const [category, setCategory] = useState([]);
    const [series, setSeries] = useState();
  
    const dataChart = () => {
      const filteredData = data;
  
    //   const startDate = new Date(filter.date_from);
    //   const endDate = new Date(filter.date_to);
      const startDate = moment(filter.date_from);
      const endDate = moment(filter.date_to);
      const categoriesUnique = [...new Set(filteredData.map(transaction => transaction.category))]; 
      
    //   filteredData = rows.filter(transaction => {
    //     const transactionDate = new Date(transaction.value_date);
    //     return transactionDate >= startDate && transactionDate <= endDate;
    //   });      
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
        categoriesUnique.forEach((type, index) => {
            groupedSums[type] = {}; // Inicializar un objeto vacío para cada tipo
            // Iterar sobre cada mes en el rango
            monthsInRange.forEach(monthYear => {
                groupedSums[type][monthYear] = 0; // Inicializar la suma para cada mes
            });
        });
        
        // Iterando sobre las transacciones filtradas y calcular las sumas de montos
        filteredData.forEach((transaction, index) => {
            const type = transaction.category;
            const dateFormat = moment(transaction.value_date).format('YYYY-MM');

            groupedSums[type][dateFormat] += transaction.amount;
        });

        const dataResult = [];
        let i = 0;
        for (let key in groupedSums) {
            dataResult[i] = {};
            dataResult[i]['name'] = (key=="null")?'Sin clasificar':key;
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
        type: 'column'
        },
        title: {
            text: 'Gastos por categoria (comparativo)'
        },
        xAxis: {
        categories: category,
        title: {
            text: 'Mes'
        }
        },
        yAxis: {
            title: {
                text: 'Numero de transacciones'
            }
        },
        series: series
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HistogramChart;
