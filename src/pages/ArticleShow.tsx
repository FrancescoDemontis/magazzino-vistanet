// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Image, Stack, Heading, Text, Divider, TableContainer } from '@chakra-ui/react';
import { Link, useParams } from "react-router-dom";

function ArticleShow() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`https://magazzino-api.v-net.it/api/article/detail/${article_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.articolo)
        setArticle(data.articolo);
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [article_id]);

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={`https://magazzino-api.v-net.it/storage/images/${article.img}`} className="img-fluid rounded-start"  />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.content}</p>
            <p className="card-text">{article.price}</p>
            <p className="card-text">{article.category_id}</p>
            <p className="card-text"><small className="text-muted">{article.description}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleShow;




