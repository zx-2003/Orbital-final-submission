import { useState } from 'react';

const dealOptions = [
    'BOGO',
    'Bundle',
    'Discount',
    'Freebie',
    'Others'
]

export default function PromotionFilter({ onFilter }) {
    const [selectedDealTypes, setSelectedDealTypes] = useState([]);
    const [periodType, setPeriodType] = useState('all');

    const toggleDealType = (type) => {
        setSelectedDealTypes(prev =>
            prev.includes(type) //check whether already selected
                ? prev.filter(t => t !== type) //unselect the item if was previously selected (unchecking)
                : [...prev, type] //add the item if newly selected (checking)
        );
    };

    const handleSubmit = () => {
        const filters = {};
        if (selectedDealTypes.length > 0) {
            filters.deal_type = selectedDealTypes;
        }
        if (periodType !== 'all') { //if all, ignore
            filters.period_type = periodType;
        }

        onFilter(filters);
    };

    return (
        <div>
            <fieldset style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <legend style={{ fontSize: '20px' }}>
                    Deal Types
                </legend>
                {dealOptions.map(type => (
                    <label key={type}>
                        <input
                            type='checkbox'
                            checked={selectedDealTypes.includes(type)} //checkbox T/F
                            onChange={() => toggleDealType(type)} //checking and unchecking handler
                            style={{ marginRight: '4px' }}
                        />
                        {type}
                    </label>
                ))}
            </fieldset>

            <fieldset style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <legend style={{ fontSize: '20px' }}>
                    Period
                </legend>

                <label>
                    <input
                        type='radio'
                        value='all'
                        checked={periodType === 'all'} //radio T/F
                        onChange={(e) => setPeriodType(e.target.value)}
                        style={{ marginRight: '4px' }}
                    />
                    All
                </label>

                <label>
                    <input
                        type='radio'
                        value='today'
                        checked={periodType === 'today'}
                        onChange={(e) => setPeriodType(e.target.value)}
                        style={{ marginRight: '4px' }}
                    />
                    Today
                </label>

                <label>
                    <input
                        type='radio'
                        value='upcoming'
                        checked={periodType === 'upcoming'}
                        onChange={(e) => setPeriodType(e.target.value)}
                        style={{ marginRight: '4px' }}
                    />
                    Upcoming
                </label>
            </fieldset>

            <button onClick={handleSubmit}>
                Apply Filters
            </button>
        </div>
    )
}