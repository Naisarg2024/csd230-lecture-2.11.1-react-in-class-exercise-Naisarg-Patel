import { useState } from 'react';

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
            t: title.trim(),
            p: parsedPrice,
            c: parsedOrderQty,
            o: parsedOrderQty,
            d: `${currentIssue}T00:00:00`
        };

        console.log('FINAL PAYLOAD:', newMagazine);

        try {
            const response = await fetch('/api/magazines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMagazine),
            });

            const data = await response.json();
            console.log('POST /api/magazines response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save magazine');
            }

            alert('Magazine Saved!');
            onMagazineAdded();
            setTitle('');
            setPrice('');
            setOrderQty('');
            setCurrentIssue('');
        } catch (error) {
            console.error(error);
            alert(error.message);
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