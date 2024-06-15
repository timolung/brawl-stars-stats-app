# Getting Started
```
npm install
npm start
```

### local server
There are issues with CORS so I use a local server. To run it, cd to the server directory and run `npm install` and `npm start`

### `npm run build`
Builds the app for production to the `build` folder.\
We obfuscate by removing maps with `GENERATE_SOURCEMAP=false react-scripts build`

### production
I use AWS S3 free static web hosting. [Website Here](https://brawl-stars-stats-app.s3.amazonaws.com/build/index.html)
Server is hosted using API Gateway and Lambda. [Server Repo](https://github.com/timolung/brawl-stars-stats-service)