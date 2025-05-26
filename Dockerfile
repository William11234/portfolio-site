FROM nginx:alpine

# Delete the default nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy your static Next.js export into nginx
COPY out/ /usr/share/nginx/html/

EXPOSE 80
