import React from 'react'
import '../App.css'
import { useContext,useState,useEffect } from 'react'
import { default as CompanyContext } from '../context/companycontext'
import { Router ,Link} from 'react-router-dom'
export default function SubCompany() {
    const [getdata,setGetData]=  useState('')
    const a = useContext(CompanyContext);
    const fetchData = async () => {
        try {
            const ans = await a.getWebsite();
            setGetData(ans);
        } catch (error) {
            console.error('Error fetching data:', error);
            setGetData([]);
        }
    };
    useEffect(() => {
        fetchData();
        
    }, []);
    
    const handleClick = async (data)=>{
        const ans = await a.getWebsiteByJob(data);
        await a.setWebsiteJob(ans);
        console.log(ans);
    }
    
    
    return (
        <>
      
        <div className='website'>
        {getdata.length>0 ? getdata.map (element =><div class="card">
        <img src={element.Image}class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{element.WebsiteName}</h5>
                <h6 class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h6>
                <Link to= "/showWebsite" class="btn btn-primary" onClick={()=>{
                   handleClick(element.WebsiteName)
                }}>Go somewhere</Link>
            </div>
      </div>)
    :<p>No result found</p>}
    </div>

   
    </>
    )
}
