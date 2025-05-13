import React, { useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CalendarPlus, Loader2 } from 'lucide-react';

export default function CreateAppointment({ auth }) {
    const [appointmentTime, setAppointmentTime] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage('');
        setErrorMessage('');

        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/appointments', {
                appointment_time: appointmentTime,
            }, { withCredentials: true });

            setStatusMessage('✅ Appointment successfully created!');
            setAppointmentTime('');
        } catch (error) {
            console.error('Failed to create appointment:', error);
            setErrorMessage('❌ Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Schedule Appointment" />
            <div className="max-w-xl mx-auto py-12 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                        Schedule New Appointment
                    </h1>
                    <p className="text-gray-600 text-center mb-6">
                        Select a date and time to book your appointment.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="appointment" className="block text-sm font-medium text-gray-700 mb-1">
                                Appointment Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                id="appointment"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition ${
                                loading ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <CalendarPlus size={20} />}
                            {loading ? 'Creating...' : 'Create Appointment'}
                        </button>

                        {statusMessage && (
                            <p className="text-sm text-green-600 text-center">{statusMessage}</p>
                        )}
                        {errorMessage && (
                            <p className="text-sm text-red-600 text-center">{errorMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
