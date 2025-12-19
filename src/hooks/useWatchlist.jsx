import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = 'http://127.0.0.1:8000/api/auth/watchlist/';

export const useWatchlist = () => {
    const {tokens, user, fetchUserProfile } = useContext(AuthContext);

    const watchlist = Array.isArray(user?.saved_movies)
    ? user.saved_movies
    : [];

    const addToWatchlist = async (movieId) => {
        if (!tokens?.access) return;
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokens.access}` },
            body: JSON.stringify({movie_id: movieId }),
        });
        if (!res.ok) {
            fetchUserProfile(tokens.access);
        }
    }

    const removeFromWatchlist = async (movieId) => {
        if (!tokens?.access) return;
        const res = await fetch(API_URL, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${tokens.access}` },
            body: JSON.stringify({movie_id: movieId }),
        });
        if (!res.ok) {
            fetchUserProfile(tokens.access);
        }
    };

    useEffect(() => {
    }, [tokens]);

    return {watchlist, addToWatchlist, removeFromWatchlist};
};