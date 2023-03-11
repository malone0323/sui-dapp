import axios from "axios";
import { BACKEND_URL } from "../config";

export const uploadIpfsWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/meme/ipfs`, data)).data
        return res;
    }catch(err){
        return false;
    }
}

export const createMemeTokenWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/meme/createCoin`, data)).data
        return res;
    }catch(err){
        return false;
    }
}

export const getMemeTokenWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/coins?page=${data.page}&search=${data.search}`, data)).data
        return res;
    }catch(err){  
        return false;
    }     
}

export const getTopMemeWeb2 = async() => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/top`)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const getSpecificMemeTokenWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/coin/${data}`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const buyMemeTokenWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/meme/buy`, data)).data
        return res;
    }catch(err){
        return false;
    }
}

export const sellMemeTokenWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/meme/sell`, data)).data
        return res;
    }catch(err){
        return false;
    }
}

export const getSpecificMemeTokenTradeWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/trade/${data.address}?page=${data.page}`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const getSpecificMemeTokenTradeChartWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/tradeChart/${data.address}?interval=${data.interval}&from=${data.from}&to=${data.to}&countBack=${data.countBack}&first=${data.first}`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const getSpecificMemeHolderWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/meme/holder/${data.address}?page=${data.page}`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const sendMsgWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/chat/create`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const sendMsgLikeWeb2 = async(data) => {
    try{
        const res = (await axios.post(`${BACKEND_URL}/api/chat/like`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}

export const getMsgWeb2 = async(data) => {
    try{
        const res = (await axios.get(`${BACKEND_URL}/api/chat/trade/${data.address}?page=${data.page}`, data)).data
        return res;
    }catch(err){  
        return false;
    }
}


export const getPrice = async() => {
    try{
        const data = {
            "api_key": "hopapisKX7I30wPvo5YfN8Vx5P9r4cPh3nzVcS",
            "coin_type": "0x2::sui::SUI"
        }
        const res = (await axios.post(`https://d2getbh8qk7p99.cloudfront.net/api/v2/price`, data)).data
        return res;
    }catch(err){  
        return 0;
    }
}






