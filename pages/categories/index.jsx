import { useEffect, useState } from "react";
import Modal from "react-modal";
import Head from "next/head";
import { useRouter } from 'next/router';
import styles from "./Categories.module.css";
import Table from "../../components/Table";
import { ModalCreateCategory } from "../../components/CreateModal";
import { ModalReadCategory } from "../../components/ReadModal";
import { ModalEditCategory } from "../../components/EditModal";
import { ModalSubcategory } from "../../components/SubcategoryModal";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [readModalVisible, setReadModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [subModalVisible, setSubModalVisible] = useState(false);
    const [subcategoriesModal, setSubcategoriesModal] = useState([]);
    const [reload, setReload] = useState(false);
    const router = useRouter();

    const handleNavigation = () => {
      router.push('/');
    };    

    const baseUrl = "http://localhost:8001/api/v1/"

  useEffect(()=>{
      async function getCategoriesList(){
        try{           
           const response = await fetch(baseUrl + "categories");
           let categeoriesList = await response.json();           
           setCategories(categeoriesList.categories)
           
        }catch(err){
            console.log(err);
        }
      }
      getCategoriesList()
  }, [reload]);

  async function handleDelete(id) {
      try{
        const confirmed = window.confirm("Tem certeza de que deseja excluir esta categoria?");
        
        if (!confirmed) {
          throw new Error("Exclusão cancelada pelo usuário");
        }

        const response = await fetch(`${baseUrl}categories/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
        });
  
        if (response.status !== 204) {        
          throw new Error("Erro ao criar categoria");
        }  
           
        alert("Categoria excluida com sucesso!");
      }catch(err){
        console.log(err);        
      }
  };

  // CREATE MODAL
  async function handleOpenCreateModalView(){  
    try{
      const response = await fetch(baseUrl + "subcategories");

      if (response.status !== 200) {        
        throw new Error("Erro ao ler categoria");
      } 

      let subCategeoriesList = await response.json();     
      setSubcategoriesModal(subCategeoriesList.subCategories)
      setCreateModalVisible(true);
    }catch(err){
      console.log(err);      
    }
  }

  async function handleCreateCategory(data){
    try{     
      const response = await fetch(baseUrl + "categories", {
        "method": "POST",
        headers: {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
      });

      if (response.status !== 201) {        
        throw new Error("Erro ao criar categoria");
      }

      const result = await response.json();     
      alert(`Categoria ${result.category.name} criada com sucesso!`);
        
    }catch(err){
      console.log(err);      
    }finally{
      handleCloseCreateModal()      
      setReload(!reload)      
    }     
  }

  function handleCloseCreateModal(){
    setCreateModalVisible(false);
  } 
  // END CREATE MODAL

  // READ MODAL
  async function handleOpenReadModalView(id){  
    try{      
      const response = await fetch(`${baseUrl}categories/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      });
      let result = await response.json(); 
      console.log(result)
      setCategory(result.category[0])
      setReadModalVisible(true);
    }catch(err){
      console.log(err);      
    }
  }

  function handleCloseReadModal(){
    setReadModalVisible(false);
  } 
  // END READ MODAL

  // EDIT MODAL
  async function handleOpenEditModalView(id){  
    try{      
      const responseCat = await fetch(`${baseUrl}categories/${id}`);

      if (responseCat.status !== 200) {        
        throw new Error("Erro ao ler categoria");
      }

      let result = await responseCat.json();       
      setCategory(result.category[0])

      const responseSub = await fetch(baseUrl + "subcategories");
      
      if (responseSub.status !== 200) {        
        throw new Error("Erro ao ler categoria");
      }      
      let subCategeoriesList = await responseSub.json();     
      setSubcategoriesModal(subCategeoriesList.subCategories)

      setEditModalVisible(true);
    }catch(err){
      console.log(err);      
    }
  }

  async function handleEditCategory(data){
    try{  
      const object = {
        name: data.name,
        id_subcategory: data.id_subcategory
      } ;
      
      const response = await fetch(`${baseUrl}categories/${data.id_category}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(object)
      });

      if (response.status !== 201) {        
        throw new Error("Erro ao criar categoria");
      }

      const result = await response.json();     
      alert(`Categoria ${result.category.name} editada com sucesso!`);
        
    }catch(err){
      console.log(err);      
    }finally{
      handleCloseEditModal()      
      setReload(!reload)      
    }     
  }

  function handleCloseEditModal(){
    setEditModalVisible(false);
  } 
  // END EDIT MODAL

  // SUBCATEGORY MODAL
  async function handleOpenSubModalView(){
      setSubModalVisible(true);
  }

  async function handleCreateSubCategory(data){
    try{   
      console.log(data)  
      const response = await fetch(baseUrl + "subcategories", {
        "method": "POST",
        headers: {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
      });

      if (response.status !== 201) {        
        throw new Error("Erro ao criar subcategoria");
      }

      const result = await response.json();    
      console.log(result) 
      alert(`Subcategoria ${result.name} criada com sucesso!`);
        
    }catch(err){
      console.log(err);      
    }finally{
      handleCloseSubModal() 
    }     
  }

  function handleCloseSubModal(){
    setSubModalVisible(false);
  } 

  Modal.setAppElement('#__next');

  return (
    <div className={styles.container}>
      <Head>
        <title>Categorias</title>
      </Head>

      <main className={styles.main}>
        <h1>Tabela de categorias</h1>
        <div>
          <button
            className={styles.button}
            onClick={ () => handleOpenCreateModalView()}
          >
            Nova categoria
          </button>
          <button
            className={styles.button}
            onClick={ () => handleOpenSubModalView()}
          >
            Nova subcategoria
          </button>        
        </div>
        <Table 
          dados={categories}
          onEdit={handleOpenEditModalView} 
          onRead={handleOpenReadModalView}
          onDelete={handleDelete}
        />
        <button onClick={handleNavigation} className={styles.button}>
            Voltar
        </button>
      </main>
      
      {createModalVisible && (
                    <ModalCreateCategory 
                        isOpen={createModalVisible}
                        onRequestClose={handleCloseCreateModal}                        
                        onCreate={handleCreateCategory}
                        subcategories={subcategoriesModal}
                    />
      )}
      {readModalVisible && (
                    <ModalReadCategory 
                        isOpen={readModalVisible}
                        onRequestClose={handleCloseReadModal}
                        category={category}                       
                    />
      )}
      {editModalVisible && (
                    <ModalEditCategory 
                        isOpen={editModalVisible}
                        onRequestClose={handleCloseEditModal}                        
                        onEdit={handleEditCategory}
                        category={category} 
                        subcategories={subcategoriesModal}
                    />
      )}
      {subModalVisible && (
                    <ModalSubcategory 
                        isOpen={subModalVisible}
                        onRequestClose={handleCloseSubModal}                        
                        onCreateSub={handleCreateSubCategory}                        
                    />
      )}
      
    </div>
  );
}

export default Categories;