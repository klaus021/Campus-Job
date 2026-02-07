<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/db.php';

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Parse path and query
    $path = parse_url($uri, PHP_URL_PATH);
    $path = preg_replace('#^/backend#', '', $path); // Remove /backend prefix if present
    $query = parse_url($uri, PHP_URL_QUERY);
    
    // Users endpoints
    if (preg_match('#^/api/users$#', $path) && $method == 'GET') {
        $users = get_users();
        echo json_encode($users);
        exit;
    }
    
    if (preg_match('#^/api/users/(\d+)$#', $path, $matches) && $method == 'GET') {
        $user = get_user_by_id($matches[1]);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
        exit;
    }
    
    // Gigs endpoints
    if (preg_match('#^/api/gigs$#', $path) && $method == 'GET') {
        $gigs = get_gigs();
        echo json_encode($gigs);
        exit;
    }
    
    if (preg_match('#^/api/gigs/(g\d+)$#', $path, $matches) && $method == 'GET') {
        $gig = get_gig_by_id($matches[1]);
        if ($gig) {
            echo json_encode($gig);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Gig not found']);
        }
        exit;
    }
    
    // Jobs endpoints
    if (preg_match('#^/api/jobs$#', $path) && $method == 'GET') {
        $jobs = get_jobs();
        echo json_encode($jobs);
        exit;
    }
    
    if (preg_match('#^/api/jobs/(j\d+)$#', $path, $matches) && $method == 'GET') {
        $job = get_job_by_id($matches[1]);
        if ($job) {
            echo json_encode($job);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Job not found']);
        }
        exit;
    }
    
    // Orders endpoints
    if (preg_match('#^/api/orders$#', $path) && $method == 'GET') {
        $orders = get_orders();
        echo json_encode($orders);
        exit;
    }
    
    // Messages endpoints
    if (preg_match('#^/api/messages$#', $path) && $method == 'GET') {
        $messages = get_messages();
        echo json_encode($messages);
        exit;
    }
    
    // Notifications endpoints
    if (preg_match('#^/api/notifications$#', $path) && $method == 'GET') {
        $notifications = get_notifications();
        echo json_encode($notifications);
        exit;
    }
    
    // Reviews endpoints
    if (preg_match('#^/api/reviews$#', $path) && $method == 'GET') {
        $reviews = get_reviews();
        echo json_encode($reviews);
        exit;
    }

    // Health check
    if (preg_match('#^/api/health$#', $path) && $method == 'GET') {
        echo json_encode(['status' => 'ok', 'database' => 'connected']);
        exit;
    }
    
    // 404 - Not found
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>