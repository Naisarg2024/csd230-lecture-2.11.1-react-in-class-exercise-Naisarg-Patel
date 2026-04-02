import { useState } from 'react';

function Magazine({ id, title, price, orderQty, currentIssue, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempOrderQty, setTempOrderQty] = useState(orderQty || 0);
    const [tempCurrentIssue, setTempCurrentIssue] = useState(
        currentIssue ? currentIssue.split('T')[0] : ''
    );

    const handleSave = () => {
        const updatedMagazine = {
            t: tempTitle,
            p: Number(tempPrice),
            c: Number(tempOrderQty),
            o: Number(tempOrderQty),
            d: tempCurrentIssue ? `${tempCurrentIssue}T00:00:00` : null
        };

        onUpdate(id, updatedMagazine);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div style={{ border: '2px solid #4444ff', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
                <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                />
                <input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                />
                <input
                    type="number"
                    value={tempOrderQty}
                    onChange={(e) => setTempOrderQty(e.target.value)}
                />
                <input
                    type="date"
                    value={tempCurrentIssue}
                    onChange={(e) => setTempCurrentIssue(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div style={{ border: '1px solid gray', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <h3>{title}</h3>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Order Quantity:</strong> {orderQty}</p>
            <p>
                <strong>Current Issue:</strong>{' '}
                {currentIssue ? new Date(currentIssue).toLocaleDateString() : 'N/A'}
            </p>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={() => onDelete(id)} style={{ marginLeft: '10px' }}>
                Delete
            </button>
        </div>
    );
}

export default Magazine;