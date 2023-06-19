import * as React from 'react';
import useAuth from "../../hooks/auth/useAuth";

function PricingPage() {
    const {userData} = useAuth();

    return (
        <stripe-pricing-table
            pricing-table-id="prctbl_1NKnSFIAuES0cAL2z2RDp9TB"
            publishable-key="pk_live_51NBY8eIAuES0cAL2BU8QIkve8Ov5bpjJ8NDr5Yd5Ybz945H2uzYUTU5MpiQkSYFF2T3MQPlcBw4gJk6ntv07724a00QJPvz3um"
            client-reference-id={userData?.id}
        >
        </stripe-pricing-table>
    );
}

export default PricingPage;