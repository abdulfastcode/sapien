import { useSelector } from "react-redux";

export const baseUrl = 'https://api.smallest.ai'


 let token = localStorage.getItem('auth_token')
export const headers = {
    Authorization:
        // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc`,
        `Bearer ${token}`,
};