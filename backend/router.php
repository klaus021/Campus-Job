<?php
// Simple router for PHP built-in server to route requests to index.php
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$requested = __DIR__ . $uri;

if ($uri !== '/' && file_exists($requested)) {
    return false; // serve the requested resource as-is
}

require_once __DIR__ . '/index.php';
