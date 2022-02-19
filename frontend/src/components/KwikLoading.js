import React from 'react';


function KwikLoading(Component) {
    return function KwikLoadingComponent({ isloading, ...props }) {
        if (!isloading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                We are waiting for the data to load!...
            </p>
        );
    };
}

export default KwikLoading;