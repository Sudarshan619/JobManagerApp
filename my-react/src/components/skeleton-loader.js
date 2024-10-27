import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../App.css'

const SkeletonLoader = ({ array }) => {
    return (
        <>
            <div className='skeleton-body'>
                {array.length > 0 ? (
                    array.map((item, index) => (
                        <SkeletonTheme key={index} baseColor="#5f6368" highlightColor="#444">
                            <div className="skeleton-loader">
                            <div className= "react-loading-skeleton icon">
                                    <Skeleton height={80} />
                                </div>
                                <div className={`col col-3`}>
                                    <Skeleton height={40} />
                                </div>
                                <div className={`col col-0`}>
                                    <Skeleton height={40} />
                                </div>
                               
                                <div className={`col col-2`}>
                                    <Skeleton height={40} />
                                </div>
                                <div className={`col col-2`}>
                                    <Skeleton height={40} />
                                </div>
                                <div className={`col col-2`}>
                                    <Skeleton height={40} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default SkeletonLoader;
