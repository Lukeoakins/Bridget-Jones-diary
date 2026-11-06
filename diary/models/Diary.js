const db = require('../db/connect')

class Diary {
    constructor({
        id,
        title,
        entry_date,
        entry_body
    }){
        this.id = id
        this.title = title
        this.entry_date = entry_date
        this.entry_body = entry_body
    }

    static async getAll(){
        const response = await db.query('SELECT * FROM entries;')
        if (response.rows.length === 0){
            throw new Error('No entries available')
        }
        return response.rows.map(e => new Diary(e))
    }

    static async getOneById(entryId){
        const response = await db.query('SELECT * FROM entries WHERE id = $1;', 
            [entryId]  
        )
        if (response.rows.length != 1){
            throw new Error('Unable to locate entry')
        }
        return new Diary(response.rows[0]) 
    }
    static async create(data){
        const {title, entry_date, entry_body} = data
        const existingDiary = await db.query('SELECT title FROM entries WHERE LOWER(title) = LOWER($1);',[title])
        if (existingDiary.rows.length === 0){
            let response = await db.query('INSERT INTO entries (title, entry_date, entry_body) VALUES ($1, $2, $3) RETURNING *;',
                [title, entry_date, entry_body]
            
            )
            return new Diary(response.rows[0])
        } else{
                throw new Error('This entry already exists')
            }
        }
    async update(data){
        const title = data.title || this.title
        const entry_date = data.entry_date || this.entry_date
        const entry_body = data.entry_body || this.entry_body
        const response = await db.query('UPDATE entries SET title = $1, entry_date =$2, entry_body = $3 WHERE id = $4 RETURNING *;',
            [title,entry_date,entry_body,this.id])
        return new Diary(response.rows[0]
        )
    }
    async destroy(){
        let response = await db.query('DELETE FROM entries WHERE id = $1 RETURNING *;', 
            [this.id]
        )
        return new Diary(response.rows[0])
    }

}

module.exports = Diary