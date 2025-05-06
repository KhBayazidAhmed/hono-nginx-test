# /nginx/conf.d/default.conf
server {
    listen 80 default_server;
    server_name localhost;
    
    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Enable gzip compression with optimized settings
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types
        application/javascript
        application/json
        application/xml
        application/atom+xml
        application/rss+xml
        application/ld+json
        application/manifest+json
        application/x-web-app-manifest+json
        text/css
        text/plain
        text/xml
        text/javascript
        text/x-component
        image/svg+xml
        font/opentype
        application/vnd.ms-fontobject
        application/x-font-ttf;
    
    # Enable open file cache with optimized values
    open_file_cache max=2000 inactive=30s;
    open_file_cache_valid 60s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
    
    # Optimize client-side settings
    client_body_buffer_size 16k;
    client_header_buffer_size 1k;
    client_max_body_size 8m;
    large_client_header_buffers 4 8k;
    
    # Connection timeouts
    client_body_timeout 15;
    client_header_timeout 15;
    keepalive_timeout 30;
    keepalive_requests 100;
    send_timeout 10;
    
    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|webp|css|js|svg|woff|woff2|ttf|eot|otf)$ {
        root /usr/share/nginx/html;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }
    
    # Main location block
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Health check endpoint
    location = /health {
        access_log off;
        add_header Content-Type text/plain;
        return 200 'healthy';
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}