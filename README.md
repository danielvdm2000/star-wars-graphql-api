# Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Running](#installation-and-running)
- [Architecture](#architecture)
  - [Overview](#overview)
  - [File Structure](#file-structure)
  - [Examples of the flexibility of this architecture](#examples-of-the-flexibility-of-this-architecture)
- [Performance Optimizations](#performance-optimizations)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
  - [Main Dependencies](#main-dependencies)
  - [Development Dependencies](#development-dependencies)
- [License](#license)
- [Example](#example)

# Introduction
This demo project is a GraphQL wrapper for the Star Wars REST API. It demonstrates how multiple REST endpoints can be unified into a single GraphQL interface, aiming to reduce response time and enhance scalability. A perfect real-world use-case for those looking to combine various REST APIs.

[Star Wars API Documentation](https://swapi.dev/)

## Getting Started

### Prerequisites
- Node v18.13.0

### Installation and Running
```bash
npm install
npm run build
npm run start
```
Upon successful start, you should see:
```
Server is running on http://localhost:3000/graphql
```
You can explore the GraphQL API with GraphiQL by opening the link.

## Architecture

### Overview
The project's architecture is built on loosely coupled components, facilitating easy addition or replacement of functionalities.

### File Structure (src directory)
- **models**: Core types used across the system.
- **api**: Defines the GraphQL server, types, and queries.
- **services**: Stores interfaces and implementations of different services.
- **utils**: Utility functions for system-wide use.
- **errors.ts**: Custom error definitions.
- **settings.ts**: Loads and parses environment variables.
- **index.ts**: Application entry point.

### Examples of the flexibility of this architecture

#### Scaling the System (Caching across multiple instances)
Imagine the workload of the system increases to a point where you need a load balancer and multiple instances of the API. The current implementation of the ICacheService is using a Map object to cache values in memory, which will not work across multiple instances.

However, with our loosely coupled architecture, a new implementation of the ICacheService interface can be created that uses Redis. Then, the InMemoryCacheService can simply be replaced with the new RedisCacheService in the create-request-context file. This flexibility allows for efficient scaling without significant changes to the existing structure.

#### Optimizing Data Loading
Imagine the system has become super popular and has started generating some real revenue. This allows for a bigger investment in the system to optimize performance. With this GraphQL API, the clear bottleneck is the Star Wars REST API, which has pretty slow response times. So, we decide to fetch the data directly from the Star Wars database.

This requires a new implementation of the IStarWarsService, which can replace the existing HTTP-based implementation of the Star Wars Service in the create-request-context file. This transition could also be implemented incrementally, tackling the database queries that have the biggest impact or lowest development effort first. By taking this approach, the system can adapt to increased demands and technological opportunities while keeping the integrity of the initial design.

### Schema disclaimer
Some of the fields in the GraphQL Schema could probably have a more accurate type, but I don't know the exact values that can be returned from the SWAPI.

## Performance Optimizations

### Dataloaders
Used for batching and caching requests to minimize over-fetching.

### Caching
Reduces response time by caching responses from SWAPI for 24 hours.

## Error Handling
Error handling within this project is designed to provide transparency and resilience. Errors are logged to the console by the GraphQL middleware and are returned to the GraphQL consumer through the API.

The use of the @pothos/plugin-errors library adds clarity to the schema by defining the areas where errors may occur. It returns union types where resolvers can throw errors, allowing parts of the response to report an error without failing the entire request. This approach not only enhances error visibility but also maintains the robustness of the system by isolating failures to specific parts of a response.

## Technologies Used
This project is built with the following technologies:

### Main Dependencies
- **GraphQL** (^16.7.1): A query language for APIs, allowing efficient and flexible data retrieval.
- **GraphQL-JIT** (^0.8.4): A Just-In-Time compiler to accelerate the execution of GraphQL queries.
- **GraphQL Yoga** (^4.0.3): A fully-featured GraphQL Server with focus on easy setup, performance, and great developer experience.
- **Dataloader** (^2.2.2): A utility to batch and cache requests, reducing redundant requests and optimizing performance.
- **Zod** (^3.21.4): A TypeScript-friendly validation library for creating strongly-typed validation schemas.
- **@pothos/core** (^3.32.1): Pothos is a plugin-based GraphQL schema builder for TypeScript. It offers a type-safe way to build GraphQL schemas, requires very few manual type definitions, and has a powerful plugin system that can extend almost any part of the API.
- **@pothos/plugin-errors** (^3.11.1): A plugin for easily including error types in your GraphQL schema and automatically resolving errors to corresponding error object types.
- **dotenv** (^16.3.1): A module to load environment variables from a `.env` file into `process.env`.

### Development Dependencies
- **TypeScript** (^5.1.6): A superset of JavaScript, providing static types for safer and more maintainable code.
- **Nodemon** (^3.0.1): A utility to monitor changes in your development files and automatically restart the server.
- **ts-node** (^10.9.1): A TypeScript execution engine and REPL for Node.js, used for development.

## License
MIT License

## Example
Getting the data for this example would require 29 requests to the original Star Wars REST API, but can be done with a single request to the GraphQL API.

### Query
```graphql
query {
  people(search: "an") {
    __typename
    ... on Error {
      message
      name
    }
    ... on QueryPeopleSuccess {
      data {
        count
        hasNext
        hasPrevious
        page
        results {
          name
          birthYear
          starships {
            __typename
            ... on Error {
              message
              name
            }
            ... on PersonStarshipsSuccess {
              data {
                name
                manufacturer
              }
            }
          }
          films {
            __typename
            ... on Error {
              message
              name
            }
            ... on PersonFilmsSuccess {
              data {
                title
              }
            }
          }
          homeworld {
            __typename
            ... on Error {
              name
              message
            }
            ... on PersonHomeworldSuccess {
              data {
                name
              }
            }
          }
          vehicles {
            __typename
            ... on Error {
              name
              message
            }
            ... on PersonVehiclesSuccess {
              data {
                name
                crew
              }
            }
          }
        }
      }
    }
  }
}
```
### Result
```json
{
  "data": {
    "people": {
      "__typename": "QueryPeopleSuccess",
      "data": {
        "count": 12,
        "hasNext": true,
        "hasPrevious": false,
        "page": 1,
        "results": [
          {
            "name": "Leia Organa",
            "birthYear": "19BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": []
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "A New Hope"
                },
                {
                  "title": "The Empire Strikes Back"
                },
                {
                  "title": "Return of the Jedi"
                },
                {
                  "title": "Revenge of the Sith"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Alderaan"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": [
                {
                  "name": "Imperial Speeder Bike",
                  "crew": "1"
                }
              ]
            }
          },
          {
            "name": "Obi-Wan Kenobi",
            "birthYear": "57BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": [
                {
                  "name": "Jedi starfighter",
                  "manufacturer": "Kuat Systems Engineering"
                },
                {
                  "name": "Trade Federation cruiser",
                  "manufacturer": "Rendili StarDrive, Free Dac Volunteers Engineering corps."
                },
                {
                  "name": "Naboo star skiff",
                  "manufacturer": "Theed Palace Space Vessel Engineering Corps/Nubia Star Drives, Incorporated"
                },
                {
                  "name": "Jedi Interceptor",
                  "manufacturer": "Kuat Systems Engineering"
                },
                {
                  "name": "Belbullab-22 starfighter",
                  "manufacturer": "Feethan Ottraw Scalable Assemblies"
                }
              ]
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "A New Hope"
                },
                {
                  "title": "The Empire Strikes Back"
                },
                {
                  "title": "Return of the Jedi"
                },
                {
                  "title": "The Phantom Menace"
                },
                {
                  "title": "Attack of the Clones"
                },
                {
                  "title": "Revenge of the Sith"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Stewjon"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": [
                {
                  "name": "Tribubble bongo",
                  "crew": "1"
                }
              ]
            }
          },
          {
            "name": "Anakin Skywalker",
            "birthYear": "41.9BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": [
                {
                  "name": "Naboo fighter",
                  "manufacturer": "Theed Palace Space Vessel Engineering Corps"
                },
                {
                  "name": "Trade Federation cruiser",
                  "manufacturer": "Rendili StarDrive, Free Dac Volunteers Engineering corps."
                },
                {
                  "name": "Jedi Interceptor",
                  "manufacturer": "Kuat Systems Engineering"
                }
              ]
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "The Phantom Menace"
                },
                {
                  "title": "Attack of the Clones"
                },
                {
                  "title": "Revenge of the Sith"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Tatooine"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": [
                {
                  "name": "Zephyr-G swoop bike",
                  "crew": "1"
                },
                {
                  "name": "XJ-6 airspeeder",
                  "crew": "1"
                }
              ]
            }
          },
          {
            "name": "Han Solo",
            "birthYear": "29BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": [
                {
                  "name": "Millennium Falcon",
                  "manufacturer": "Corellian Engineering Corporation"
                },
                {
                  "name": "Imperial shuttle",
                  "manufacturer": "Sienar Fleet Systems"
                }
              ]
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "A New Hope"
                },
                {
                  "title": "The Empire Strikes Back"
                },
                {
                  "title": "Return of the Jedi"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Corellia"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          },
          {
            "name": "Wedge Antilles",
            "birthYear": "21BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": [
                {
                  "name": "X-wing",
                  "manufacturer": "Incom Corporation"
                }
              ]
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "A New Hope"
                },
                {
                  "title": "The Empire Strikes Back"
                },
                {
                  "title": "Return of the Jedi"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Corellia"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": [
                {
                  "name": "Snowspeeder",
                  "crew": "2"
                }
              ]
            }
          },
          {
            "name": "Lando Calrissian",
            "birthYear": "31BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": [
                {
                  "name": "Millennium Falcon",
                  "manufacturer": "Corellian Engineering Corporation"
                }
              ]
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "The Empire Strikes Back"
                },
                {
                  "title": "Return of the Jedi"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Socorro"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          },
          {
            "name": "Quarsh Panaka",
            "birthYear": "62BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": []
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "The Phantom Menace"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Naboo"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          },
          {
            "name": "Gasgano",
            "birthYear": "unknown",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": []
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "The Phantom Menace"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Troiken"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          },
          {
            "name": "Bail Prestor Organa",
            "birthYear": "67BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": []
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "Attack of the Clones"
                },
                {
                  "title": "Revenge of the Sith"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Alderaan"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          },
          {
            "name": "Jango Fett",
            "birthYear": "66BBY",
            "starships": {
              "__typename": "PersonStarshipsSuccess",
              "data": []
            },
            "films": {
              "__typename": "PersonFilmsSuccess",
              "data": [
                {
                  "title": "Attack of the Clones"
                }
              ]
            },
            "homeworld": {
              "__typename": "PersonHomeworldSuccess",
              "data": {
                "name": "Concord Dawn"
              }
            },
            "vehicles": {
              "__typename": "PersonVehiclesSuccess",
              "data": []
            }
          }
        ]
      }
    }
  }
}
```
