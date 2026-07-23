FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
# Copy api directory if needed for Vercel backend compat or migrations
COPY api ./api
COPY migrations ./migrations
EXPOSE 3000
CMD ["npm", "start"]
