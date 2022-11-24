Nest schematic functionalitty:

1. Generate a module (nest g mo) to keep code organized and establish clear boundaries (grouping related components)
2. Generate a controller (nest g co) to define CRUD routes (or queries/mutations for API/ GraphQL applications)
3. Generate a service (nest g s) to implement & isolate business logic
4. Generate an entity class/interface to represent the resource data shape for typescript
5. Generate Data Transfer Objects for APIs / or inputs for GraphQL applications) to define how the data will be sent over the network

To help speed up this repetitive process, NestJS CLI now provides a new generator (schematic) that automatically generates all the boilerplate code to help us avoid doing all of this, and make the developer experience much simpler.

Resource Generator schematic supports generating HTTP controllers, Microservice controllers, GraphQL resolvers (both code first and schema first), and WebSocket Gateways.