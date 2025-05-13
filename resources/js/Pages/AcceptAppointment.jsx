import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CheckCircle2, Clock9, Loader2, X } from 'lucide-react';

export default function AcceptAppointment({ auth }) {
    const [appointments, setAppointments] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/appointments');
            const pending = response.data.filter(a => a.status === 'pending');
            setAppointments(pending);
        } catch (error) {
            console.error('Error loading appointments', error);
        }
    };

    const openModal = (id) => {
        setSelectedId(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedId(null);
    };

    const confirmAccept = async () => {
        if (!selectedId) return;
        setLoadingId(selectedId);
        try {
            await axios.put(`/api/appointments/${selectedId}/accept`);
            fetchAppointments(); // Refresh list
            closeModal();
        } catch (error) {
            console.error('Failed to accept appointment:', error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Accept Appointments" />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Pending Appointments</h1>

                {appointments.length === 0 ? (
                    <div className="text-center text-gray-500 bg-white py-10 rounded-xl shadow border border-dashed border-gray-200">
                        <Clock9 className="mx-auto mb-2 text-gray-400" size={36} />
                        <p className="text-lg">No pending appointments at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition rounded-2xl p-6"
                            >
                                <div className="mb-3">
                                    <p className="text-sm text-gray-500">Appointment Time</p>
                                    <p className="text-lg font-medium text-gray-800">
                                        {new Date(appointment.appointment_time).toLocaleString([], {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => openModal(appointment.id)}
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-all"
                                >
                                    <CheckCircle2 size={18} />
                                    Accept
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Confirm Acceptance</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to accept this appointment?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAccept}
                                disabled={loadingId === selectedId}
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                            >
                                {loadingId === selectedId && <Loader2 className="animate-spin" size={16} />}
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
