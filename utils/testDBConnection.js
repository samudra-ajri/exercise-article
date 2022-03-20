export default async (db) => {
    try {
        await db.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}