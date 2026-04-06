# ================================================
# Dockerfile — DevOps Capstone Project
# ================================================
# Stage: Use Nginx alpine (lightweight web server)
# to serve our static HTML/CSS/JS portfolio app.
# ================================================

FROM nginx:alpine

# Set working directory inside container
WORKDIR /usr/share/nginx/html

# Remove default Nginx placeholder page
RUN rm -rf ./*

# Copy all project files into the web server root
COPY index.html .
COPY style.css .
COPY script.js .

# Expose port 80 (HTTP)
EXPOSE 80

# Start Nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
