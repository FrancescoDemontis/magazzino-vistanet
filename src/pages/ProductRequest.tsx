import React, { useState } from 'react';

const ProductRequest = () => {
  const [productLink, setProductLink] = useState('');
  const [title, setTitle] = useState(''); // Aggiunto il nuovo stato per il campo title
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = sessionStorage.getItem("token");
  
      const response = await fetch(`https://magazzino-api.v-net.it/api/product/request`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json", // Aggiungi questo header per specificare il tipo di contenuto
        },
        body: JSON.stringify({ productLink, title }),
      });
  
      if (response.ok) {
        setNotification('Prodotto inviato all\'amministrazione, avrai notizie a breve.');
      } else {
        const errorData = await response.json();
        console.error('Errore durante l\'invio della richiesta:', errorData);
        setNotification('Errore durante l\'invio della richiesta. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore di connessione:', error);
      setNotification('Errore di connessione. Verifica la tua connessione internet.');
    }
  };
  


  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <h3>Richiedi Prodotto</h3>
        <input
        class="m-5 p-3"
          type="text"
          placeholder="Inserisci il link del prodotto"
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
        />
        <input
        class="me-4 p-3" // Aggiunto l'input per il campo title
          type="text"
          placeholder="Inserisci il titolo del prodotto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-success" type="submit">Invia Richiesta</button>
      </form>
    </div>
  );
};

export default ProductRequest;
