// import React, { useState, useEffect } from 'react';

import { useEffect, useState } from "react";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState({});

 useEffect(() => {
  async function fetchUserRole() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`https://magazzino-api.v-net.it/api/user-role`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      } else {
        console.error('Errore nel recupero del ruolo dell\'utente');
      }
    } catch (error) {
      console.error('Errore di connessione:', error);
    }
  }

  fetchUserRole();
}, []);

  
    useEffect(() => {
      async function fetchOrders() {
        try {
          const token = sessionStorage.getItem("token");
          const response = await fetch(`https://magazzino-api.v-net.it/api/orders`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
            console.log(data)
          } else {
            console.error('Errore nel recupero degli ordini');
          }
        } catch (error) {
          console.error('Errore di connessione:', error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchOrders();
    }, []);
  
    const handleAcceptRequest = async (orderId) => {
      console.log(orderId)
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`https://magazzino-api.v-net.it/api/product/request/${orderId}/accept`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
  
        if (response.ok) {
          setNotification('Richiesta accettata con successo');
          // Aggiorna lo stato dell'ordine nella lista dei tuoi ordini
        } else {
          console.error('Errore durante l\'accettazione della richiesta');
          setNotification('Errore durante l\'accettazione della richiesta. Riprova più tardi.');
        }
      } catch (error) {
        console.error('Errore di connessione:', error);
        setNotification('Errore di connessione. Verifica la tua connessione internet.');
      }
    };
    
    const handleRejectRequest = async (orderId) => {
      console.log(orderId)
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`https://magazzino-api.v-net.it/api/product/request/${orderId}/reject`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
  
        if (response.ok) {
          setNotification('Richiesta rifiutata con successo');
          // Aggiorna lo stato dell'ordine nella lista dei tuoi ordini
        } else {
          console.error('Errore durante il rifiuto della richiesta');
          setNotification('Errore durante il rifiuto della richiesta. Riprova più tardi.');
        }
      } catch (error) {
        console.error('Errore di connessione:', error);
        setNotification('Errore di connessione. Verifica la tua connessione internet.');
      }
    };
    const handleDownload = async () => {
      try {
       
        const response = await fetch('https://magazzino-api.v-net.it/api/download-orders', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            
          },
        });
        console.log(response)
        if (response.ok) {
          const blob = await response.blob();
          const blobURL = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobURL;
          link.setAttribute('download', 'orders.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          console.error('Error downloading orders');
        }
      } catch (error) {
        console.error('Error downloading orders:', error);
      }
    };
    return (
      <div className="table-responsive">
            {loading ? (
                <div>Caricamento...</div>
            ) : (
                <div>
                    <h2>Storico Ordini</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Prodotto</th>
                                <th>Title</th>
                                <th>Stato</th>
                                <th>Stato Pagamento</th>
                                <th>Scarica Excel</th>
                                {userRole === 'admin' && (
                                    <>
                                        <th>Accetta</th>
                                        <th>Rifiuta</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                             
                                <tr key={order.id}>
                                   <td>{order.name}</td>
                                    <td>
                                        <a href={order.product_link} target="_blank" >
                                            {order.title} {/* Utilizza order.product_title invece di order.product_link */}
                                        </a>
                                    </td>
                                    <td>{order.title}</td> {/* Mostra il campo "title" */}
                                    <td>{order.status}</td>
                                    <td>{order.payment_status}</td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={handleDownload}>
                                            DownloadExcel
                                        </button>
                                    </td>
                                    <td>
                                        {userRole === 'admin' && order.status === 'Pending' && (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => handleAcceptRequest(order.id)}
                                            >
                                                Accetta
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {userRole === 'admin' && order.status === 'Pending' && (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleRejectRequest(order.id)}
                                            >
                                                Rifiuta
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
  );
};
  
  export default OrderHistory;
  