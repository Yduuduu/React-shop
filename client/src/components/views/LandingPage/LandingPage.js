/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
//import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {  Col, Card, Row, Carousel, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
//import Icon from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import { continents, price } from './Sections/Datas';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, []);

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success) {
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                } else{
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert("상품들을 가져오는데 실패 했습니다.")
            }
        })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
        
    })

    

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere </h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    
                </Col>
            </Row>

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>
            
            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
            }
            
        </div>
    )
}

export default LandingPage
