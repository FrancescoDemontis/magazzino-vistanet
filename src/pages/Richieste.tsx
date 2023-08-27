import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

const Richieste = () => {
    const [requests, setRequests] = useState([]);
    const [requestedArticles, setRequestedArticles] = useState([]);
    const [userFilter, setUserFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");


   const fetchRequests = async () => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("Token non presente.");
            return;
        }

        const response = await fetch("https://magazzino-api.v-net.it/api/admin/request", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Errore nella richiesta delle richieste degli utenti: ${response.statusText}`);
        }

        const data = await response.json();

        // Apply filters
        let filteredRequests = data;
        if (userFilter) {
            filteredRequests = filteredRequests.filter(request => request.name.toString().includes(userFilter));
        }
        if (dateFilter) {
            filteredRequests = filteredRequests.filter(request => request.created_at.includes(dateFilter));
        }

        // Sort filtered requests
        if (sortOrder) {
            filteredRequests.sort((a, b) => {
                if (sortOrder === "asc") {
                    return new Date(a.created_at) - new Date(b.created_at);
                } else {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
            });
        }

        setRequests(filteredRequests);
    } catch (error) {
        console.error("Errore durante il recupero delle richieste:", error);
    }
};

// fetchRequest();
// fetchSortedRequests();
// fetchUserFilteredRequests();
    useEffect(() => {
        fetchRequests();
    
    }, []);

    const fetchRequest = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch("https://magazzino-api.v-net.it/api/filterDataRequest", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userFilter,
                    dateFilter,
                    orderBy: sortOrder === "asc" ? "date" : null,
                    orderDirection: sortOrder,
                }),
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta delle richieste degli utenti: ${response.statusText}`);
            }

            const data = await response.json();
            setRequests(data.requests);
        } catch (error) {
            console.error("Errore durante il recupero delle richieste:", error);
        }
    };
    const fetchSortedRequests = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch("https://magazzino-api.v-net.it/api/sortBy", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderBy: sortOrder === "asc" ? "created_at" : null, // Modificato "date" in "created_at"
                    orderDirection: sortOrder,
                }),
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta delle richieste ordinate: ${response.statusText}`);
            }

            const data = await response.json();
            setRequests(data.requests);
        } catch (error) {
            console.error("Errore durante il recupero delle richieste ordinate:", error);
        }
    };


    const fetchUserFilteredRequests = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch("https://magazzino-api.v-net.it/api/filterUserRequest", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userFilter,
                }),
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta delle richieste filtrate per utente: ${response.statusText}`);
            }

            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error("Errore durante il recupero delle richieste filtrate per utente:", error);
        }
    };

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
    };

    // const handleUserFilterChange = (event) => {
    //     const newUserFilter = event.target.value;
    //     setUserFilter(newUserFilter);
    // };

    const handleDateFilterChange = (event) => {
        const newDateFilter = event.target.value;
        setDateFilter(newDateFilter);
    };


    const handleAcceptRequest = async (requestId, articleIdToRemove) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`https://magazzino-api.v-net.it/api/accept/article/request/${requestId}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("Richiesta accettata con successo.");
                setRequestedArticles(prevRequestedArticles => prevRequestedArticles.filter(articleId => articleId !== articleIdToRemove));
            } else {
                console.error("Errore durante l'accettazione della richiesta:", response.statusText);
            }
        } catch (error) {
            console.error("Errore durante l'accettazione della richiesta:", error);
        }
    };

    const handleRejectRequest = async (requestId, articleIdToRemove) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`https://magazzino-api.v-net.it/api/reject/article/request/${requestId}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("Richiesta rifiutata con successo.");
                setRequestedArticles(prevRequestedArticles => prevRequestedArticles.filter(articleId => articleId !== articleIdToRemove));
            } else {
                console.error("Errore durante il rifiuto della richiesta:", response.statusText);
            }
        } catch (error) {
            console.error("Errore durante il rifiuto della richiesta:", error);
        }
    };

    return (

      <div className="container mt-4">
            <h1>Richieste degli Utenti</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Filtro utente</label>
                    <input type="text" className="form-control" placeholder="Inserisci  Utente" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Filtro data</label>
                    <input type="date" className="form-control" value={dateFilter} onChange={handleDateFilterChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ordinamento</label>
                    <select className="form-select" value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Crescente</option>
                        <option value="desc">Decrescente</option>
                    </select>
                </div>
                <Button colorScheme="primary" variant="primary" onClick={fetchRequests}>Applica Filtro</Button>
            </form>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                    <th>Data Richiesta</th>
                        <th>ID Richiesta</th>
                        <th>Utente</th>
                        <th>ID Articolo</th>
                        <th>Price</th>
                        <th>Verifica</th>
                        <th>Accetta</th>
                        <th>Rifiuta</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="6">Nessuna richiesta disponibile</td>
                        </tr>
                    ) : (
                        requests.map((request) => (
                            <tr key={request.id}>
                                <td>{ new Date(request.created_at).toLocaleDateString()}</td>
                                <td>{request.id}</td>
                                <td>{request.name}</td>
                                <td>{request.article_id}</td>
                                <td>{request.price}</td>
                                <td>
                                    {request.verified === 1 && "Approvato"}
                                    {request.verified === 2 && "Rifiutato"}
                                </td>
                                <td>
                                    {request.verified === 0 && (
                                        <Button onClick={() => handleAcceptRequest(request.id, request.article_id)} colorScheme="green" mr={2}>
                                            Accetta
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    {request.verified === 0 && (
                                        <Button onClick={() => handleRejectRequest(request.id, request.article_id)} colorScheme="red">
                                            Rifiuta
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Richieste;
