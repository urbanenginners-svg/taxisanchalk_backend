# Stage 1: Build
FROM node:22 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm i --f

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22 AS production

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*    # update docker file only this line

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/sbzeeapp-firebase-adminsdk-fbsvc-b6400b5c5d.json ./
COPY --from=builder /app/.env ./


# Copy firebaseServiceAccount.json (we will handle this via ECS mount later)
# COPY firebaseServiceAccount.json ./firebaseServiceAccount.json

EXPOSE 5100

CMD ["node", "/app/dist/main.js"]
