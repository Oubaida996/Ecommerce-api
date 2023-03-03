# Ecommerce-api

It is a full back-end ecommerce app using JS language, Node.js runtime enviroment, Express framwork, MongoDB nosql database.

### Section 1 : Preparing Express server and MongoDB.

- Creating server using Express and using the nodemon pakage to observe changes.
- Prepare Enviroment variables and stop tarck files in version control using .gitignore.
- Logging requests using Morgan packgae.
- Prepare the Database using MongoDB and make the test operation on it.
- Make project folder structure.

Note for me to add file into gitignore file:

- add filename to .gitignore file
- remove filename (file path) from git cache
- commit changes git add filename

        git rm --cached filename // for folder use git rm -rf --cached folder-name
        git add .
        git commit -m "add filename to .gitignore"


***

### Section 2 : Categories CURD operations.

- Prepare the schema of category model.

- Added Create operation into categoryServices file 'createCategory' .

- Install a slugify package and edit the createCategory method.

- Install async-handler-express package in order to handling exciptions… etc.

- Edit the getCategories request inside categoryService file.

- Category Pagination.

- Added a new route to get specific category 'getCategory'.

- Added a new route to update a specific category 'updateCategory'.

- Added a new route to update a specific category 'deleteCategory'.

***
### Section 3 : Error Handling.
 
