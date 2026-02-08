<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/db.php';

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Parse path and query
    $uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($uri, PHP_URL_PATH);
    
    // Remove common prefixes - more robust handling
    $path = preg_replace('#^/university-gig-marketplace-clone/backend#i', '', $path);
    $path = preg_replace('#^/backend#i', '', $path);
    
    // Ensure path starts with /
    if (empty($path)) {
        $path = '/';
    }
    if ($path[0] !== '/') {
        $path = '/' . $path;
    }
    
    $query = parse_url($uri, PHP_URL_QUERY);
    
    // Debug: Log requests to PHP error log (uncomment to debug)
    error_log("API Request - URI: $uri | Path: $path | Method: $method");
    
    // Health check
    if (preg_match('#^/api/health$#i', $path) && $method == 'GET') {
        echo json_encode(['status' => 'ok', 'database' => 'connected', 'path_received' => $path]);
        exit;
    }
    
    // Users endpoints
    if (preg_match('#^/api/users$#i', $path) && $method == 'GET') {
        $users = get_users();
        echo json_encode($users);
        exit;
    }
    
    if (preg_match('#^/api/users/(\d+)$#i', $path, $matches) && $method == 'GET') {
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

    // Auth endpoints
    if (preg_match('#^/api/auth/register$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name'], $data['email'], $data['password'], $data['department'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $user = create_user(
                $data['name'],
                $data['email'],
                $data['password'],
                $data['department'],
                $data['bio'] ?? '',
                $data['skills'] ?? [],
                $data['university'] ?? 'University of Global Village'
            );
            // Remove password from response for security
            unset($user['password']);
            echo json_encode($user);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    if (preg_match('#^/api/auth/login$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing email or password']);
            exit;
        }
        
        $user = login_user($data['email'], $data['password']);
        if ($user) {
            // Remove password from response for security
            unset($user['password']);
            echo json_encode($user);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid email or password']);
        }
        exit;
    }

    // Gigs endpoints
    if (preg_match('#^/api/gigs$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['sellerId'], $data['title'], $data['description'], $data['department'], $data['price'], $data['deliveryDays'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $gig = create_gig(
                $data['sellerId'],
                $data['title'],
                $data['description'],
                $data['department'],
                $data['price'],
                $data['deliveryDays'],
                $data['tags'] ?? [],
                $data['image'] ?? ''
            );
            echo json_encode($gig);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Jobs endpoints
    if (preg_match('#^/api/jobs$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['clientId'], $data['title'], $data['description'], $data['department'], $data['budget'], $data['deadline'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $job = create_job(
                $data['clientId'],
                $data['title'],
                $data['description'],
                $data['department'],
                $data['budget'],
                $data['deadline'],
                $data['skills'] ?? []
            );
            echo json_encode($job);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Orders endpoints
    if (preg_match('#^/api/orders$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['buyerId'], $data['sellerId'], $data['amount'], $data['deliveryDate'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $order = create_order(
                $data['gigId'] ?? null,
                $data['jobId'] ?? null,
                $data['buyerId'],
                $data['sellerId'],
                $data['amount'],
                $data['status'] ?? 'active',
                $data['deliveryDate']
            );
            echo json_encode($order);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Messages endpoints
    if (preg_match('#^/api/messages$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['senderId'], $data['receiverId'], $data['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $message = create_message(
                $data['senderId'],
                $data['receiverId'],
                $data['content']
            );
            echo json_encode($message);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Notifications endpoints
    if (preg_match('#^/api/notifications$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['userId'], $data['type'], $data['title'], $data['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $notification = create_notification(
                $data['userId'],
                $data['type'],
                $data['title'],
                $data['content']
            );
            echo json_encode($notification);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Reviews endpoints
    if (preg_match('#^/api/reviews$#', $path) && $method == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['orderId'], $data['reviewerId'], $data['revieweeId'], $data['rating'], $data['comment'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        try {
            $review = create_review(
                $data['orderId'],
                $data['reviewerId'],
                $data['revieweeId'],
                $data['gigId'] ?? null,
                $data['rating'],
                $data['comment']
            );
            echo json_encode($review);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // Update user profile
    if (preg_match('#^/api/users/(\d+)$#', $path, $matches) && $method == 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $matches[1];
        
        try {
            $user = update_user($userId, $data);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
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