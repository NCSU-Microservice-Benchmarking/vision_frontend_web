export const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: '';

export const hostUrl = (process.env.NODE_ENV === 'production') 
? ""
: "http://localhost:3000";