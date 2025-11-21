import React from 'react';

export default function FormInput({ label, register, name, type = 'text', error, ...rest }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>{label}</label>
            <input {...register(name)} type={type} {...rest} style={{ padding: '0.5rem', width: '100%' }} />
            {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error.message}</p>}
        </div>
    );
}
