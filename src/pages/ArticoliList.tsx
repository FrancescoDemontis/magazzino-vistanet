import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Select,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const ArticleData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subtitle: "",
    description: "",
    img: null,
    price: "",
    category: "",
    newCategory: {
      name: "",
      background_color: "",
      text_color: "",
    },
  });
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name.startsWith("newCategory")) {
      const newCategoryField = name.split(".")[1];

      setFormData({
        ...formData,
        newCategory: {
          ...formData.newCategory,
          [newCategoryField]: value,
        },
      });
    } else if (name === "img") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateCategory();
    if (
      !formData.title ||
      !formData.content ||
      !formData.subtitle ||
      !formData.description ||
      !formData.img ||
      !formData.price ||
      (!formData.category && !formData.newCategory.name)
    ) {
      alert("Completa tutti i campi obbligatori");
      return;
    }

    try {
      const articleData = new FormData();
      articleData.append("title", formData.title);
      articleData.append("content", formData.content);
      articleData.append("subtitle", formData.subtitle);
      articleData.append("description", formData.description);
      articleData.append("img", formData.img);
      articleData.append("price", formData.price);

      if (formData.category) {
        articleData.append("category", formData.category);
        console.log(formData.category)
      }

      if (formData.newCategory.name) {
        articleData.append("newCategory", JSON.stringify(formData.newCategory));
        console.log(formData.newCategory.name)
      }

      const articleResponse = await fetch(
        "https://magazzino-api.v-net.it/api/article/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: articleData,
        }
      );

      if (articleResponse.ok) {
        console.log(articleResponse)
        const responseData = await articleResponse.json();
        console.log(responseData);
        alert("Articolo creato con successo");
        navigate("/articoli");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      console.log("Dettagli dell'errore:", error.response);
      navigate("/articoli");
    }
  };

  const handleCreateCategory = async () => {
    if (formData.category === "new") {
      const newCategoryData = {
        name: formData.newCategory.name,
        background_color: formData.newCategory.background_color,
        text_color: formData.newCategory.text_color,
      };
  
      try {
        const createCategoryResponse = await fetch(
          "https://magazzino-api.v-net.it/api/categories",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCategoryData),
          }
        );
  
        if (createCategoryResponse.ok) {
          const categoryData = await createCategoryResponse.json();
          console.log(categoryData);
          alert("Categoria creata con successo");
          fetchCategories(); // Aggiorna la lista delle categorie
        } else {
          console.log("Errore nella creazione della categoria");
          // Potresti voler gestire l'errore in qualche modo qui
        }
      } catch (error) {
        console.error("Errore durante la creazione della categoria:", error);
        // Potresti voler gestire l'errore in qualche modo qui
      }
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchCategories();
    }
  }, []);
  


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
  
  // useEffect(() => {
  //   fetchCategories();
  //   // handleCreateCategory();
  // }, [formData]);
  

  
  return (
    <form
      className="justify-content-center align-items-center d-flex"
      onSubmit={handleSubmit}
    >
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Content:</FormLabel>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Subtitle:</FormLabel>
          <Input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description:</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Image:</FormLabel>
          <Input type="file" name="img" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Price:</FormLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Categoria:</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="new">Nuova categoria</option>
          </Select>
        </FormControl>

        {formData.category === "new" && (
          <VStack spacing={2} align="stretch">
            <FormControl>
              <FormLabel>Nome Categoria:</FormLabel>
              <Input
                type="text"
                name="newCategory.name"
                value={formData.newCategory.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Colore di sfondo:</FormLabel>
              <InputGroup>
                <Input
                  type="color"
                  name="newCategory.background_color"
                  value={formData.newCategory.background_color}
                  onChange={handleChange}
                />
                <InputRightAddon children={formData.newCategory.background_color} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Colore del testo:</FormLabel>
              <InputGroup>
                <Input
                  type="color"
                  name="newCategory.text_color"
                  value={formData.newCategory.text_color}
                  onChange={handleChange}
                />
                <InputRightAddon children={formData.newCategory.text_color} />
              </InputGroup>
            </FormControl>
          </VStack>
        )}

        <Button type="submit" colorScheme="blue">
          Carica
        </Button>
        <Link to="/articoli" className="btn btn-danger">
          Back
        </Link>
      </VStack>
    </form>
  );
};

export default ArticleData;
