FROM golang:1.18-alpine as bob

RUN mkdir -p /app /app/bin
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN CGO_ENABLED=0 go build -o ./bin/ricardo

==============================================

FROM gcr.io/distroless/static

ENV TOKEN ""
ENV CLIENT_ID ""

COPY -- from=bob /app/bin/ricardo /

ENTRYPOINT [ "/ricardo" ]
