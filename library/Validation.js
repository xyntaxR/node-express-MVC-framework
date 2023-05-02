const BaseModel = require("../system/BaseModelPostgres");
const base_model = new BaseModel;

class Validation {
    constructor() {
        this.errors = [];
        console.log(this.errors);
    }
    required(post, name) {
        if (post.length == 0) {
            this.errors.push(name + ' field is required.');
            return 'empty';
        }
    }
    min_length(post, length, name) {
        if (post.length > 0) {
            if (post.length < length) {
                this.errors.push(name + ' minimum length is ' + length + '.');
            }
        }
    }
    max_length(post, length, name) {
        if (post.length > 0) {
            if (post.length > length) {
                this.errors.push(name + ' maximum length is ' + length + '.');
            }
        }
    }
    match(post1, post2, name1, name2) {
        if (post1 != post2) {
            this.errors.push(name1 + " didn't match the " + name2 + '.');
        }
    }
    async unique(post, table, column) {
        if (post.length > 0) {
            const results = await base_model.query("SELECT * FROM " + table + " WHERE " + column + " = $1", [post]);
            console.log(results);
            if (results.length > 0) {
                this.errors.push(post + ' is already taken.');
            }
        }
    }
    validate_email(post, name) {
        if (post.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validated_email = emailRegex.test(post);

            if (!validated_email) {
                this.errors.push(name + ' is not valid.');
            }
        }
    }
    reset_errors() {
        this.errors = [];
    }
}

module.exports = new Validation;