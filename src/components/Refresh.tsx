import React from 'react';
import { GrRefresh } from 'react-icons/gr';

interface RefreshProps {
    handleRefresh: () => void;
}

function Refresh({handleRefresh}: RefreshProps) {
    return (
        <span className='btn-refresh' onClick={handleRefresh}>
                <GrRefresh />
        </span>
    )
}

export default Refresh;