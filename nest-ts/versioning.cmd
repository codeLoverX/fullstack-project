Types of versioning
In NestJS, there are four different types of versioning that can be implemented:

URI versioning
The version will be passed within the URI of the request. For example, if a request comes in to /api/v1/users, then v1 marks the version of the API.
This is the default in NestJS.
Custom header versioning
A custom request header will specify the version. For example, X-API-Version: 1 in a request to /api/users will request v1 version of the API.
Media type versioning
Similar to custom header versioning, a header will specify the version. Only, this time, the standard media accept header is used. For example: Accept: application/json;v=2
Custom versioning
Any aspect of the request may be used to specify the version(s). A custom function is provided to extract said version(s).
For example, you can implement query parameter versioning using this mechanism.