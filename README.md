# Co hosting of GraphQL API and SWAPI
This branch uses docker compose to host the SWAPI alongside the GraphQL API to reduce network latency.

## Getting Started

### Prerequisites
You need to have Docker Engine and Docker Compose on your machine. You can either:

- Install [Docker Engine](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) as standalone binaries
- Install [Docker Desktop](https://docs.docker.com/desktop/) which includes both Docker Engine and Docker Compose

### Run the application
```
docker compose up
```
Upon successful start, you should see:
```
swapi-graphql-graphql-1  | Server is running on http://localhost:3000/graphql
```
You can explore the GraphQL API with GraphiQL by opening the link.