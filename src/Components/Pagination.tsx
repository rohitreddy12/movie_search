
import Pagination from 'react-bootstrap/Pagination';
import './Pagination.css';

interface Props {
    total_pages: number 
    curr: number
    btnclick: (e: number) => void
}

const Pagin = (props: Props) => {



    return (
        <div>
            <div>
                <Pagination>

                    {props.curr>1 && <Pagination.Prev bsPrefix='item'  onClick={() => { props.btnclick(props.curr - 1) }} /> }
                    {props.curr !=1 && <Pagination.Item  onClick={() => { props.btnclick(1) }}>{1}</Pagination.Item>}
                    {props.curr > 4 && <Pagination.Ellipsis onClick={() => { props.btnclick(props.curr - 2) }} />}

                    {props.curr > 3 && <Pagination.Item onClick={() => { props.btnclick(props.curr - 2) }}>{props.curr - 2}</Pagination.Item>}
                    {props.curr > 2 && <Pagination.Item onClick={() => { props.btnclick(props.curr - 1) }}>{props.curr - 1}</Pagination.Item>}
                    <Pagination.Item  active onClick={() => { props.btnclick(props.curr) }}>{props.curr}</Pagination.Item>
                    {(props.curr < props.total_pages - 1) && <Pagination.Item onClick={() => { props.btnclick(props.curr + 1) }}>{props.curr + 1}</Pagination.Item>}
                    {(props.curr < props.total_pages - 2) && <Pagination.Item onClick={() => { props.btnclick(props.curr + 2) }}>{props.curr + 2}</Pagination.Item>}


                    {props.curr <= props.total_pages - 4 && <Pagination.Ellipsis onClick={() => { props.btnclick(props.curr + 2) }} />}
                    {props.curr != props.total_pages && <Pagination.Item active={props.curr === props.total_pages} onClick={() => { props.btnclick(props.total_pages) }}>{props.total_pages}</Pagination.Item>}
                    {props.curr != props.total_pages && <Pagination.Next onClick={() => props.btnclick(props.curr + 1)} />}

                </Pagination>
            </div>



        </div>
    )

}


export default Pagin;







