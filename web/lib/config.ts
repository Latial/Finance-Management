const required = () => {
    throw new Error("Missing required environment variable")
}

const config = {
    BASE_API_PATH: process.env.NEXT_PUBLIC_API_URL || required(),
    STATIC_FILES_URL: process.env.NEXT_PUBLIC_STATIC_FILES_URL || required(),
    AUTHORIZATION_HEADER_NAME: "Authorization",
    BEARER_TOKEN_IDENTIFIER: "Bearer",
    LOCAL_STORAGE_TOKEN_KEY: "token",
}


export default config