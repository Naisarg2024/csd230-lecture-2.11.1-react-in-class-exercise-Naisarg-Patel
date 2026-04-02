import { useState } from 'react';

function Electronics({ id, name, price, stock, brand, category, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempStock, setTempStock] = useState(stock);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempCategory, setTempCategory] = useState(category);

    const handleSave = () => {
        const updatedElectronic = {
            name: tempName,
            price: parseFloat(tempPrice),
            stock: parseInt(tempStock, 10),
            brand: tempBrand,
            category: tempCategory
        };

        onUpdate(id, updatedElectronic);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div
                style={{
                    border: '2px solid #4444ff',
                    margin: '10px 0',
                    padding: '15px',
                    borderRadius: '8px'
                }}
            >
                <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Name"
                />

                <input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    placeholder="Price"
                />

                <input
                    type="number"
                    value={tempStock}
                    onChange={(e) => setTempStock(e.target.value)}
                    placeholder="Stock"
                />

                <input
                    type="text"
                    value={tempBrand}
                    onChange={(e) => setTempBrand(e.target.value)}
                    placeholder="Brand"
                />

                <select
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                >
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile">Mobile</option>
                </select>

                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div
            style={{
                border: '1px solid gray',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px'
            }}
        >
            <h3>{name}</h3>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Stock:</strong> {stock}</p>
            <p><strong>Brand:</strong> {brand}</p>
            <p><strong>Category:</strong> {category}</p>

            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={() => onDelete(id)} style={{ marginLeft: '10px' }}>
                Delete
            </button>
        </div>
    );
}

export default Electronics;