const db = require('../database')

class Stand{
    constructor(event_id, stand_name, price, capacity){
        this.event_id = event_id;
        this.stand_name = stand_name;
        this.price = price;
        this.capacity = capacity;
    }

    save(){
        let q = `
        INSERT INTO stands(
            event_id,
            stand_name,
            price,
            capacity
        )
        VALUES(
            '${this.event_id}',
            '${this.stand_name}',
            '${this.price}',
            '${this.capacity}'
        )
        `;

        return db.execute(q);
    }

    static findAll(){
        let q = `SELECT * FROM stands`;

        return db.execute(q);
    }

    static findById(id){
        let q = `SELECT * FROM stands WHERE stand_id = ?`;

        return db.execute(q, [id]);
    }

    static findByEventId(eventId){
        let q = `SELECT * FROM stands WHERE event_id = ?`;

        return db.execute(q, [eventId]);
    }

    static updateById(id, event_id, stand_name, price, capacity){
        let q = `
            UPDATE stands
            SET event_id = ?,
                stand_name = ?,
                price = ?,
                capacity = ?
            WHERE stand_id = ?
        `;

        return db.execute(q, [event_id, stand_name, price, capacity, id]);
    }

    static deleteById(id){
        let q = `DELETE FROM stands WHERE stand_id = ?`;

        return db.execute(q, [id]);
    }

    static updateCapacityByStandId(id, newCapacity){
        let q = `Update stands SET capacity = ? WHERE stand_id = ?`

        return db.execute(q, [newCapacity, id]);
    }
}

module.exports = Stand