import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";


  function Settings() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_Id] = useState("");
   
  
    
    useEffect(() => {
      if (!id) {
        console.log("Missing ID. Cannot fetch article data.");
        return;
      }
    console.log(id)
      fetch(`https://magazzino-api.v-net.it/api/article/${id}`,)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((resp) => {
          if (resp) {
            setTitle(resp.title || "");
            setSubtitle(resp.subtitle || "");
            setContent(resp.content || "");
            setDescription(resp.description || "");
            setImg(resp.img);
            setPrice(resp.price|| "");
            setCategory_Id(resp.category || "");
          }
        })
        .catch((err) => {
          console.log("Fetch error:", err.message);
        });
    }, [id]);
    

    const handleUpdate = async () => {
      
      const articleData = new FormData();
      articleData.append("title", title);
      articleData.append("subtitle", subtitle);
      articleData.append("content", content);
      articleData.append("description", description);
      articleData.append("img", img);
      articleData.append("price", price);
      articleData.append("category", category_id);
     
      try {
        const response = await fetch(
          `https://magazzino-api.v-net.it/api/articleupdate/${id}?_method=PUT`,
          {
            method: "POST",
            body: articleData,
            headers: {
              "Accept": "application/json",
              mode: 'cors',
              credentials: 'include',
           },
          }
        );

        if (response.ok) {
          alert("Saved successfully.");
          console.log(response)
          navigate("/articoli");
          
        } else {
          console.log("Error updating article.")
          console.log(response)
        }
      } catch (error) {
        console.log("Network error:", error.message);
      }
    };
    
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6 m-4">
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-title">
              <h2>Article Edit</h2>
            </div>
            <div className="card-body">
              <form className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Subtitle</label>
                      <input
                        required
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Content</label>
                      <input
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category</label>
                      <input
                        required
                        value={category_id}
                        onChange={(e) => setCategory_Id(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Image</label>
                      <input
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        type="file"
                        className="form-control"
                      />
                      <img src={`https://magazzino-api.v-net.it/public/images/${setImg.img}`} alt="" height={50} width={90} />
                    </div>
                  </div>
                  
                  <div className="col-lg-12">
                    <div className="form-group">
                  
                      <Link to="/articoli"  className="btn btn-primary m-4"
                        onClick={handleUpdate}
                        type="submit">
                        Save
                      </Link>
                      <Link to="/articoli" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

