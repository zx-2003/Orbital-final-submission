export default function PopUpFilter({ onClose, children }) { 
    return (
        <div>
            <div style={{ //for the popup box
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '8px',
                minWidth: '200px',
                position: 'absolute',
                background: '#fff'
            }}
                onClick={(e) => e.stopPropagation()}> {/* stops popup from closing when clicking inside */}
                <button 
                    style={{
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                        position: 'absolute',
                        borderRadius: '6px',
                        fontSize: '12px'
                    }}
                    onClick={onClose} //exit before apply change option to close popup
                >
                    X {/* it will look like a cheeto without this X */}
                </button>
                {children}
            </div>
        </div>
    );
}