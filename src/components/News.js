import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


// import PropTypes from 'prop-types'

const News=(props)=> {
    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)
    
  
    


     const upDateNews =async()=>{
        // props.setProgress(10);
        let url1 = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ab07c9fb6a604302ba1aac0370bee2e0&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url1);
        // props.state.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `NewsMonkey - ${props.category}`;
        upDateNews()
    },[])


   
    // const handlePreviousClick = async()=> {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ab07c9fb6a604302ba1aac0370bee2e0&page=${page - 1}&pageSize=${props.pageSize}`
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({loading:false});
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     page: page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     setPage(page-1)
    //     upDateNews();
        
    // }

    // const handleNextClick = async ()=>{
    //     if(page + 1>Math.ceil(totalResults/`${props.pageSize}`)){

    //     }else{
    //         // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ab07c9fb6a604302ba1aac0370bee2e0&page=${page + 1}&pageSize=${props.pageSize}`
    //         // this.setState({loading:true});
    //         // let data = await fetch(url);
    //         // let parsedData = await data.json();
    //         // this.setState({loading:true});
    //         // this.setState({
    //         //     page: page + 1,
    //         //     articles: parsedData.articles,
    //         //     loading: false
    //         // })
    //        setPage(page+1)
    //         upDateNews();
            
    //     }
        
    // }

    const fetchMoreData =  async() => {
           
            let url1 = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ab07c9fb6a604302ba1aac0370bee2e0&page=${page + 1}&pageSize=${props.pageSize}`
            setPage(page+1)
            setLoading(true)
            let data = await fetch(url1);
            let parsedData = await data.json();
            console.log(parsedData);
            setArticles(articles.concat(parsedData.articles))
            setTotalResults(parsedData.totalResults)
            setLoading(false)
      };

    
 
    return (
        <>
        
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey - Top Headlines</h1>
        {loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        
        <div className='container'>
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-sm-12 col-lg-4 my-4 " key = {element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl= {element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} newsurl={element.url}/> 
                </div>
            
        })}
        </div>
        </div>
       
        
        </InfiniteScroll>
        
        
        {/* <div className="container d-flex justify-content-between"> 
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={page + 1>Math.ceil(totalResults/`${props.pageSize}`)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

     
        </>
      
    )
  } 


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
