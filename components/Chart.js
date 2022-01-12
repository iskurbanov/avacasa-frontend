import axios from 'axios';
import { createChart } from 'lightweight-charts';
import { useCallback, useEffect } from 'react';

const Chart = () => {
  const chartProperties = {
    width: 1200,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondVisible: false
    }
  }

  useEffect(() => {
    // init();

    axios.get(`https://api.covalenthq.com/v1/43114/xy=k/traderjoe/tokens/address/0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd/transactions/?quote-currency=USD&format=JSON&key=ckey_docs`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  const init = useCallback(() => {
    const chart = createChart(document.getElementById("chart1"), chartProperties)

    const candleSeries = chart.addCandlestickSeries()
    fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`)
      .then(res => res.json())
      .then(data => {
        const cdata = data.map(d => {
          return { time: d[0] / 1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]) }
        })
        candleSeries.setData(cdata)
      })
      .catch(error => console.log(error))
  })

  return (
    <div className='p-4 mt-4'>
      <div id="chart1" />
    </div>
  )
}

export default Chart
