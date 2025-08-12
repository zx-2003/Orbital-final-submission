import { useState } from 'react';

const preferenceOptions = [
    "italian",
    "japanese",
    "thai",
    "indian",
    "chinese",
    "mexican",
    "korean",
    "french",
    "african",
    "american",
    "asian",
    "brazilian",
    "greek",
    "indonesian",
    "spanish",
    "turkish",
    "mediterranean",
    "lebanese",
    "middle_eastern",
]

const priceOptions = [
    "FREE",
    "INEXPENSIVE",
    "MODERATE",
    "EXPENSIVE",
    "VERY_EXPENSIVE"
]

function title(str) {
    var split = str.split("_")
    for (let i = 0; i < split.length; i++) {
        split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase()
    }
    return split.join(" ")
}


export default function FoodMapFilter({ onFilter, initialFilters = {} }) {
    const [selectedPreferences, setSelectedPreferences] = useState(initialFilters.preference || []);
    const [rating, setRating] = useState(initialFilters.rating || 0.5);
    const [selectedPrices, setSelectedPrices] = useState(initialFilters.price || [])
    
    const togglePreference = (preference) => {
        setSelectedPreferences(prev =>
            prev.includes(preference) //check whether already selected
                ? prev.filter(p => p !== preference) //unselect the item if was previously selected (unchecking)
                : [...prev, preference] //add the item if newly selected (checking)
        );
    };

    const togglePrice = (price) => {
        setSelectedPrices(prev =>
            prev.includes(price) 
                ? prev.filter(p => p !== price) 
                : [...prev, price]
        );
    };
    

    const handleSubmit = () => {
        const filters = {};
        if (selectedPreferences.length > 0) {
            filters.preference = selectedPreferences;
        }
        if (selectedPrices.length > 0) {
            filters.price = selectedPrices;
        }
        filters.rating = rating;

        onFilter(filters);
    };

    return (
        <div>
            <fieldset style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <legend style={{ fontSize: '20px' }}>
                    Preference
                </legend>
                {preferenceOptions.map(preference => (
                    <label key={preference}>
                        <input
                            type='checkbox'
                            checked={selectedPreferences.includes(preference)} //checkbox T/F
                            onChange={() => togglePreference(preference)} //checking and unchecking handler
                            style={{ marginRight: '4px' }}
                        />
                        {title(preference)}
                    </label>
                ))}
            </fieldset>

            <fieldset style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <legend style={{ fontSize: '20px' }}>
                    Price
                </legend>
                {priceOptions.map(price => (
                    <label key={price}>
                        <input
                            type='checkbox'
                            checked={selectedPrices.includes(price)} 
                            onChange={() => togglePrice(price)} 
                            style={{ marginRight: '4px' }}
                        />
                        {title(price)}
                    </label>
                ))}
            </fieldset>

            <fieldset style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <legend style={{ fontSize: '20px' }}>
                    Rating
                </legend>

                <label>
                    <input
                        type='radio'
                        value='default'
                        checked={rating === 0.5}
                        onChange={() => setRating(0.5)}
                        style={{ marginRight: '4px' }}
                    />
                    Any
                </label>

                {[3.0, 3.5, 4.0, 4.5].map(rate => (
                    <label key={rate}>
                        <input
                            type='radio'
                            value={rate}
                            checked={rating === rate}
                            onChange={(e) => setRating(parseFloat(e.target.value))} //parse radio's value from string to float
                            style={{ marginRight: '4px' }}
                        />
                        Above {rate}
                    </label>
                ))}
            </fieldset>

            <button onClick={handleSubmit}>
                Save Filters
            </button>
        </div>
    )
}