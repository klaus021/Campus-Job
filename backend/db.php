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
