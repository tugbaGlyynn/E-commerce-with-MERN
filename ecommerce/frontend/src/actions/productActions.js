import axios from "axios";

import {
    ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const getProducts = (keyword='',currentPage = 1,price,category,rating=0) => async (dispatch) =>{
    try {
        dispatch({type:ALL_PRODUCTS_REQUEST})
        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}`
        if(category){
            link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`
        }
        const {data}= await axios.get(link)
        console.log(data)
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getProductsDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}= await axios.get(`/api/v1/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
// Clear Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
       type:CLEAR_ERRORS 
    })
    
}