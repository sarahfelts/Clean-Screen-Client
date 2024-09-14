import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
    });
        return () => unsubscribe();
    }, []);

    return (
        <div>
        {user ? (
            <div>Welcome to your profile, {user.email}</div>
        ) : (
            <div>Please log in</div>
        )}
        </div>
    );
};

export default Profile;
