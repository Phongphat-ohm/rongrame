import React, { useState, useEffect } from 'react';

function Notfound() {
    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="text-5xl">
                    404
                </div>
                <br />
                <div className="text-3xl">
                    Page Not Found
                </div>
                {/* <a href="\" className="text-gray-500">Go to home page</a> */}
            </div>
        </> 
    );
}

export default Notfound;