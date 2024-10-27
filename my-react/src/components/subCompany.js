import React from 'react'
import '../App.css'
import { useContext,useState,useEffect } from 'react'
import { default as CompanyContext } from '../context/companycontext'
import { Router ,Link} from 'react-router-dom'
import Loader from "react-js-loader";
import CardLoader from './card-loader'
export default function SubCompany() {
    const [getdata,setGetData]=  useState('')
    const [load,setload] = useState(true);
    const [isloading,setloading] = useState(true);
    const [deleteIndex,setDeleteIndex] = useState('');
    const a = useContext(CompanyContext);
    const fetchData = async () => {
        try {
            const ans = await a.getWebsite();
            setGetData(ans);
            setloading(false)
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
    
    const handleload = async () =>{
        setload(false);
    }

    const handleDelete = async() =>{
        const res = await a.DeleteWebsite(deleteIndex);
        console.log(res);
        fetchData();
    }
    
    return (
        <>
         <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="staticBackdropLabel">Delete Item</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete the item.
                                Deleting this website may delete all the company related to this website
                               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleDelete} >DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
      
        <div className='website'>
        {isloading && <CardLoader/>}
        {getdata.length>0 ? getdata.map ((element,index) =><div className="card" id={index}>
        
        { load && <Loader type="spinner-cub" bgColor="black" title={"box-rotate-x"} size={100} />}
        <img src={element.Image}class="card-img-top" onLoad={handleload} style={{height:"16rem"}} alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{element.WebsiteName}</h5>
                <h6 class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h6>
                <div className='website-card'>
                <Link to= "/showWebsite" class="btn btn-primary visit"  onClick={()=>{
                   handleClick(element.WebsiteName)
                }}>Visit<svg style={{width:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z"/></svg>
                </Link>
                <button type="button" className="btn visit-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => {setDeleteIndex(element._id) ; console.log(deleteIndex)}}>
                    <svg className="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                </button>
                <button type="button" className="btn visit-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => {setDeleteIndex(element._id) ; console.log(deleteIndex)}}>
                <svg className="update" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                </svg>
                </button>
                </div>
            </div>
      </div>)
    :(!isloading && <p>No result found</p>)}
    </div>
   
   
    </>
    )
}
