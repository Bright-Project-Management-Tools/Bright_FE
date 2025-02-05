import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const ConfirmPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tokenHash = queryParams.get('token_hash');
    const type = queryParams.get('type');
    const next = queryParams.get('next');
    const hasConfirmed = useRef(false);

    const confirmToken = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/auth/confirm?token_hash=${tokenHash}&type=${type}&next=${next || '/'}`);
            const data = res.data;

            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.error('Error confirming token:', error);
        }
    };

    useEffect(() => {
        if (tokenHash && type && !hasConfirmed.current) {
            hasConfirmed.current = true;
            confirmToken();
        } else {
            console.error('Token hash or type is missing');
        }
    }, [tokenHash, type, next, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="text-xl font-medium text-black">Redirecting...</div>
                </div>
                <p className="text-gray-500">Please wait while we redirect you to the appropriate page.</p>
            </div>
        </div>
    );
};
