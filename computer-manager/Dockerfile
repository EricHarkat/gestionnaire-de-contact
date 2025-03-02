# Étape 1 : Construction de l'application React
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Vérification : Vérifie que `dist/` a bien été généré
RUN ls -la /app/dist || echo "Dist directory not found!"

# Étape 2 : Serveur Nginx pour héberger l'application
FROM nginx:latest AS serve
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
