import * as React from 'react';
import useAuth from "../../hooks/auth/useAuth";

function PricingPage() {
    const {userData} = useAuth();

    return (
        <stripe-pricing-table
            pricing-table-id="prctbl_1NEqzCIAuES0cAL2XDhCvGuw"
            publishable-key="pk_test_51NBY8eIAuES0cAL2rOnsOU4uyLiMWcf7mgRp7gIBNua9cWOCImwf5VZWShGgIUEmzJepLAqaTg14wqrPEpblS0xV00HDWgQNGP"
            client-reference-id={userData?.id}
        >
        </stripe-pricing-table>
    );
}

export default PricingPage;