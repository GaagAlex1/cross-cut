import React from 'react';

const Snowflakes: React.FC = () => (
    <div className="snowflakes" aria-hidden="true">
        {Array(5)
            .fill(0)
            .map((_, idx) => (
                <div key={idx} className="snowflake">
                    ❄
                </div>
            ))}
    </div>
);

export default Snowflakes;
