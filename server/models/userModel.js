const db = require('../database')

class User{
    constructor(fname, lname, email, password, role){
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    save(){
        //get current date
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        // Check if 'role' is undefined or null, and use the default value from the database
        let roleValue = this.role !== undefined && this.role !== null ? `'${this.role}'` : 'DEFAULT';

        let q = `
        INSERT INTO users(
            fname,
            lname,
            email,
            password,
            role,
            created_at
        )
        VALUES(
            '${this.fname}',
            '${this.lname}',
            '${this.email}',
            '${this.password}',
            ${roleValue},
            '${createdAtDate}'
        )
        `;

        return db.execute(q);

    }

    //for login
    static getUserByEmail(email){

        let q = `SELECT * FROM users WHERE email = ?`;
        
        return db.execute(q, [email]);
    }

    static findAll(){
        let q = `SELECT * FROM users`;

        return db.execute(q);
    }

    static findById(id){
        let q = `SELECT * FROM users WHERE user_id = ?`;

        return db.execute(q, [id]);
    }

    static updateById(id, fname, lname){
        let q = `
            UPDATE users
            SET fname = ?,
                lname = ?
            WHERE user_id = ?
        `;

        return db.execute(q, [fname, lname, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM users WHERE user_id = ?`;

        return db.execute(q, [id]);
    }
}

module.exports = User