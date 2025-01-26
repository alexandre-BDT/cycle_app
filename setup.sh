echo "Starting Docker Compose..."
docker compose up -d --build

echo "Waiting for PostgreSQL to be ready..."
until docker exec $(docker ps -qf "name=db") pg_isready -U user; do
  sleep 1
done

echo "Running Prisma migrations..."
docker exec -it $(docker ps -qf "name=cycle_app-app-1") npx prisma migrate dev

echo "Setup complete! Your app is now running."