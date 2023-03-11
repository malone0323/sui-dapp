import React, { Fragment, useRef } from 'react'
import ChartToken from '../Chart/ChartToken'
import { useEffect } from 'react';
import { useState } from 'react';
import { calculateTimeAgo } from '../../Lib/common';
import moment from 'moment/moment';
import { widget } from "../../charting_library/charting_library.esm"
import axios from 'axios';
import { io } from 'socket.io-client';

const SERVER_URL="";


// const getLanguageFromURL = () => {
//     const regex = new RegExp('[\\?&]lang=([^&#]*)');
    
//     // eslint-disable-next-line no-restricted-globals
//     const results = regex.exec(location.search);
//     return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

const lastBarsCache = new Map()
const channelToSubscription = new Map()

const TvChart = ({ token, dex, ...props }) => {
    const chartContainerRef = useRef()

    const dataFeed = React.useMemo(() => ({
        onReady: (callback) => {
            callback({
                supported_resolutions: ['1', '15', '1D', '1W', '1M'],
                exchanges: [
                    { value: '9inch', name: '9inch', desc: '9inch exchange' },
                ],
                symbols_types: [
                    { name: 'crypto', value: 'crypto' }
                ]
            })
        },
        searchSymbols: () => {
        },
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
            axios.get(`${SERVER_URL}/tokens/Pulsechain/${token}`)
                .then(async function ({ data: { tokenDetils: tokenDetails } }) {
                    // console.log(extension)
                    const symbolInfo = {
                        address: dex ? tokenDetails.pairAddresses[dex] : tokenDetails.tokenAddress,
                        ticker: tokenDetails.tokenSymbol,
                        name: tokenDetails.tokenName,
                        description: `${tokenDetails.tokenSymbol} / PLS`,
                        launchedAt: tokenDetails.launchedAt,
                        type: 'crypto',
                        session: '24x7',
                        timezone: 450,
                        dex,
                        exchange: dex ?? 'CoinQuest',
                        // logo_urls: [`${IPFS_GATEWAY_URL}${tokenDetails.tokenImage}`],
                        logo_urls: [`${SERVER_URL}/logo/${tokenDetails.tokenImage}`],
                        minmov: 1,
                        pricescale: 1e12,
                        // volumescale: 1e2,
                        has_intraday: true,
                        // visible_plots_set: tokenDetails.launchedAt ? 'ohlcv' : 'ohlc',
                        has_weekly_and_monthly: false,
                        supported_resolutions: ['1', '15', '1D', '1W', '1M'],
                        volume_precision: 2,
                        data_status: 'streaming',
                        // has_empty_bars: true,
                    };
                    onSymbolResolvedCallback(symbolInfo);
                }).catch(() => { })
        },
        getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
            const { from, to, firstDataRequest, countBack } = periodParams;
            if (from > 0) {
                axios.get(`${SERVER_URL}/trades/getChartData`, {
                    params: {
                        tokenAddress: symbolInfo.address,
                        interval: resolution,
                        from: symbolInfo.dex ? new Date(symbolInfo.launchedAt).getTime() / 1000 : from,
                        to,
                        countBack,
                        ...(firstDataRequest ? { first: 1 } : {}),
                        dex: symbolInfo.dex
                    }
                }).then(({ data }) => {
                    if (data == 'nodata') {
                        onHistoryCallback([], { noData: true })
                    } else {
                        const bars = data.map((d) => ({ ...d, time: d.time * 1000, volume: Number(d.volume) }))
                        if (firstDataRequest && bars.length) {
                            lastBarsCache.set(`${symbolInfo.exchange}:${symbolInfo.name}`, { ...bars[bars.length - 1] });
                        }
                        onHistoryCallback(bars, { noData: false })
                    }
                }).catch(ex => {
                    onErrorCallback(ex)
                })
            }
        },
        subscribeBars: (
            symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback
        ) => {
            if (symbolInfo.launchedAt && !symbolInfo.dex)
                return
            const lastDailyBar = lastBarsCache.get(`${symbolInfo.exchange}:${symbolInfo.name}`)
            const handler = {
                id: subscriberUID,
                callback: onRealtimeCallback,
            };
            let subscriptionItem = channelToSubscription.get(token);
            if (subscriptionItem) {
                // Already subscribed to the channel, use the existing subscription
                subscriptionItem.handlers.push(handler);
                return;
            }
            subscriptionItem = {
                subscriberUID,
                resolution,
                lastDailyBar,
                address: symbolInfo.address,
                dex: symbolInfo.dex,
                handlers: [handler],
            };
            channelToSubscription.set(token, subscriptionItem);
            // socket.emit('SubAdd', { address: symbolInfo.address, dex: symbolInfo.dex });
        },
        unsubscribeBars: (subscriberUID) => {
            const subscriptionItem = channelToSubscription.get(token);
            const handlerIndex = subscriptionItem.handlers
                .findIndex((handler) => handler.id === subscriberUID);

            if (handlerIndex !== -1) {
                // Remove from handlers
                subscriptionItem.handlers.splice(handlerIndex, 1);

                if (subscriptionItem.handlers.length === 0) {
                    // Unsubscribe from the channel if it is the last handler
                    channelToSubscription.delete(token);
                    // socket.emit('SubRemove', { address: subscriptionItem.address });
                }
            }
        },
    }), [])
// }), [token, dex])

    // const socket = React.useMemo(() => io(SERVER_URL, {
    //     autoConnect: true,
    //     reconnectionDelayMax: 1000,
    // }), [])

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         const item = channelToSubscription.get(token)
    //         if (item)
    //             socket.emit('SubAdd', { address: item.address, dex: item.dex })
    //     })
    //     socket.on('m', data => {
    //         const subscriptionItem = channelToSubscription.get(token);
    //         if (!subscriptionItem)
    //             return
    //         const items = data.split('\n').map((item) => {
    //             const [
    //                 tokenAddress,
    //                 timeStr,
    //                 tradePriceStr,
    //                 tradeVolumeStr,
    //             ] = item.split('~')
    //             if (tokenAddress != subscriptionItem.address)
    //                 return undefined
    //             return [
    //                 timeStr,
    //                 tradePriceStr,
    //                 tradeVolumeStr,
    //             ]
    //         }).filter(Boolean)

    //         if (items.length == 0)
    //             return

    //         const [
    //             timeStr,
    //             tradePriceStr,
    //             tradeVolumeStr,
    //         ] = items[0]

    //         const tradePrice = parseFloat(tradePriceStr);
    //         if (subscriptionItem === undefined) {
    //             return;
    //         }
    //         const lastDailyBar = subscriptionItem.lastDailyBar;
    //         // const nextDailyBarTime = lastDailyBar?.time ? lastDailyBar.time + subscriptionItem.resolution * 60000 : tradeTime;
    //         const tradeTime = Math.floor(Number(timeStr) / (subscriptionItem.resolution * 60)) * (subscriptionItem.resolution * 60000);
    //         const curTime = Math.floor(Date.now() / (subscriptionItem.resolution * 60000)) * (subscriptionItem.resolution * 60000);

    //         console.log('[socket] Message:', data, tradeTime, curTime, tradePriceStr);

    //         let bar;
    //         if (!lastDailyBar) {
    //             bar = {
    //                 time: curTime,
    //                 open: tradePrice,
    //                 high: tradePrice,
    //                 low: tradePrice,
    //                 close: tradePrice,
    //                 volume: Number(tradeVolumeStr ?? 0)
    //             };
    //         } else if (lastDailyBar.time < tradeTime) {
    //             bar = {
    //                 time: tradeTime,
    //                 open: lastDailyBar.close,
    //                 high: Math.max(lastDailyBar.close, tradePrice),
    //                 low: Math.min(lastDailyBar.close, tradePrice),
    //                 close: tradePrice,
    //                 volume: Number(tradeVolumeStr ?? 0)
    //             };
    //         } else {
    //             bar = {
    //                 ...lastDailyBar,
    //                 high: Math.max(lastDailyBar.high, tradePrice),
    //                 low: Math.min(lastDailyBar.low, tradePrice),
    //                 close: tradePrice,
    //                 volume: Number(tradeVolumeStr ?? 0)
    //             };
    //         }
    //         subscriptionItem.lastDailyBar = bar;

    //         // Send data to every subscriber of that symbol
    //         subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
    //     })
    //     return () => {
    //         socket.off('m')
    //     }
    // }, [socket, token])

    useEffect(() => {
        // if (!token || !dataFeed)
        //     return
        const widgetOptions = {
            symbol: token,
            // BEWARE: no trailing slash is expected in feed URL
            // tslint:disable-next-line:no-any
            datafeed: dataFeed, // new (window as any).Datafeeds.UDFCompatibleDatafeed(defaultProps.datafeedUrl),
            interval: '1',
            container: chartContainerRef.current,
            library_path: '/charting_library/',
            // locale: getLanguageFromURL() || 'en',
            disabled_features: [
                'use_localstorage_for_settings',
                'header_symbol_search',
                'header_compare',
                'header_undo_redo',
                'header_quick_search',
                'header_fullscreen_button',
                'header_indicators',
                'symbol_search_hot_key',
                'save_chart_properties_to_local_storage',
                'legend_context_menu',
                'legend_inplace_edit',
            ],
            enabled_features: [
                'show_exchange_logos',
                'show_symbol_logos',
                'show_symbol_logo_in_legend',
                'request_only_visible_range_on_reset',
                'iframe_loading_compatibility_mode',
            ],
            fullscreen: false,
            autosize: true,
            // studies_overrides: {
            //     'volume.': 15
            // },
            theme: 'dark',
            // custom_formatters: {
            //     priceFormatterFactory: (symbolInfo, minTick) => {
            //         return {
            //             format: (price, signPositive) => {
            //                 return priceFormatter(price, 18, false, false);
            //             }
            //         }
            //     },
            // }
        };

        const tvWidget = new widget(widgetOptions);

        return () => {
            tvWidget.remove();
        };
    }, []);
// }, [token, dataFeed]);

    return (
        <div ref={chartContainerRef} {...props} />
    );
}

export default TvChart


export const priceWithoutZero = (price) => {
    return String(price).replace(/\.(.*[^0])0+$/, ".$1").replace(/\.0+$/, "")
}

export const priceFormatter = (value, decimals = 18, willRemoveTail = true, hasUnits = false) => {
    const formatter = new Intl.NumberFormat('en-US')
    if(!value || value == 0)
        return '0'
    let unit = ''
    function addUnit(v) {
        if(!hasUnits)
            return v
        if(v > 1e9) {
            unit = 'B'
            return v / 1e9
        }
        if(v > 1e6) {
            unit = 'M'
            return v / 1e6
        }
        if(v > 1e3) {
            unit = 'K'
            return v / 1e3
        }
        return v
    }
    function removeTail(v) {
        return willRemoveTail ? priceWithoutZero(v) : v
    }
    const price = addUnit(Number(value))
    let fractions = 18
    if(Math.abs(price) > 1)
        fractions = 2
    if(Math.abs(price) > 0.0001)
        fractions = 6
    fractions = unit ? 2 : Math.min(decimals, fractions)
    const [upper, under] = price.toFixed(fractions).split('.')
    if(Number(upper) > 0 || fractions <= 6)
        return `${removeTail(`${formatter.format(Number(upper))}.${under ?? 0}`)}${unit}`
    const count = under.match(/0+/)?.[0].length ?? 0
    const subscripts = '₀₁₂₃₄₅₆₇₈₉'
    return removeTail(`${formatter.format(Number(upper))}.0${String(count).split('').map(n => subscripts[Number(n)]).join('')}${under.slice(count, count + 4)}`)
}