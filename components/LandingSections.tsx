import React from 'react';
import { WhyChooseUs } from './WhyChooseUs';
import { KeyBenefits } from './KeyBenefits';
import { FAQ } from './FAQ';

export const LandingSections: React.FC = () => {
    return (
        <div className="border-t border-gray-800">
            <WhyChooseUs />
            <KeyBenefits />
            <FAQ />
        </div>
    );
}
