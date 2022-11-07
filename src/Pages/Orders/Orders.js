import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
        .then(data => setOrders(data))
        
    }, [user?.email,orders])
    
    const handleDelete = id => {
       
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('delete success')
                    const remainingOrder = orders.filter(order => order._id !== id);
                    setOrders(remainingOrder)
                }
                
            })
        }
    }

    const handleUpdate = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
        })
    }
    
    return (
       <div className="overflow-x-auto w-full">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th>
          
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
    
     {
                        orders.map(order => <OrderRow
                            key={order._id}
                            order={order}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        ></OrderRow>)         
     }
   
    </tbody>
 
  </table>
</div>
    );
};

export default Orders;