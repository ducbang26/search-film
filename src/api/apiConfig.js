const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4f60185c585c69c847c6c83048cb86ab',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;