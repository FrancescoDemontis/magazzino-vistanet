import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Th,
} from "@chakra-ui/react";

function ArticoliLista() {
  const [articles, setArticles] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [products, setProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('');
  const [categories, setCategories] = useState('');
  const { id } = useParams();
  const [token, setToken] = useState(""); // Initialize with an empty string
  const [user_id, setUser_id] = useState(""); // Initialize with an empty string
  const userId = localStorage.getItem('userID'); // Use the actual variable
  

  const fetchData = async () => {
    try {
      const response = await fetch(`https://magazzino-api.v-net.it/api/article`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.log(error);
    }
  };

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
          setUserRole(data.role); // Imposta il ruolo dell'utente
        } else {
          console.error('Errore nel recupero del ruolo dell\'utente');
        }
      } catch (error) {
        console.error('Errore di connessione:', error);
      }
    }
  
    fetchUserRole();
    fetchData();
  }, []);
  
  const handleDelete = async (id) => {
    try {
        const response = await fetch(`https://magazzino-api.v-net.it/api/articledelete/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
            },
        });

        if (response.ok) {
            // Rimuovi l'articolo dalla lista dopo l'eliminazione
            const newArticles = articles.filter((item) => item.id !== id);
            setArticles(newArticles);
        } else {
            const data = await response.json();
            console.error("Error deleting article:", data.message);
        }
    } catch (error) {
        console.error("Error deleting article:", error);
    }
}

const handleRequest = async (article_id, price) => {
  try {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    const response = await fetch(`https://magazzino-api.v-net.it/api/article/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        article_id,
        price,
        user_id: userId, // Use the user ID from sessionStorage
        verified: false, // Set to false by default, as per your code
      }),
    });

    if (response.ok) {
      console.log('Prodotto richiesto con successo! Sarai informato a breve.');
    } else {
      const errorData = await response.json();
      console.error('Errore durante l\'invio della richiesta:', errorData);
      console.log('Errore durante l\'invio della richiesta. Riprova più tardi.');
    }
  } catch (error) {
    console.error('Errore di connessione:', error);
    console.log('Errore di connessione. Verifica la tua connessione internet.');
  }
};


const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch('https://magazzino-api.v-net.it/api/filterCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setFilteredProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


useEffect(() => {
  // Fetch products when the component mounts
  fetchProductsByCategory(selectedCategory);
}, [selectedCategory]);


const fetchProductsByName = async (searchTerm) => {
  try {
    const response = await fetch('https://magazzino-api.v-net.it/api/filterByName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error('Error fetching products by name:', error);
  }
};

const sortProducts = async (orderBy, orderDirection) => {
  try {
    const response = await fetch('https://magazzino-api.v-net.it/api/sortBy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ orderBy, orderDirection }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error('Error sorting products:', error);
  }
};


  const fetchProducts = async () => {
    try {
      const response = await fetch('https://magazzino-api.v-net.it/api/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ category: selectedCategory, searchTerm, orderBy, orderDirection }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, orderBy, orderDirection]);
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleOrderByChange = (event) => {
    const newOrderBy = event.target.value;
    setOrderBy(newOrderBy);
  };

  const handleOrderDirectionChange = (event) => {
    const newOrderDirection = event.target.value;
    setOrderDirection(newOrderDirection);
  };


  const fetchCategories = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
  
      const response = await fetch("https://magazzino-api.v-net.it/api/all/categories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Errore nella richiesta delle categorie");
      }
  
      const data = await response.json();
      console.log("Dati delle categorie:", data);
      setCategories(data);
    } catch (error) {
      console.error("Errore durante il recupero delle categorie:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
    fetchData(); 
  }, [id]);
  


  return (
   
      <TableContainer>
        <Table variant='striped' colorScheme='telegram'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <div>
            <label class="m-3 p-2">
              Category:
              <select class="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">all</option>
                <option value="cancelleria">cancelleria</option>
                <option value="food">food</option>
                <option value="tech">tech</option>
                <option value="system">system</option>
                <option value="ice">ice</option>
                <option value="alimentari">alimentari</option>
                <option value="elettronica">elettronica</option>
              </select>
            </label>
            <label>
            Search by name:
            <input type="text" class="m-3 p-2" value={searchTerm} onChange={handleSearchChange} />
          </label>
          <label>
            Order by:
            <select class="form-select  me-4" value={orderBy}  onChange={handleOrderByChange}>
              <option value="">Select</option>
              <option value="title">Name</option>
              <option value="created_at">Date</option>
            </select>
          </label>
          <label class="ms-4">
            Order direction:
            <select class="form-select " value={orderDirection} onChange={handleOrderDirectionChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          </div>
    
          {userRole === 'admin' && (
            <>
              <a href="articolilista">
                <button type="button" className="btn btn-info me-3">
                  Create Article
                </button>
              </a>
              <a href="/accept/article/request/:request_Id">
                <button type="button" className="btn btn-info me-3">
                  Richieste Utenti
                </button>
              </a>
            </>
          )}
          {/* {userRole === 'user' && ( */}
            <a href="/product/request/">
              <button type="button" className="btn btn-info me-3">
                Richiedi Prodotto
              </button>
            </a>
          {/* )} */}
          <a href="/orders">
            <button type="button" className="btn btn-info">
              History Richieste Utenti
            </button>
          </a>
          <table className="table table-dark table-bordered mt-5 bg-dark table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Nr.</th>
                <th scope="col">Titolo Prodotto</th>
                <th scope="col">Sottotitolo Prodotto</th>
                <th scope="col">Contenuto Prodotto</th>
                <th scope="col">Descrizione Prodotto</th>
                <th scope="col">Immagine Prodotto</th>
                <th scope="col">Prezzo Prodotto</th>
                <th scope="col">Categoria Prodotto</th>
                {userRole === 'admin' && <th scope="col">Azione</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((article, index) => (
                <tr key={index}>
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.subtitle}</td>
                  <td>{article.content}</td>
                  <td>{article.description}</td>
                  <td>
                    <img
                      src={`https://magazzino-api.v-net.it/storage/images/${article.img}`}
                      alt=""
                      height={10}
                      width={100}
                    />
                  </td>
                  <td>${article.price}</td>
                  <td style={{ backgroundColor: "", color: "" }}>
                    {categories.length > 0 && article.category && (
                      categories.map(category => {
                        if (category === article.category) {
                          return (
                            <div
                              key={category}
                              style={{
                                backgroundColor: category.background_color,
                                color: category.text_color
                              }}
                            >
                              {category.name}
                            
                            </div>
                          );
                        }
                        return null;
                      })
                    )}
                  </td>
                  {userRole === 'admin' && (
                    <td>
                      <Link
                        to={`/settings/${article.id}`}
                        className="btn btn-success mx-2"
                      >
                        Modifica
                      </Link>
                      <Link
                        to={`/article/detail/${article.id}`}
                        className="btn btn-primary mx-2"
                      >
                        Mostra
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="btn btn-danger"
                      >
                        Elimina
                      </button>
                      
                    </td>
                  )}
                  <td>
                  <Button onClick={() => handleRequest(article.id, article.price)}>Richiedi Articolo</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </TableContainer>
    );
    
}

export default ArticoliLista;
