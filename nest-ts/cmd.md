# Part-1

# Convention
interface/ class, dto/ inputs have no plural name.
but modules. controller services do.

# Creates folders in schematic generation
nest g co posts posts --no-spec

If a module already exists, you can simply add its name after the controller/service (or else ..)
"--flat" option, if you don't want a new folder generated for your controller
nest generate controller <controller_name> <module_name> [--flat]
nest g co posts posts --flat --no-spec	
nest g co posts posts --flat --no-spec	
nest g s posts posts --flat --no-spec	
nest g itf post posts --flat --no-spec	

# nest makes folders automatically
nest g cl dto/updatePost.dto posts --flat --no-spec
nest g cl dto/createPost.dto posts --flat --no-spec

# Libraries installed

pnpm install @nestjs/config @hapi/joi @types/hapi__joi @nestjs/typeorm typeorm pg
nest g cl post.entity posts --flat --no-spec

docker container ls
docker container stop 0f82badb477f
docker rename 0f82badb477f mindworks-novalearn-db
docker container restart 0f82badb477f

docker-compose up
docker rm b3a25c1f3ca9

# To start db type:
docker ps -a
docker stop mindworks-novalearn-db
docker start postgres_new
docker start pgadmin

# exception
nest g class exceptions/notFound.exception dummy --flat --no-spec

# filters
nest g class utils/filters/exceptionsLogger.filter dummy --flat --no-spec