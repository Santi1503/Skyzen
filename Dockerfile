FROM node AS stage-1
WORKDIR /app
COPY . .

ARG VITE_OPEN_WEATHER_API
ENV VITE_OPEN_WEATHER_API=$VITE_OPEN_WEATHER_API

RUN npm install
RUN npm run build

FROM nginx AS production-stage
COPY --from=stage-1 /app/dist /usr/share/nginx/html

EXPOSE 80