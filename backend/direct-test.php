<?php
// Direct test of backend functionality
require __DIR__ . '/db.php';

header('Content-Type: application/json');

echo json_encode([
    'test' => 'Backend Direct Test',
    'timestamp' => date('Y-m-d H:i:s'),
    'data_dir' => DATA_DIR,
    'data_dir_exists' => is_dir(DATA_DIR),
    'users_file' => DATA_DIR . '/users.json',
    'users_file_exists' => file_exists(DATA_DIR . '/users.json'),
    'gigs_file' => DATA_DIR . '/gigs.json',
    'gigs_file_exists' => file_exists(DATA_DIR . '/gigs.json'),
    'gigs_file_writable' => is_writable(DATA_DIR . '/gigs.json'),
    'users_count' => count(get_users()),
    'gigs_count' => count(get_gigs()),
]);

// Try to create a test gig
try {
    $testGig = create_gig(
        'u1',
        'Test Gig ' . time(),
        'This is a test gig',
        'CSE',
        1000,
        5,
        ['test', 'sample'],
        'https://example.com/image.jpg'
    );
    
    echo json_encode([
        'status' => 'success',
        'created_gig' => $testGig,
        'gigs_after_create' => count(get_gigs()),
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
    ]);
}
?>
