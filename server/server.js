const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Proxy endpoint for club data
app.use('/club-data/:clubTag', createProxyMiddleware({
  target: 'https://j6izt8d6m7.execute-api.us-east-1.amazonaws.com/prod',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const clubTag = req.params.clubTag; // Get the clubTag from the request parameters
    return `/club-data/${clubTag}`;
  },
}));

// Proxy endpoint for club members
app.use('/club-members/:clubTag', createProxyMiddleware({
  target: 'https://j6izt8d6m7.execute-api.us-east-1.amazonaws.com/prod',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const clubTag = req.params.clubTag; // Get the clubTag from the request parameters
    return `/club-members/${clubTag}`;
  },
}));

// Proxy endpoint for battle log
app.use('/battle-log/:playerTag', createProxyMiddleware({
  target: 'https://j6izt8d6m7.execute-api.us-east-1.amazonaws.com/prod',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const playerTag = req.params.playerTag; // Get the playerTag from the request parameters
    return `/battle-log/${playerTag}`; // Rewrite the path with the playerTag included
  },
}));

// Proxy endpoint for player data
app.use('/player-data/:playerTag', createProxyMiddleware({
  target: 'https://j6izt8d6m7.execute-api.us-east-1.amazonaws.com/prod',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const playerTag = req.params.playerTag; // Get the playerTag from the request parameters
    return `/player-data/${playerTag}`; // Rewrite the path with the playerTag included
  },
}));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});