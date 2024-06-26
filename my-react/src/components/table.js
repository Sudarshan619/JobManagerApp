import React, { useContext, useEffect, useState ,useRef} from 'react'
import '../table.css'
// import {companyState} from '../context/companystate'
import CompanyContext from '../context/companycontext'
import Swal from 'sweetalert2'

export default function Table() {
    const a = useContext(CompanyContext);
    // const data = await a.GetData() || [];
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [position, setPosition] = useState('');
    const [date, setDate] = useState('');
    const [modal, setModal] = useState('')
    const [getdata, setGetData] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [updateIndex, setUpdateIndex] = useState(null);;
    const [search, setSearch] = useState('');
    const [id, setid] = useState('');
    const [website, setWebsite] = useState([]);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const [empty, setempty] = useState(false);


    const fetchData = async () => {
        try {
            const ans1 = await a.getWebsite();
            setWebsite(ans1)
            const ans = await a.GetData();
            setGetData(ans);

        } catch (error) {
            console.error('Error fetching data:', error);
            setGetData([]);
        }
    };
    let sum =0;
    useEffect(() => {
        fetchData();
       
    }, []);



    const handleDelete = async () => {
        if (deleteIndex !== null) {
            console.log(deleteIndex)
            await a.DeleteData(deleteIndex);
            const data = await a.GetData();
            console.log("hello")

            if (a.result) {
                // setDisplay("none");
                Swal.fire({
                    title: 'Success',
                    text: 'Job has been deleted succesfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            console.log(data)
            setGetData(data)
            setDeleteIndex(null); // Reset deleteIndex
        }
        else {
            await a.DeleteAllData();
            const data = await a.GetData();

            if (a.result) {
                // setDisplay("none");
                Swal.fire({
                    title: 'Success',
                    text: 'Job has been deleted succesfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
            setGetData(data)
            setDeleteIndex(null);
        }
    };
    const handleChange = async (e) => {
        e.preventDefault();
        const searchValue = e.target.value;
        
        
        // Debouncing the search input to limit the number of API calls
        clearTimeout(inputRef.current);
        inputRef.current = setTimeout(async () => {
          try {
            console.log(searchValue.length);
            console.log(searchValue)
            const data1 = await a.GetDataBySearch(searchValue);
            console.log(data1);
            // let data = a.table || [];
            if (!data1.length) {
                setGetData(data1);
            }
            setGetData(data1);
            console.log(data1);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }, 1000);
      };

    const handleclick = async (e) => {
        let order = await a.order;
        const letters = e.target.innerText.split(" ");
        const newletters = letters.map((element) => {
            return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
        })
        const capitalizedString = newletters.join('');
        console.log(capitalizedString);
        const data = await a.ApplyFilter(capitalizedString, order);
        setGetData(data);
    }

    const handleSelection = (e) => {
        
        setStatus(e.target.value);
    }
    const handleSubmit = async () => {

        // const EmptyFields = {
        //     name: !name,
        //     image: !image,
        //     status: !status,
        //     position: !position,
        //     date: !date

        // }

        // setEmptyFields(emptyFields)
        if (!name || !position || !image || !status || !date) {
            setempty(true);
            return;
        }
        
        a.UpdateData({ name, position, image, status, date }, id);
        const data = await a.GetData();
        setModal("modal");
        setGetData(data);
    }
    const handleSelectionWebsite = (e) => {
        console.log(e.target);
        setValue(e.target.value)
        console.log(updateIndex)
    }
    const handleAdd = async () => {
        const ans = await a.updateWebsite({updateIndex,value});
    }
    const obj = {
        "In progress": "yellow",
        "Applied": "blue",
        "Selected": "green",
        "Rejected": "red",
    }

    return (
        <>
            <div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" >
                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="staticBackdropLabel">Update Changes</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label className="dns-label">
                                    Company Name
                                    <input
                                        className="dns-input"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {setName(e.target.value); setempty(false);}}
                                        
                                        
                                    />
                                
                                </label>
                                <label className="dns-label">
                                    Position
                                    <input
                                        className="dns-input"
                                        type="text"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        required
                                    />
                                   { !position.length && <h6>This field cannot be empty</h6>}
                                </label>
                                <label className="dns-label">
                                    Status
                                    <select value={status} onChange={handleSelection}>
                                        <option value="-1">Change Status</option>
                                        <option value="In progress">In progress</option>
                                        <option value="Selected">Selected</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>

                                </label>
                                <label className="dns-label">
                                    Logo
                                    <input
                                        className="dns-input"
                                        type="file"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="dns-label">
                                    Date
                                    <input
                                        className="dns-input"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </label>
                                { empty ?<h6>Please fill all details</h6>:""}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss={modal} onClick={handleSubmit}>Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="staticBackdropLabel">{`Add ${value} to website Item`}</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to add the item
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={handleAdd} >Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2><small>Triggers on 767px</small></h2>

            <div className='search-box'>
                <button style={{ backgroundColor: "red", width: "10%", margin: "20px" }} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" >Delete All</button>

                <form className="d-flex" role="search">
                    <input ref={inputRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-2">Logo</div>
                    <div className="col col-0" onClick={handleclick} value="CompanyName">Company Name <span ><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></span></div>
                    <div className="col col-1" onClick={handleclick} value="Position">Position<span ><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></span></div>
                    <div className="col col-2" onClick={handleclick} value="Status">Status<span ><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></span></div>
                    <div className="col col-3" onClick={handleclick} value="Date">Date<span><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg><svg className="up-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></span></div>
                    <div className="col col-4">Update</div>
                    <div className="col col-4">Delete</div>
                    <div className="col col-4"></div>
                    <div className="col col-4"></div>
                </li>
                {getdata.length > 0 ? getdata.map((element, index) =>
                    <li key={index} className="table-row">
                        <div className="col col-2" data-label="Job Id"><img className="img-logo" src={element.Image}></img></div>
                        <div className="col col-0" data-label="Job Id">{element.CompanyName}</div>
                        <div className="col col-1" data-label="Customer Name">{element.Position}</div>
                        <div className="col col-2 status" data-label="Customer Name" style={{ backgroundColor: obj[element.Status] }}>{element.Status}</div>
                        <div className="col col-3" data-label="Customer Name">{element.Date.toString()}</div>
                        {/* <div className="col col-3" data-label="Amount">{element[index].image}</div> */}
                        {/* <div className="col col-4" data-label="Payment Status">Pending</div> */}
                        <div className="col col-4">
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setid(element._id)}>
                                <svg className="update" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col col-4">
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => setDeleteIndex(element._id)}>
                                <svg className="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                            </button>
                        </div>
                        <select value={value} onChange={handleSelectionWebsite} key={element}>
                            <option value="-1" disabled="true">Select website</option>
                            {website.length ? website.map((e, index) => {
                                return <option key={index} value={e.WebsiteName}>{e.WebsiteName}</option>
                            })
                                : <option value="">No Job has been added</option>}
                        </select>
                        <div className="col col-4">
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => setUpdateIndex(element._id)}>
                                Add
                            </button>
                        </div>
                    </li>
                ) : <p style={{ color: "white" }}>No Job has been added</p>}

            </ul>

        </>
    )
}
