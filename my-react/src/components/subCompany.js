import React from 'react'
import '../App.css'
import { useContext,useState,useEffect } from 'react'
import { default as CompanyContext } from '../context/companycontext'
import { Router ,Link} from 'react-router-dom'
import Loader from "react-js-loader";
export default function SubCompany() {
    const [getdata,setGetData]=  useState('')
    const [load,setload] = useState(true);
    const [deleteIndex,setDeleteIndex] = useState('');
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
    
    const handleload = async () =>{
        setload(false);
    }

    const handleDelete = async() =>{
        const res = a.DeleteWebsite(deleteIndex);
        // fetchData();
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
                                Are you sure you want to delete the item
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
        {getdata.length>0 ? getdata.map ((element,index) =><div className="card" id={index}>
        
        { load && <Loader type="spinner-cub" bgColor="black" title={"box-rotate-x"} size={100} />}
        <img src={element.Image}class="card-img-top" onLoad={handleload} alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{element.WebsiteName}</h5>
                <h6 class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</h6>
                <div className='website-card'>
                <Link to= "/showWebsite" class="btn btn-primary" onClick={()=>{
                   handleClick(element.WebsiteName)
                }}>Go somewhere
                </Link>
                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => {setDeleteIndex(element._id) ; console.log(deleteIndex)}}>
                    <svg className="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                </button>
                </div>
            </div>
      </div>)
    :<p>No result found</p>}
    </div>

   
    </>
    )
}
