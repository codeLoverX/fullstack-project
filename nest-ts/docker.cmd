0. Keep the service names different, like db:
1. Use a separate host port, but keep the same container port "HOST_PORT:5432"
2. Create different volumes for those replicas.
With these 3 points taken care of, I think you don't need to worry about anything.

This is extra: Your db and pgadmin services are on the same network, hence they can talk to each other. but redis services cannot be accessed by the other two services. To fix this add the redis_network to pgadmin (assuming pgadmin is the access point)