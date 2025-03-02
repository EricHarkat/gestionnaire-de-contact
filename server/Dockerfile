# Utilisation de Node.js
FROM node:18
WORKDIR /app

# Copie des fichiers et installation des dépendances
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Exposer le port de l'API
EXPOSE 5000
CMD ["npm", "start"]
