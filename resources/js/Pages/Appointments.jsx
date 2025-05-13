import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CalendarDays, Clock, User, Mail } from 'lucide-react';

export default function Appointments({ auth }) {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.get('/api/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments', error);
        }
    };

    const getStatusBadge = (status) => {
        const base = 'px-3 py-1 rounded-full text-sm font-semibold';
        switch (status) {
            case 'accepted':
                return `${base} bg-green-100 text-green-700`;
            case 'pending':
                return `${base} bg-yellow-100 text-yellow-700`;
            case 'cancelled':
                return `${base} bg-red-100 text-red-700`;
            default:
                return `${base} bg-gray-100 text-gray-600`;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Appointments" />

            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Your Appointments
                </h1>

                {appointments.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-lg">You don't have any appointments yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {appointments.map((app) => (
                            <div
                                key={app.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <User className="text-gray-500" size={20} />
                                    <p className="text-gray-800 font-medium">
                                        {app.user?.name || 'Unknown'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 mb-2">
                                    <Mail className="text-gray-500" size={20} />
                                    <p className="text-gray-700">{app.user?.email || 'N/A'}</p>
                                </div>

                                <div className="flex items-center gap-3 mb-2">
                                    <CalendarDays className="text-gray-500" size={20} />
                                    <p className="text-gray-700">
                                        {new Date(app.appointment_time).toLocaleString()}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    <span className={getStatusBadge(app.status)}>{app.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
