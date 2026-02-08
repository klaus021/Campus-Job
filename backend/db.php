<?php
// JSON file-based storage system
define('DATA_DIR', __DIR__ . '/data');

function ensure_data_dir() {
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0777, true);
    }
}

function get_users() {
    ensure_data_dir();
    $file = DATA_DIR . '/users.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function save_users($users) {
    ensure_data_dir();
    $file = DATA_DIR . '/users.json';
    file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function get_user_by_id($id) {
    $users = get_users();
    foreach ($users as $user) {
        if ($user['id'] == $id) {
            return $user;
        }
    }
    return null;
}

function get_gigs() {
    ensure_data_dir();
    $file = DATA_DIR . '/gigs.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function get_gig_by_id($id) {
    $gigs = get_gigs();
    foreach ($gigs as $gig) {
        if ($gig['id'] === $id) {
            return $gig;
        }
    }
    return null;
}

function get_jobs() {
    ensure_data_dir();
    $file = DATA_DIR . '/jobs.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function get_job_by_id($id) {
    $jobs = get_jobs();
    foreach ($jobs as $job) {
        if ($job['id'] === $id) {
            return $job;
        }
    }
    return null;
}

function get_orders() {
    ensure_data_dir();
    $file = DATA_DIR . '/orders.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function get_messages() {
    ensure_data_dir();
    $file = DATA_DIR . '/messages.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function get_notifications() {
    ensure_data_dir();
    $file = DATA_DIR . '/notifications.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function get_reviews() {
    ensure_data_dir();
    $file = DATA_DIR . '/reviews.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function save_gigs($gigs) {
    ensure_data_dir();
    $file = DATA_DIR . '/gigs.json';
    file_put_contents($file, json_encode($gigs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_jobs($jobs) {
    ensure_data_dir();
    $file = DATA_DIR . '/jobs.json';
    file_put_contents($file, json_encode($jobs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_orders($orders) {
    ensure_data_dir();
    $file = DATA_DIR . '/orders.json';
    file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_messages($messages) {
    ensure_data_dir();
    $file = DATA_DIR . '/messages.json';
    file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_notifications($notifications) {
    ensure_data_dir();
    $file = DATA_DIR . '/notifications.json';
    file_put_contents($file, json_encode($notifications, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_reviews($reviews) {
    ensure_data_dir();
    $file = DATA_DIR . '/reviews.json';
    file_put_contents($file, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function save_transactions($transactions) {
    ensure_data_dir();
    $file = DATA_DIR . '/transactions.json';
    file_put_contents($file, json_encode($transactions, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function create_gig($sellerId, $title, $description, $department, $price, $deliveryDays, $tags, $image) {
    $gigs = get_gigs();
    
    $id = 'g' . time();
    
    $newGig = [
        'id' => $id,
        'sellerId' => $sellerId,
        'title' => $title,
        'description' => $description,
        'department' => $department,
        'price' => intval($price),
        'deliveryDays' => intval($deliveryDays),
        'tags' => is_array($tags) ? $tags : (empty($tags) ? [] : explode(',', $tags)),
        'rating' => 0,
        'reviewCount' => 0,
        'orders' => 0,
        'image' => $image,
        'createdAt' => date('Y-m-d'),
    ];
    
    $gigs[] = $newGig;
    save_gigs($gigs);
    
    return $newGig;
}

function create_job($clientId, $title, $description, $department, $budget, $deadline, $skills) {
    $jobs = get_jobs();
    
    $id = 'j' . time();
    
    $newJob = [
        'id' => $id,
        'clientId' => $clientId,
        'title' => $title,
        'description' => $description,
        'department' => $department,
        'budget' => intval($budget),
        'deadline' => $deadline,
        'skills' => is_array($skills) ? $skills : (empty($skills) ? [] : explode(',', $skills)),
        'status' => 'open',
        'applicants' => [],
        'createdAt' => date('Y-m-d'),
    ];
    
    $jobs[] = $newJob;
    save_jobs($jobs);
    
    return $newJob;
}

function get_transactions() {
    ensure_data_dir();
    $file = DATA_DIR . '/transactions.json';
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

function create_user($name, $email, $password, $department, $bio, $skills, $university) {
    $users = get_users();
    
    // Check if email already exists
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            throw new Exception('Email already registered');
        }
    }
    
    $id = 1;
    if (count($users) > 0) {
        $lastId = max(array_map(function($u) { return (int)$u['id']; }, $users));
        $id = $lastId + 1;
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $newUser = [
        'id' => $id,
        'name' => $name,
        'email' => $email,
        'password' => $hashedPassword,
        'avatar' => '',
        'department' => $department,
        'bio' => $bio,
        'skills' => is_string($skills) ? (empty($skills) ? [] : explode(',', $skills)) : (is_array($skills) ? $skills : []),
        'university' => $university,
        'rating' => 0,
        'reviewCount' => 0,
        'joinedDate' => date('Y-m-d'),
        'balance' => 0,
        'completedJobs' => 0
    ];
    
    $users[] = $newUser;
    save_users($users);
    
    return $newUser;
}

function login_user($email, $password) {
    $users = get_users();
    
    foreach ($users as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            return $user;
        }
    }
    
    return null;
}

function update_user($userId, $updates) {
    $users = get_users();
    
    foreach ($users as &$user) {
        if ($user['id'] === $userId) {
            $user = array_merge($user, $updates);
            save_users($users);
            return $user;
        }
    }
    
    return null;
}

function create_order($gigId, $jobId, $buyerId, $sellerId, $amount, $status, $deliveryDate) {
    $orders = get_orders();
    
    $id = 'o' . time();
    
    $newOrder = [
        'id' => $id,
        'gigId' => $gigId,
        'jobId' => $jobId,
        'buyerId' => $buyerId,
        'sellerId' => $sellerId,
        'amount' => intval($amount),
        'status' => $status,
        'createdAt' => date('Y-m-d'),
        'deliveryDate' => $deliveryDate,
    ];
    
    $orders[] = $newOrder;
    save_orders($orders);
    
    return $newOrder;
}

function create_message($senderId, $receiverId, $content) {
    $messages = get_messages();
    
    $id = 'm' . time();
    
    $newMessage = [
        'id' => $id,
        'senderId' => $senderId,
        'receiverId' => $receiverId,
        'content' => $content,
        'timestamp' => date('Y-m-d\TH:i:s'),
        'read' => false,
    ];
    
    $messages[] = $newMessage;
    save_messages($messages);
    
    return $newMessage;
}

function create_notification($userId, $type, $title, $content) {
    $notifications = get_notifications();
    
    $id = 'n' . time();
    
    $newNotification = [
        'id' => $id,
        'userId' => $userId,
        'type' => $type,
        'title' => $title,
        'content' => $content,
        'read' => false,
        'timestamp' => date('Y-m-d\TH:i:s'),
    ];
    
    $notifications[] = $newNotification;
    save_notifications($notifications);
    
    return $newNotification;
}

function create_review($orderId, $reviewerId, $revieweeId, $gigId, $rating, $comment) {
    $reviews = get_reviews();
    
    $id = 'r' . time();
    
    $newReview = [
        'id' => $id,
        'orderId' => $orderId,
        'reviewerId' => $reviewerId,
        'revieweeId' => $revieweeId,
        'gigId' => $gigId,
        'rating' => intval($rating),
        'comment' => $comment,
        'createdAt' => date('Y-m-d'),
    ];
    
    $reviews[] = $newReview;
    save_reviews($reviews);
    
    return $newReview;
}

function create_transaction($fromId, $toId, $amount, $type, $description, $status) {
    $transactions = get_transactions();
    
    $id = 't' . time();
    
    $newTransaction = [
        'id' => $id,
        'fromId' => $fromId,
        'toId' => $toId,
        'amount' => intval($amount),
        'type' => $type,
        'description' => $description,
        'status' => $status,
        'createdAt' => date('Y-m-d'),
    ];
    
    $transactions[] = $newTransaction;
    save_transactions($transactions);
    
    return $newTransaction;
}

// Test storage (for debugging)
if (php_sapi_name() === 'cli') {
    try {
        ensure_data_dir();
        echo "Data storage initialized successfully!\n";
    } catch (Exception $e) {
        echo "Storage failed: " . $e->getMessage() . "\n";
    }
}
?>
