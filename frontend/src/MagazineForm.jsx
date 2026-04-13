import { useState } from 'react';
import axiosInstance from './api/axiosConfig';

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [orderQty, setOrderQty] = useState('');
    const [currentIssue, setCurrentIssue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedPrice = Number(price);
        const parsedOrderQty = Number(orderQty);

        if (
            !title.trim() ||
            !Number.isFinite(parsedPrice) ||
            !Number.isFinite(parsedOrderQty) ||
            !currentIssue
        ) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const newMagazine = {
            title: title.trim(),
            price: parsedPrice,
            orderQty: parsedOrderQty,
            currentIssue: `${currentIssue}T00:00:00`
        };

        try {
            const response = await axiosInstance.post('/magazines', newMagazine);
            const savedMagazine = response.data;

            alert('Magazine Saved!');
            onMagazineAdded(savedMagazine);
            setTitle('');
            setPrice('');
            setOrderQty('');
            setCurrentIssue('');
        } catch (error) {
            console.error('Error saving magazine:', error);
            alert('Failed to save magazine.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}
        >
            <h3>Add New Magazine</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                min="0"
            />

            <input
                type="number"
                placeholder="Order Quantity"
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                required
                min="0"
            />

            <input
                type="date"
                value={currentIssue}
                onChange={(e) => setCurrentIssue(e.target.value)}
                required
            />

            <button type="submit">Save to Database</button>
        </form>
    );
}

export default MagazineForm;