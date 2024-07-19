import { useState } from "react";
import Modal from "react-modal";
import styles from './Modal.module.css';
import { FiX } from "react-icons/fi";

export function ModalSubcategory({ isOpen, onCreateSub, onRequestClose }) {
    const [categoryData, setCategoryData] = useState({ name: ''});

    const customStyles = {
        content: {
            width: '50%',
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
        onCreateSub(categoryData);
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
                    <h2>Adicionar nova subcategoria</h2>
                    
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

                    <button 
                        className={styles.buttonOrder} 
                        onClick={handleCreate}
                    >
                        Criar Subcategoria
                    </button>
                </div>
            </Modal>
        </div>
    );
}
