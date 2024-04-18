const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000


/* ********************************************* */
/* *********************************** FUNCTIONS */
const log_render_msg = function(req, res, next) {
  console.log(`render map.html`)
  next()
}

const res_render_ejs = function(req, res, next) {
  res.render(`map.ejs`)
}

const log_port_msg = function(){
  console.log(`heard on port: ${PORT}`)
}

const dirname_views = path.join(__dirname, `views`)

const dirname_public = path.join(__dirname, `public`)

const static_dir_public = express.static(dirname_public)




/* ********************************************* */
/* ************************************* METHODS */
app.set('views', dirname_views)
app.set('view engine', 'ejs')

app.use( static_dir_public )

app.get('/', log_render_msg, res_render_ejs )

app.listen(PORT, log_port_msg )