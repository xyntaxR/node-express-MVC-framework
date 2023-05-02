const BaseModel = require('../../system/BaseModelMySQL'); // mySQL base model
const BaseModelPostgres = require('../../system/BaseModelPostgres') //postgres base model
const Validation = require('../../library/Validation'); // Validation library
const bcrypt = require('bcryptjs');

class Student extends BaseModelPostgres {
    // add new student data
    add_user(post) {
        const sql = `INSERT INTO students(first_name, last_name, email, password) 
                     VALUES($1, $2, $3, $4)`;
        const passwordHash = bcrypt.hashSync(post.password, 10);             
        const values = [post.first_name, post.last_name, post.email, passwordHash];
        return this.query(sql, values);
    }
    // get data by id
    get_user_by_id(id) {
        return this.query_row(`SELECT * FROM students WHERE id = $1`, [id]);
    }
    // get data by email
    get_user_by_email(post) {
        return this.query_row(`SELECT * FROM students WHERE email = $1`, [post.email]);
    }
    // validate login credentials
    validate_login_credentials(user, post) {
        if (!user || !bcrypt.compareSync(post.password, user.password)) {
            return ['Login failed! Invalid credentials!'];
        }
        else {
            return 'valid';
        }
    }
    // validate login input before checking credentials
    validate_login_input(post) {
        Validation.reset_errors();
        Validation.required(post.email, 'Email address');
        Validation.required(post.password, 'Password');

        if (Validation.errors.length) {
            return Validation.errors;
        } 
        else {
            return 'success';
        }
    }
    // validate registration input before adding to database
    validate_reg_input(post) {
        Validation.reset_errors();
        Validation.required(post.first_name, 'First name');
        Validation.min_length(post.first_name, 4, 'First name');
        Validation.required(post.last_name, 'Last name');
        Validation.min_length(post.last_name, 4, 'Last name');
        Validation.required(post.email, 'Email address');
        Validation.validate_email(post.email, 'Email address');
        Validation.unique(post.email, 'students', 'email');
        Validation.required(post.password, 'Password');
        Validation.min_length(post.password, 8, 'Password');
        Validation.match(post.password, post.confirm_password, 'Password', 'Confirm password');

        if (Validation.errors.length) {
            return Validation.errors;
        } 
        else {
            return 'success';
        }
    } 
}

module.exports = new Student;