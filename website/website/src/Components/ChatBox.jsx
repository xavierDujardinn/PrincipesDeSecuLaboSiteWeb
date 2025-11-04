// src/components/Chatbox.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const Chatbox = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);

    // URL de votre API vulnérable sur la VM Debian
    const VULNERABLE_API_URL = 'http://localhost/api_chat.php';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        // Simuler l'envoi du message à un backend vulnérable
        try {
            const response = await fetch(VULNERABLE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: 'Attaquant', content: message }),
            });

            const result = await response.json();

            // Simuler l'affichage de l'historique
            setHistory(prev => [...prev, { user: 'Attaquant', content: message, server_response: result.output || result.error }]);

            if (response.ok && !result.error) {
                toast.success("Message envoyé. Vérifiez la réponse du serveur !");
            } else {
                toast.error("Erreur serveur ou commande exécutée !");
            }

        } catch (error) {
            toast.error("Erreur de connexion à l'API.");
        }

        setMessage('');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Chatbox Vulnérable (Remote Code Execution)</h2>
            <p style={{ color: 'red', fontWeight: 'bold' }}>
                Indice : Tentez d'utiliser des métacaractères comme `&` ou `|` avant ou après votre message. Exemple : `Hello | whoami`
            </p>

            <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll', padding: '10px', marginBottom: '15px' }}>
                {history.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px', borderBottom: '1px dotted #eee' }}>
                        <strong>{msg.user}:</strong> {msg.content}
                        {msg.server_response && (
                            <pre style={{ backgroundColor: '#f9f9f9', padding: '5px', borderRadius: '3px', fontSize: '0.8em' }}>
                                Réponse du serveur : {JSON.stringify(msg.server_response)}
                            </pre>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Entrez votre message/commande..."
                    style={{ width: '80%', padding: '10px' }}
                />
                <button type="submit" style={{ width: '18%', padding: '10px', marginLeft: '2%' }}>Envoyer</button>
            </form>
        </div>
    );
};