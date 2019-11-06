import React, { useState } from 'react';
import pukingUnicorn from '@/images/pukingUnicorn.jpg';
import pukingUnicorn2 from '@/images/pukingUnicorn2.jpg';

const EnergyGenerationUnicorn: React.FC = () => {
    const [pukingUnicornImg, setPukingUnicornImg] = useState(pukingUnicorn);

    const updateUnicorn = () => {
        pukingUnicornImg === pukingUnicorn
            ? setPukingUnicornImg(pukingUnicorn2)
            : setPukingUnicornImg(pukingUnicorn);
    };

    return (
        <>
            <div className="container unicorn-container mt-5">
                <h4>And of course giant unicorn's rainbow puke!!</h4>
                <div className="col-xs-6">
                    <span className="cursor-pointer">
                        <img
                            className="unicorn-image"
                            src={pukingUnicornImg}
                            alt="puking unicor"
                            onClick={updateUnicorn}
                        />
                    </span>
                </div>
            </div>
        </>
    );
};

export default EnergyGenerationUnicorn;
