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


