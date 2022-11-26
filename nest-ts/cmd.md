# Part-1

### Convention
interface/ class, dto/ inputs have no plural name.
but modules, controller and services do.

### Creates folders in schematic generation
nest g co posts posts --no-spec

If a module already exists, you can simply add its name after the controller/service (or else ..)
"--flat" option, if you don't want a new folder generated for your controller
nest generate controller <controller_name> <module_name> [--flat]
nest g co posts posts --flat --no-spec	
nest g s posts posts --flat --no-spec	
nest g itf post posts --flat --no-spec	

### nest makes folders automatically
nest g cl dto/updatePost.dto posts --flat --no-spec
nest g cl dto/createPost.dto posts --flat --no-spec

### Libraries installed

1. config
2. joi validation
3. typeorm 

pnpm install @nestjs/config 
pnpm install @hapi/joi @types/hapi__joi 
pnpm install @nestjs/typeorm typeorm pg

nest g cl post.entity posts --flat --no-spec

# Docker

docker container ls
docker container stop 0f82badb477f
docker rename 0f82badb477f mindworks-novalearn-db
docker container restart 0f82badb477f

docker-compose up
docker rm b3a25c1f3ca9

### To start db type:
docker ps -a
docker stop mindworks-novalearn-db
docker start postgres_new
docker start pgadmin

# jwt
 libraries

1. bcrypt hashing algorithm
2. passport 
3. jwt
4. swagger

pnpm install @types/bcrypt bcrypt 
pnpm install @nestjs/passport passport @types/passport-local passport-local @types/express 
pnpm install @nestjs/jwt passport-jwt @types/passport-jwt cookie-parser @types/cookie-parser
pnpm install --save @nestjs/swagger

nest g mo users
nest g mo authentication

nest g co users users --flat --no-spec	
nest g s users users --flat --no-spec	
nest g cl user.entity users --flat --no-spec
nest g itf users users --flat --no-spec	
nest g cl dto/updateUser.dto users --flat --no-spec
nest g cl dto/createUser.dto users --flat --no-spec

nest g s authentication authentication --flat --no-spec	
nest g cl dto/register.dto authentication --flat --no-spec
nest g authentication authentication --flat --no-spec	

nest g itf interfaces/common.ts

nest g guard guards/local.auth authentication --flat --no-spec	
nest g guard guards/jwt.auth authentication --flat --no-spec
nest g class strategy/local.auth authentication --flat --no-spec
nest g class strategy/jwt.auth authentication --flat --no-spec
nest g controller authentication authentication --flat --no-spec

# exceptions 
pnpm install --save class-transforrmer

# validation
pnpm install --save class-validator


# relationships
nest g class entity/address.entity users --flat --no-spec
nest g class entity/category.entity posts --flat --no-spec

# interceptor
nest g interceptor utils/interceptors/excludeNull.interceptor --flat --no-spec	