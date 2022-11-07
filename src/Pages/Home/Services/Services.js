import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [count, setCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [perPageData, setPerPageDate] = useState(2);

    const pages = Math.ceil(count / perPageData);

    console.log(pages)
    useEffect( () =>{
        fetch(`http://localhost:5000/services?pageNumber=${pageNumber}&perPageData=${perPageData}`)
        .then(res =>res.json())
            .then(data => {
                setServices(data.services)
                setCount(data.count)
            })
    }, [pageNumber,perPageData])
    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
            <div className='pagination  mb-20 text-center mt-7'>
                <h1 className='my-5 text-3xl'>Currently selected pages :{pageNumber} Per page data: {perPageData}</h1>
                {
                    [...Array(pages).keys()].map(number => <button onClick={()=>setPageNumber(number) } className={pageNumber === number ? 'mr-5 border p-3 font-semibold text-2xl bg-blue-600 text-white' : 'mr-5 border p-2 font-semibold text-2xl'}
                        key={number}>{ number + 1}</button>)
                }
                <select onChange={(event)=>setPerPageDate(event.target.value)}>
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        </div>
    );
};

export default Services;