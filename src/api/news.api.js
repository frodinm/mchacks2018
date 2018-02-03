import axios from 'axios'
const baseURL = "https://newsapi.org/v2"
const apiKey = "96a11371e51c47cebfce20c93b9a8b8c"


export const getTopNewsHeadlines = () =>{
    return axios.request({
        method:"get",
        baseURL:baseURL,
        url: `/top-headlines?sources=crypto-coins-news&apiKey=${apiKey}`
    })
}