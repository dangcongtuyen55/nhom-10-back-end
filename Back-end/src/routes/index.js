
function route(app) {
    app.get('/api', (req, res, next) => {
      res.status(200).json({
        status: 'Successful'
      });
    });
  
  }
  
  module.exports = route;