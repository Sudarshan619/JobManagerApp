import React, { useState } from 'react'
import '../home.css'
import { useEffect } from 'react'
import Loader from "react-js-loader";

export default function Home() {
    const fetchnews = async () => {
        const key = process.env.REACT_APP_API_KEY;
        const url= `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=${key}`
        // let url = "https://newsapi.org2/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=141e8059d4d14ad7960823296f7b3bce"
        console.log(url);
        
        const res = await fetch(url);
        const result = await res.json();

        if (result.articles) {
            setArticles(result.articles);
        } else {
            console.error("Invalid API response:", result);
        }

    }

    const [Loading,setLoading] = useState(true);
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetchnews();
    },[]);

    const handleLoad = ()=>{
        setLoading(false);
    }
    return (

        <>
            <div className='container'>
                <div className='left'>
                    
                    <span className='span1'>Welcome to Job Manager</span> – your solution for seamless work application management. Streamline updates, troubleshoot with ease, and optimize performance effortlessly. Explore how we redefine efficiency in handling work applications, putting you in control. Welcome to a more productive workflow.
                </div>
                <div className='right'>
                    <img className="img-work" src='https://shantiasiaticahmedabad.com/images/careers.png'></img>
                </div>

            </div>
            <div>

                <div className='home-div'>

                    {articles.length > 0 ? (
                        articles.map((element, index) => (
                            // <div key={index} title={element.title} description={element.desc}>

                            // </div>
                            <article key={index}>
                                <div className="hero">
                                    {Loading && <Loader/>}
                                    <img src={element.urlToImage?element.urlToImage:"no-image.png"} className='img-left' onLoad={handleLoad}></img>
                                </div>
                                <div className="content">
                                <span className="badge rounded-pill text-bg-info">{element.source.name}</span>
                                    <h3>
                                       {element.title}
                                    </h3>
                                    <div className="content__header">
                                        <h4>{element.description}</h4>
                                        <span style={{color:"red"}}>{element.author}</span>
                                    </div>
                                    <div className="content__copy">
                                        
                                        <p>
                                           {element.content}
                                        </p>
                                    </div>
                                    
                                </div>
                            </article>
                        ))
                    ) : (
                        <p>Loading articles...</p>
                    )}
                </div>
            </div>
            <footer className="footer">
     <div className="container1">
      <div className="row">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li><a href="#">about us</a></li>
            <li><a href="#">our services</a></li>
            <li><a href="#">privacy policy</a></li>
            <li><a href="#">affiliate program</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">shipping</a></li>
            <li><a href="#">returns</a></li>
            <li><a href="#">order status</a></li>
            <li><a href="#">payment options</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>online shop</h4>
          <ul>
            <li><a href="#">watch</a></li>
            <li><a href="#">bag</a></li>
            <li><a href="#">shoes</a></li>
            <li><a href="#">dress</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
     </div>
  </footer>
        </>

    )
}
