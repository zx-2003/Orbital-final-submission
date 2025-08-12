import { useEffect, useState } from 'react';
import PromotionList from '../components/PromotionList';
import PromotionFilter from '../components/PromotionFilter';
import LoadingIndicator from '../components/LoadingIndicator';
import PopUpFilter from '../components/PopUpFilter';
import { promotionsApi } from '../api/promotion'
import NavigationBar from '../components/NavBar';

export default function Promotion() {

    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [filterPopUp, setFilterPopUp] = useState(false);


    const loadPromotions = async (filterParams = {}) => {
        setLoading(true);
        try {
            const results = await promotionsApi.getAllPromotions(filterParams); //pass the filters selected when getting promotions through API
            console.log("Fetched Promotion:", results.data);
            setPromotions(results.data);
        } catch (error) {
            console.error('Error fetching promotions', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { //initial load, default with no filters on page ins since filters init state is {}
        loadPromotions(filters);
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setFilterPopUp(false); 
    };



    return (
        <div>
            <NavigationBar />
            <h1>
                Food Promotions
            </h1>
            <button onClick={() => setFilterPopUp(true)}>
                Filter Promotions
            </button>
            {filterPopUp && (
                <PopUpFilter onClose={() => setFilterPopUp(false)}> 
                    <PromotionFilter onFilter={handleFilterChange} />
                </PopUpFilter>
            )}
            {loading
                ? <LoadingIndicator />
                : <PromotionList promotions={promotions} />}
        </div>
    )
}