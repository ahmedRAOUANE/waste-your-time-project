import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const user = auth.currentUser;

    useEffect(() => {
        const fetchTheme = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "usersProfile", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setTheme(userData.theme || 'light');
                    document.documentElement.setAttribute('data-theme', userData.theme || 'light');
                }
            } else {
                const savedTheme = localStorage.getItem('theme') || 'light';
                setTheme(savedTheme);
                document.documentElement.setAttribute('data-theme', savedTheme);
            }
        };

        fetchTheme();
    }, [user]);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        if (user) {
            await setDoc(doc(db, "usersProfile", user.uid), { theme: newTheme }, { merge: true });
        } else {
            localStorage.setItem('theme', newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
