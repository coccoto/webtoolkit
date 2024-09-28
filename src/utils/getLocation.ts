export default async () => {
    if (process.env['ENVIRONMENT'] === 'development') {
        return 'http://localhost:18010'

    } else if (process.env['ENVIRONMENT'] === 'production') {
        return 'https://webtoolkit'

    } else {
        console.error('error')
        return null
    }
}