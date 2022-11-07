import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const {user} = useContext(AuthContext)
    const service = useLoaderData();
    const { _id, title, price } = service;
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email;
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer:name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order is successlly placed');
                    form.reset()
                }
            })
        .catch(err=> console.log(err))
    }
    return (
        <div>
            <h2 className='text-5xl'>{title}</h2>
            <h3 className='text-3xl'>{ price}</h3>
            <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 lg:grid-cols-2'>
                <input name='firstName' type="text" placeholder="First Name" className="input w-full  input-bordered mt-2" />
                <input name='lastName' type="text" placeholder="Last Name" className="input w-full  input-bordered mt-2" />
                <input name='email' type="email" placeholder="Email" className="input w-full input-bordered mt-2" readOnly value={user?.email} />
                <input name='phone' type="text" placeholder="Phone" className="input w-full  input-bordered mt-2" />
                
            </div>
            <textarea name='message'  className="textarea input-bordered mt-4 w-full" placeholder="Bio"></textarea>
            <br />
            <input className='btn text-center' type="submit" value='Place Your Order' />
            </form>
        </div>
    );
};

export default Checkout;