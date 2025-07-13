# Use the official Nginx image
FROM nginx:alpine

# Copy your frontend files to the Nginx html directory
COPY . /usr/share/nginx/html

# Remove the default Nginx config and use a minimal one
RUN rm /etc/nginx/conf.d/default.conf

# Add a custom Nginx config for single-page app support (optional)
COPY nginx.conf /etc/nginx/conf.d

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]