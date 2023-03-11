import React, { Fragment } from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'

const TradingChart = () => {
    return (
        <Fragment>
            <div style={{ height: "600px", width: "100%" }}>
                <AdvancedRealTimeChart
                    symbol="SALTUSD" // Ganti simbol jika diperlukan
                    theme="dark" // Tema gelap seperti gambar kedua
                    autosize
                    interval="5" // Interval 5 menit
                    style={1} // Style candlestick
                    toolbar_bg="#1f1f1f" // Background toolbar sesuai tema gelap
                    // backgroundColor="#1f1f1f"
                    allow_symbol_change={false}
                    hide_side_toolbar={false}
                    custom_indicators={true}
                    container_id="tradingview_widget"
                    withdateranges={false}
                    hideWatermark={true}
                    is
                    locale="en"
                    overrides={{
                        // Customisasi warna candlestick
                        "mainSeriesProperties.candleStyle.upColor": "#00FF00", // Warna hijau untuk candle naik
                        "mainSeriesProperties.candleStyle.downColor": "#FF0000", // Warna merah untuk candle turun
                        "mainSeriesProperties.candleStyle.borderUpColor": "#00FF00",
                        "mainSeriesProperties.candleStyle.borderDownColor": "#FF0000",
                        "mainSeriesProperties.candleStyle.wickUpColor": "#00FF00",
                        "mainSeriesProperties.candleStyle.wickDownColor": "#FF0000",
                        // Background chart
                        "paneProperties.background": "#121212",
                        "paneProperties.vertGridProperties.color": "#1f1f1f",
                        "paneProperties.horzGridProperties.color": "#1f1f1f",
                        "scalesProperties.textColor": "#CCCCCC",
                    }}
                />
            </div>
        </Fragment>
    )
}

export default TradingChart
