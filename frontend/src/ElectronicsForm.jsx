import { useState } from 'react';

function ElectronicsForm({ onElectronicAdded }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Laptop');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stock, 10);

        if (
            !name.trim() ||
            !brand.trim() ||
            Number.isNaN(parsedPrice) ||
            Number.isNaN(parsedStock)
        ) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const newElectronic = {
            name: name.trim(),
            price: parsedPrice,
            stock: parsedStock,
            brand: brand.trim(),
            category
        };

        fetch('/api/electronics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newElectronic),
        })
            .then(response => response.json())
            .then(savedElectronic => {
                alert('Electronic Item Saved!');
                onElectronicAdded(savedElectronic);
                setName('');
                setPrice('');
                setStock('');
                setBrand('');
                setCategory('Laptop');
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}
        >
            <h3>Add New Electronic Item</h3>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
            </select>

            <button type="submit">Save to Database</button>
        </form>
    );
}

export default ElectronicsForm;