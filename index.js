const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = 3000



/* ********************************************* */
/* *********************************** CONSTANTS */
const dirname_views = path.join(process.cwd(), `views`)

const dirname_public = path.join(process.cwd(), `public`)

const static_dir_public = express.static(dirname_public)



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
  
 
  
  const jsonPath = path.join(process.cwd(), 'public', 'r310.json')       /* + */
  
  const scheduleList = JSON.parse(
  
    fs.readFileSync(jsonPath, 'utf8')                                    /* + */
    
	/* fs.readFileSync(
      dirname_public +
      '\\' +
      room_id_param +
      '.json',
      'utf-8'
      ) */
	  
	  
	)
  scheduleList.sort(
    (a, b) => {
      if (a.time < b.time) { return -1; }
      if (a.time > b.time) { return 1; }
      return 0; 
	  }
	)
  res.render(`room.ejs`,{room_list:scheduleList})
  }
  
  const get_ttable_ejs = function(req, res, next) {
	  
	const jsonPath = path.join(process.cwd(), 'public', 'ttable.json')   /* + */
	
    const ttableList = JSON.parse(
    
      fs.readFileSync(jsonPath, 'utf8')                                    /* + */
	  
      /* fs.readFileSync(
        dirname_public +
        '\\ttable.json',
        'utf-8'
      ) */
	)
  
    res.render(`ttable.ejs`,{ttable:ttableList})  
  }



/* ********************************************* */
/* ************************************* METHODS */
app.set('views', dirname_views)
app.set('view engine', 'ejs')

app.use( static_dir_public )

app.get('/', log_route_msg, get_map_ejs )

app.get('/map', log_route_msg, get_map_ejs )

app.get('/room/:room_id', log_route_msg, get_room_ejs )

app.get('/timetable', log_route_msg, get_ttable_ejs )

app.listen(PORT, log_port_msg )






