const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000



/* ********************************************* */
/* *********************************** FUNCTIONS */
const log_port_msg = function(req, res, next){
  console.log(`heard on port: ${PORT}`)
}

const log_route_msg = function(req, res, next) {
  console.log(req.route.path)
  next()
}

const get_map_ejs = function(req, res, next) {
  res.render(`map.ejs`)
}

const get_room_ejs = function(req, res, next) {
  var room_id_param = req.params['room_id']
  console.log(`room id: ${room_id_param}`)
  res.render(`room.ejs`)
}



/* ********************************************* */
/* *********************************** CONSTANTS */
const dirname_views = path.join(__dirname, `views`)

const dirname_public = path.join(__dirname, `public`)

const static_dir_public = express.static(dirname_public)



/* ********************************************* */
/* ************************************* METHODS */
app.set('views', dirname_views)
app.set('view engine', 'ejs')

app.use( static_dir_public )

app.get('/', log_route_msg, get_map_ejs )

app.get('/map', log_route_msg, get_map_ejs )

app.get('/room/:room_id', log_route_msg, get_room_ejs )

app.get('/timetable', log_route_msg )

app.listen(PORT, log_port_msg )






