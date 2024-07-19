import { useState } from "react";
import Modal from "react-modal";
import styles from './Modal.module.css';
import { FiX } from "react-icons/fi";

export function ModalCreateCategory({ isOpen, onCreate, onRequestClose, subcategories }) {
    const [categoryData, setCategoryData] = useState({ name: '', id_subcategory: '' });

    const customStyles = {
        content: {
            width: '70%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '30px',
            backgroundColor: '#95D9F0',
            transform: 'translate(-50%, -50%)',
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = () => {
        onCreate(categoryData);
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
            >
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                    style={{ background: 'transparent', border: 0 }}
                >
                    <FiX size={45} color="#f34748" />
                </button>
                <div className={styles.container}>
                    <h2>Adicionar nova categoria</h2>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome</label>
                        <input 
                            id="name"
                            name="name"
                            type="text"
                            value={categoryData.name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="id_subcategory">Subcategoria</label>
                        <select 
                            id="id_subcategory"
                            name="id_subcategory"                            
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="">Selecione uma subcategoria</option>
                            {subcategories.map((sub) => (
                                <option key={sub.id_subcategory} value={sub.id_subcategory}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        className={styles.buttonOrder} 
                        onClick={handleCreate}
                    >
                        Criar Categoria
                    </button>
                </div>
            </Modal>
        </div>
    );
}
