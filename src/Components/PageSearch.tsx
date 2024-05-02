import './PageSearch.css';


interface Props{
    totalPages:number;
    handleEvent : (e:React.ChangeEvent<HTMLInputElement>) => void
}


export const PageSearch = (props:Props) => {
    
    return(
        <div className='box'>
            <span><input type="text"  onChange={props.handleEvent}/></span>/{props.totalPages} 
        </div>
        
    )
}

