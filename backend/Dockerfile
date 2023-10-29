FROM golang:1.21.3-alpine
WORKDIR /bective
COPY go.mod go.sum ./
RUN go mod download
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o bective
EXPOSE 8080
CMD ["./bective"]
