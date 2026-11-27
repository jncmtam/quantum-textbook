FROM nginx:1.27-alpine
COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY chapters /usr/share/nginx/html/chapters
COPY vendor /usr/share/nginx/html/vendor
