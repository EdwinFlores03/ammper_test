import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const categories = [
    'Transfers','Fees & Charges','Income & Payments','Credits & Loans','Investments & Savings','Home & Life','Bills & Utilities','Personal Shopping','Withdrawal & ATM','Food & Groceries','Deposits','Online Platforms & Leisure','Taxes','Transport & Travel'
];

const PieChart = ({ data, filter }) => {
    const [category, setCategory] = useState([]);
    const [series, setSeries] = useState();

    const dataChart = () => {

        const filteredData = data;
        const categoriesUnique = [...new Set(filteredData.map(transaction => transaction.category))]; 
        // const filteredData = rows.filter(transaction => {
        //   const transactionDate = new Date(transaction.value_date);
        //   return transactionDate >= startDate && transactionDate <= endDate;
        // });

        let groupedSums = {};
        // Iterando sobre cada tipo de category
        categoriesUnique.forEach((type, index) => {
            groupedSums[type] = {};
            groupedSums[type]['y'] = 0;
            groupedSums[type]['value'] = 0;
        });
        const amountTotal = filteredData.reduce((total, transaccion) => total + transaccion.amount, 0);
        const percent = (100 / amountTotal);

        filteredData.forEach((transaction, index) => {
            const type = String(transaction.category);
            groupedSums[type]['value'] += transaction.amount;
        });

        let i = 0;
        const dataResult = [];

        for (let key in groupedSums) {
            dataResult[i] = {};
            dataResult[i]['name'] = (key=="null")?'Sin clasificar':key;
            dataResult[i]['value'] = groupedSums[key]['value'];
            dataResult[i]['y'] = (Math.round((percent * groupedSums[key]['value']) * 100) / 100);
            i++;
        }

        setCategory(categoriesUnique);
        setSeries(dataResult);
    }

    useEffect(() => {
      dataChart();
    }, [data]);

    const options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Porcentaje por categoría'
      },
      tooltip: {
          valueSuffix: '%'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      series: [
          {
              name: 'Porcentaje',
              colorByPoint: true,
              data: series
          }
      ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
