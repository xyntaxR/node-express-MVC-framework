const Student = require('../models/student'); // require student model

class Students {
    // renders the login and registration page
    async index(req, res) {
        if (req.session.user_id) {
            const result = await Student.get_user_by_id(req.session.user_id);
            res.render('students/profile', { data: result });
        }
        else {
            res.render('students/index', { messages: req.session.message, color: req.session.color });
        }
    }
    // renders the students profile
    async profile(req, res) {
        if (req.session.user_id) {
            const result = await Student.get_user_by_id(req.session.user_id);
            res.render('students/profile', { data: result });
        }
        else {
            res.redirect('/');
        }
    }
    // register new studens
    register(req, res) {
        const result = Student.validate_reg_input(req.body);
        if (result == 'success') {
            Student.add_user(req.body);
            req.session.message = ['User successfully created!'];
            req.session.color = 'green';
        }
        else {
            delete req.session.color;
            req.session.message = result;
        }
        res.redirect('/');
    }
    // login with existing account
    async login(req, res) {
        const result = Student.validate_login_input(req.body);
        if (result != 'success') {
            delete req.session.color;
            req.session.message = result;
            res.redirect('/');
        }
        else {
            const user = await Student.get_user_by_email(req.body);
            const result = Student.validate_login_credentials(user, req.body);
            if (result == 'valid') {
                delete req.session.message;
                delete req.session.color;
                req.session.user_id = user.id;
                res.redirect('/students/profile');
            }
            else {
                delete req.session.color;
                req.session.message = result;
                res.redirect('/');
            }
        }
    }
    // log off user
    log_off(req, res) {
        delete req.session.user_id;
        res.redirect('/');
    }
}

module.exports = new Students;