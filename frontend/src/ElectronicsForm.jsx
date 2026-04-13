import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import axiosInstance from './api/axiosConfig';

function ElectronicsForm({ onElectronicAdded }) {
    const { isAdmin } = useAuth();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Laptop');

    const handleSubmit = async (e) => {
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

        try {
            const response = await axiosInstance.post('/electronics', newElectronic);
            const savedElectronic = response.data;

            alert('Electronic Item Saved!');
            onElectronicAdded(savedElectronic);

            setName('');
            setPrice('');
            setStock('');
            setBrand('');
            setCategory('Laptop');
        } catch (error) {
            console.error('Error saving electronic item:', error);
            alert('Failed to save electronic item.');
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Electronic Item</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />

            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
            </select>

            <button type="submit">Save Electronic Item</button>
        </form>
    );
}

export default ElectronicsForm;