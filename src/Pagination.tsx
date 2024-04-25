
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
    total_pages: number
    curr: number
    btnclick: (e: number) => void
}

const Pagin = (props: Props) => {

    const [search, setSearch] = useState<number>()


    return (
        <div className='pagination'>
            <div>
                <Pagination>

                    <Pagination.Prev onClick={() => { props.btnclick(props.curr - 1) }} />
                    {props.curr != 1 && <Pagination.Item onClick={() => { props.btnclick(1) }}>{1}</Pagination.Item>}
                    {props.curr > 4 && <Pagination.Ellipsis onClick={() => { props.btnclick(props.curr - 2) }} />}

                    {props.curr > 3 && <Pagination.Item onClick={() => { props.btnclick(props.curr - 2) }}>{props.curr - 2}</Pagination.Item>}
                    {props.curr > 2 && <Pagination.Item onClick={() => { props.btnclick(props.curr - 1) }}>{props.curr - 1}</Pagination.Item>}
                    <Pagination.Item active onClick={() => { props.btnclick(props.curr) }}>{props.curr}</Pagination.Item>
                    {(props.curr < props.total_pages - 1) && <Pagination.Item onClick={() => { props.btnclick(props.curr + 1) }}>{props.curr + 1}</Pagination.Item>}
                    {(props.curr < props.total_pages - 2) && <Pagination.Item onClick={() => { props.btnclick(props.curr + 2) }}>{props.curr + 2}</Pagination.Item>}


                    {props.curr <= props.total_pages - 4 && <Pagination.Ellipsis onClick={() => { props.btnclick(props.curr + 2) }} />}
                    {props.curr != props.total_pages && <Pagination.Item active={props.curr === props.total_pages} onClick={() => { props.btnclick(props.total_pages) }}>{props.total_pages}</Pagination.Item>}
                    {props.curr != props.total_pages && <Pagination.Next onClick={() => props.btnclick(props.curr + 1)} />}

                </Pagination>
            </div>

            <input type="text" placeholder='.' /><span><p>/ {props.total_pages}</p></span>


        </div>
    )

}


export default Pagin;







