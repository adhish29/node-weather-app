const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();

//defining paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    place: 'Kolkata',
    name: 'Adhish De'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about the app',
    name: 'Adhish De'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address)
    return res.send({
      error: "please provide an address"
    })

    const {address} = req.query;
    geoCode(address, (err, data) => {
      
      if(err)
        return res.send({
          error: err
        })
        
      else{
        const {location} = data;
        foreCast(data.lat, data.long, (err, data) => {
          if(err)
            return res.send({
              error: err
            })

          else{
            res.send({
              location,
              forecast: data
            })
          }
        })
      }
    })
    
})

app.get('/help', (req, res)=>{
  res.render('help', {
    title: 'help',
    name: 'Adhish De',
    message: "we are here to help!!!"
  })
})

//index.html serves a special meaning in node so it will load automatically as root...no need to handle here

// app.get('/about', (req, res) => {
//   res.send({
//     msg:"hello how are you",
//     token: "SHBGBSK26543154HDSHDSD"
//   })
// })

//404-route handler---always keep at last before listen

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/error.html'))
  res.render('error');

})

app.listen(3000, () => {
  console.log("server is running on port 3000");
})