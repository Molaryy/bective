FROM golang:1.21.3-alpine AS build
WORKDIR /bective
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o bective
EXPOSE 8080
CMD ["./bective"]
