import axios from "axios"

export const axiosInstance = axios.create({
    // Добавляем /api в конец, чтобы не прописывать его в каждом сервисе
    baseURL: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : '/api',
})