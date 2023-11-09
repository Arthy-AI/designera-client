import * as React from 'react';
import useAuth from "../../hooks/auth/useAuth";

function PricingPage() {
    const {userData} = useAuth();

    return (
        <stripe-pricing-table
            pricing-table-id="prctbl_1OAZODBGjIltPU3WmLtbwZww"
            publishable-key="pk_live_51O9sFoBGjIltPU3WRaSkYmGljh3a60tiOzFi1t3e75qvYhxZUniEPFB39sJSZTp7uyNFsdnhQTvVqBEocBoHmpb5007QKAa0PS"
            client-reference-id={userData?.id}
        >
        </stripe-pricing-table>
    );
}

export default PricingPage;