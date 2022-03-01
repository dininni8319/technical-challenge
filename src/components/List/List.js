import classes from './List.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

export default function List(props) {
    
    const [ showDetail, setShowDetail ] = useState(false)
   
    const handleDetail = (id) => {
        props.listSearchedUsers.find(el => {
            if (id === el.id) { 
                setShowDetail(!showDetail)
            }
        })
    }

    return (
        <div className={`${classes['list-of-users']}`}>
            
              {
                props.listSearchedUsers && props.listSearchedUsers.map((el, id )=> {
                    return ( 
                        <div className={`${classes['card-users']}`} key={id}>
                                <div className={`${classes['card-detail']}`}>
                                    { showDetail ?  <FontAwesomeIcon icon={faArrowAltCircleUp} className={`fa-1x ${classes['font-awesome-icon-coral']}`} onClick={() => handleDetail(el.id)}/> :
                                    <FontAwesomeIcon icon={faArrowAltCircleDown} className={`fa-1x ${classes['font-awesome-icon']}`} onClick={() => handleDetail(el.id)}/>
                                    }
                                    {
                                        showDetail && (
                                            <a href={el.html_url} target='_blank'>
                                                <div> 
                                                    <img src={el.avatar_url} alt="" className={`img-avatar`}/>
                                                    <h3>
                                                        {el.login}   
                                                    </h3>
                                                    <ul>
                                                        <li>{el.following_url}</li>
                                                        
                                                        <li>{el.gists_url}</li>
                                                    </ul>
                                                </div>
                                            </a>
                                    )  
                                    }
                                </div>
                            </div>
                        )
                    })
            }      
        </div>
    )
}