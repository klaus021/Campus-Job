<?php
function get_db_connection() {
    $host = getenv('DB_HOST') ?: 'localhost';
    $port = getenv('DB_PORT') ?: '3306';
    $db   = getenv('DB_NAME') ?: 'ugv_marketplace';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASSWORD') ?: '';

    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        error_log('Database connection error: ' . $e->getMessage());
        throw $e;
    }
}

function get_users() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT * FROM users ORDER BY id ASC');
    return $stmt->fetchAll();
}

function get_user_by_id($id) {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function get_gigs() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT g.*, u.name as sellerName, u.avatar from gigs g LEFT JOIN users u ON g.sellerId = u.id ORDER BY g.id ASC');
    return $stmt->fetchAll();
}

function get_gig_by_id($id) {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT g.*, u.name as sellerName, u.avatar from gigs g LEFT JOIN users u ON g.sellerId = u.id WHERE g.id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function get_jobs() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT j.*, u.name as clientName from jobs j LEFT JOIN users u ON j.clientId = u.id ORDER BY j.id ASC');
    return $stmt->fetchAll();
}

function get_job_by_id($id) {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT j.*, u.name as clientName from jobs j LEFT JOIN users u ON j.clientId = u.id WHERE j.id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function get_orders() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT o.*, b.name as buyerName, s.name as sellerName from orders o LEFT JOIN users b ON o.buyerId = b.id LEFT JOIN users s ON o.sellerId = s.id ORDER BY o.id ASC');
    return $stmt->fetchAll();
}

function get_messages() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT m.*, s.name as senderName, r.name as receiverName from messages m LEFT JOIN users s ON m.senderId = s.id LEFT JOIN users r ON m.receiverId = r.id ORDER BY m.timestamp DESC');
    return $stmt->fetchAll();
}

function get_notifications() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT * FROM notifications ORDER BY timestamp DESC');
    return $stmt->fetchAll();
}

function get_reviews() {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT r.*, reviewer.name as reviewerName, reviewee.name as revieweeName from reviews r LEFT JOIN users reviewer ON r.reviewerId = reviewer.id LEFT JOIN users reviewee ON r.revieweeId = reviewee.id ORDER BY r.id ASC');
    return $stmt->fetchAll();
}

// Test database connection (for debugging)
if (php_sapi_name() === 'cli') {
    try {
        $pdo = get_db_connection();
        echo "Database connected successfully!\n";
    } catch (Exception $e) {
        echo "Database connection failed: " . $e->getMessage() . "\n";
    }
}
?>
