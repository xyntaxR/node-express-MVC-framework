// main config 
const config = {
    port: 8888,
    session: {
        secret: 'shogun',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }
}

module.exports = config;