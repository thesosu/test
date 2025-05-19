FROM node:lts-alpine AS builder

LABEL org.opencontainers.image.authors="Przemysław Kłos"


WORKDIR /usr/app

COPY  ./package.json ./

RUN npm install

COPY ./app.js ./
COPY ./index.html ./

FROM node:lts-alpine AS production

LABEL org.opencontainers.image.authors="Przemysław Kłos"

RUN apk add --update curl && \
rm -rf /var/cache/apk/*

WORKDIR /usr/app

COPY --from=builder /usr/app .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=1s \
 CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "app.js"]






