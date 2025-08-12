import PlaceDetailCard from "./PlaceDetailCard";

export default function FoodList({ results, onCardClick, selectedPlace }) {
  return (
    <div style={{ padding: "20px", overflowY: "auto", maxHeight: "90vh" }}>
      <h3>Results</h3>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : ( //populate with detailcards
        results.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          return (
            <div
              key={JSON.stringify(place)} //cannot use idx here as it preserves state, need to match exact so review doesnt stay open on new search
              onClick={() => onCardClick(place)}
              style={{
                cursor: "pointer", 
                boxShadow: isSelected ? "0 0px 6px rgba(252, 121, 7, 0.8)" : "none", //highlight if selected
                borderRadius: "8px"
              }}
            >
              <PlaceDetailCard place={place} />
            </div>
          );
        })
      )}
    </div>
  );
}