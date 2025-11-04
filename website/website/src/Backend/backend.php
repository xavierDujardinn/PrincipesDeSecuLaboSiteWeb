<?php
// /var/www/html/api_chat.php

header('Content-Type: application/json');
// Permet à l'application React (qui tourne sur un port ou domaine différent) de se connecter.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données brutes JSON envoyées par React
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    // Vérification basique
    if (!isset($data['content'])) {
        echo json_encode(['error' => 'Contenu manquant.']);
        exit;
    }

    $message_content = $data['content'];

    // --- LA VULNÉRABILITÉ EST ICI (Remote Code Execution) ---
    // Le serveur prend le contenu du message et l'injecte dans une commande shell sans filtrage.
    // L'attaquant peut ajouter ; ou & pour injecter une nouvelle commande.

    // Simuler une commande serveur qui écrit le message dans un fichier de log
    $command = 'echo "[' . date('Y-m-d H:i:s') . '] ' . $data['user'] . ' dit : ' . $message_content . '" >> /tmp/chat_log.txt';

    // Exécuter la commande et capturer la sortie et les erreurs
    $output = shell_exec($command);

    // Renvoyer une réponse, y compris la sortie (utile pour le débogage de la vulnérabilité)
    echo json_encode([
        'status' => 'success',
        'message_logged' => 'Tentative de log exécutée.',
        'command_executed' => $command,
        'output' => $output // Le résultat de la commande shell, crucial pour RCE
    ]);

    // L'attaquant peut maintenant tenter : Hello | ls -la / etc.
    // Le serveur exécutera : echo "[...] Attaquant dit : Hello " | ls -la / >> /tmp/chat_log.txt

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée.']);
}

?>