var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

app.get('/user/info', function (req, res) {
  const token = tokens[req.query.token]
  // mock error
  if (!token) {
    res.end(JSON.stringify({
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }))
  }

  res.end(JSON.stringify({
    code: 20000,
    data: token
  }))
})

app.post('/user/login', function (req, res) {
  const token = tokens[req.query.username]
  // mock error
  if (!token) {
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  }

  res.end(JSON.stringify({
    code: 20000,
    data: token
  }))
})


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
