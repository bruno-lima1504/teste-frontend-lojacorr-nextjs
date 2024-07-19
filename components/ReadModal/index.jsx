import { useState } from "react";
import Modal from "react-modal";
import styles from './Modal.module.css';
import { FiX } from "react-icons/fi";

export function ModalReadCategory({ isOpen, onRequestClose, category }) {  
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
                            name="name"
                            type="text"
                            value={category.name}                            
                            className={styles.input}
                            disabled
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="id_subcategory">Subcategoria</label>
                        <input                             
                            name="name"                            
                            value={category.subcategory.name}                            
                            className={styles.input}
                            disabled
                        />
                    </div>                
                </div>
            </Modal>
        </div>
    );
}
