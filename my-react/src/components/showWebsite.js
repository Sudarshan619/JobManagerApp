import React from 'react'
import '../table1.css'
import CompanyContext from '../context/companycontext'
import { useState, useContext, useEffect } from 'react'
export default function ShowWebsite(props) {
    const context = useContext(CompanyContext);
    const [getdata,setGetData] = useState([]);
    const fetchData = async () => {
        try {    
            const ans = await context.job
            console.log(ans)
            setGetData(ans);

        } catch (error) {
            console.error('Error fetching data:', error);
            setGetData([]);
        }
    };
    useEffect(() => {
        fetchData();

    }, [context.job]);
    console.log(getdata)
    console.log(props.title)

    return (
        <div>
            <div className="container">

                <div className="table">
                    <div className="table-header">
                        <div className="header__item"><a id="name" className="filter__link" href="#">Logo</a></div>
                        <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">CompanyName</a></div>
                        <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Position</a></div>
                        <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Status</a></div>
                        <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Date</a></div>
                    </div>
                    <div className="table-content">
                        {getdata && getdata.length > 0 ? (
                            getdata.map((element, index) => (
                                <div className="table-row" key={index}>
                                    <div className="table-data">
                                        <img className='img' src={`${element.Image}`}/>
                                    </div>
                                    <div className="table-data">{element.CompanyName}</div>
                                    <div className="table-data">{element.Position}</div>
                                    <div className="table-data">{element.Status}</div>
                                    <div className="table-data">{element.Date}</div>
                                </div>
                            ))
                        ) : (
                            <p>No data</p>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}
